import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AiBlogRepository } from './ai-blog.repository';
import { GenerateAiBlogPostDto } from './dto/generate-ai-blog-post.dto';
import { CreateAiBlogCronDto } from './dto/create-ai-blog-cron.dto';
import { UpdateAiBlogCronDto } from './dto/update-ai-blog-cron.dto';
import { UpdateBlogPostDto } from '../blog/dto/update-blog-post.dto';
import { BlogService } from '../blog/blog.service';
import { AI_BLOG_QUEUE, AI_BLOG_IMAGE_QUEUE, GENERATE_AI_BLOG_POST, REFINE_AI_BLOG_POST } from '@app/config/constants';
import { BlogPostStatus } from '../../../../generated/prisma';
import { PostComplexity, PoliticalTone } from '@app/ai';

@Injectable()
export class AiBlogService {
  private readonly logger = new Logger(AiBlogService.name);

  constructor(
    private readonly repository: AiBlogRepository,
    private readonly blogService: BlogService,
    @InjectQueue(AI_BLOG_QUEUE) private readonly aiBlogQueue: Queue,
    @InjectQueue(AI_BLOG_IMAGE_QUEUE) private readonly aiBlogImageQueue: Queue,
  ) {}

  // ─── Generate ─────────────────────────────────────────────────────────────

  async enqueueGeneration(dto: GenerateAiBlogPostDto, requestedByUserId?: string) {
    const job = await this.aiBlogQueue.add(GENERATE_AI_BLOG_POST, {
      country_id: dto.country_id,
      category_id: dto.category_id,
      author_id: dto.author_id,
      display_author_id: dto.display_author_id,
      complexity: dto.complexity ?? PostComplexity.SIMPLE,
      political_tone: dto.political_tone ?? PoliticalTone.NEUTRAL,
      custom_instructions: dto.custom_instructions,
      requestedByUserId: requestedByUserId ?? undefined,
    });
    this.logger.log(`Enqueued AI blog post generation job: ${job.id}`);
    return { job_id: job.id, message: 'Post gerado em fila. Verifique a fila de aprovação em instantes.' };
  }

  // ─── Pending Posts ────────────────────────────────────────────────────────

  async findPendingPosts() {
    return this.repository.findPendingAiPosts();
  }

  async approvePost(id: string) {
    const post = await this.repository.findPostById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    return this.repository.approvePost(id);
  }

  async rejectPost(id: string) {
    const post = await this.repository.findPostById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    return this.repository.deletePost(id);
  }

  // ─── Refinement ────────────────────────────────────────────────────────────

  async enqueueRefinement(id: string, requestedByUserId?: string) {
    const post = await this.repository.findPostById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    if (!post.is_ai_generated || post.status !== BlogPostStatus.DRAFT) {
      throw new NotFoundException('Post deve estar em DRAFT e ser gerado por IA para refinamento');
    }
    const job = await this.aiBlogImageQueue.add(REFINE_AI_BLOG_POST, {
      postId: id,
      requestedByUserId: requestedByUserId ?? undefined,
    });
    this.logger.log(`Enqueued AI blog post refinement job: ${job.id} for post ${id}`);
    return { job_id: job.id, message: 'Refinamento enfileirado. As imagens serão geradas em breve.' };
  }

  async updatePendingPost(id: string, dto: UpdateBlogPostDto) {
    const post = await this.repository.findPostById(id);
    if (!post) throw new NotFoundException('Post não encontrado');
    if (!post.is_ai_generated || post.status !== BlogPostStatus.DRAFT) {
      throw new NotFoundException('Post não está na fila de aprovação');
    }
    return this.blogService.updatePost(id, dto);
  }

  // ─── Cron Jobs ────────────────────────────────────────────────────────────

  async findAllCronJobs() {
    return this.repository.findAllCronJobs();
  }

  async createCronJob(dto: CreateAiBlogCronDto) {
    const cronJob = await this.repository.createCronJob(dto);

    if (cronJob.is_active) {
      const bullmqJobId = await this.registerRepeatableJob(cronJob.id, {
        country_id: dto.country_id,
        category_id: dto.category_id,
        cron_expr: dto.cron_expr,
        author_id: dto.author_id,
        display_author_id: dto.display_author_id,
        complexity: dto.complexity,
        political_tone: dto.political_tone,
        custom_instructions: dto.custom_instructions,
      });
      await this.repository.updateCronJob(cronJob.id, {}, bullmqJobId);
      cronJob.bullmq_job_id = bullmqJobId;
    }

    return cronJob;
  }

  async updateCronJob(id: string, dto: UpdateAiBlogCronDto) {
    const existing = await this.repository.findCronJobById(id);
    if (!existing) throw new NotFoundException('Cron job não encontrado');

    // Remove old repeatable job if it exists
    if (existing.bullmq_job_id) {
      await this.removeRepeatableJob(existing.bullmq_job_id, existing.cron_expr);
    }

    const updated = await this.repository.updateCronJob(id, dto, undefined);

    const newIsActive = dto.is_active ?? existing.is_active;
    const newCronExpr = dto.cron_expr ?? existing.cron_expr;
    const newCountryId = dto.country_id ?? existing.country_id;
    const newCategoryId = dto.category_id ?? existing.category_id;
    const newAuthorId = dto.author_id ?? existing.author_id ?? undefined;
    const newDisplayAuthorId = dto.display_author_id ?? existing.display_author_id ?? undefined;
    const newComplexity = (dto.complexity ?? existing.complexity ?? PostComplexity.SIMPLE) as PostComplexity;
    const newPoliticalTone = (dto.political_tone ?? existing.political_tone ?? PoliticalTone.NEUTRAL) as PoliticalTone;
    const newCustomInstructions = dto.custom_instructions ?? existing.custom_instructions ?? undefined;

    if (newIsActive) {
      const bullmqJobId = await this.registerRepeatableJob(id, {
        country_id: newCountryId,
        category_id: newCategoryId,
        cron_expr: newCronExpr,
        author_id: newAuthorId,
        display_author_id: newDisplayAuthorId,
        complexity: newComplexity,
        political_tone: newPoliticalTone,
        custom_instructions: newCustomInstructions,
      });
      return this.repository.updateCronJob(id, {}, bullmqJobId);
    }

    return updated;
  }

  async deleteCronJob(id: string) {
    const existing = await this.repository.findCronJobById(id);
    if (!existing) throw new NotFoundException('Cron job não encontrado');

    if (existing.bullmq_job_id) {
      await this.removeRepeatableJob(existing.bullmq_job_id, existing.cron_expr);
    }

    return this.repository.deleteCronJob(id);
  }

  // ─── BullMQ Repeatable Helpers ────────────────────────────────────────────

  private async registerRepeatableJob(
    cronJobDbId: string,
    dto: {
      country_id: string;
      category_id: string;
      cron_expr: string;
      author_id?: string;
      display_author_id?: string;
      complexity?: PostComplexity;
      political_tone?: PoliticalTone;
      custom_instructions?: string;
    },
  ): Promise<string> {
    const job = await this.aiBlogQueue.add(
      GENERATE_AI_BLOG_POST,
      {
        country_id: dto.country_id,
        category_id: dto.category_id,
        cron_job_id: cronJobDbId,
        author_id: dto.author_id,
        display_author_id: dto.display_author_id,
        complexity: dto.complexity ?? PostComplexity.SIMPLE,
        political_tone: dto.political_tone ?? PoliticalTone.NEUTRAL,
        custom_instructions: dto.custom_instructions,
      },
      { repeat: { pattern: dto.cron_expr } },
    );
    return job.id ?? `${GENERATE_AI_BLOG_POST}:${dto.cron_expr}`;
  }

  private async removeRepeatableJob(jobId: string, cronExpr: string) {
    try {
      await this.aiBlogQueue.removeRepeatable(GENERATE_AI_BLOG_POST, {
        pattern: cronExpr,
      });
      this.logger.log(`Removed repeatable job ${jobId}`);
    } catch (err) {
      this.logger.warn(`Could not remove repeatable job ${jobId}: ${err}`);
    }
  }
}

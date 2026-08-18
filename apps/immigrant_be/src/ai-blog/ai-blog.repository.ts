import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { BlogPostStatus } from '../../../../generated/prisma';
import { CreateAiBlogCronDto } from './dto/create-ai-blog-cron.dto';
import { UpdateAiBlogCronDto } from './dto/update-ai-blog-cron.dto';
import { BlogPipelineStatus, Prisma } from '../../../../generated/prisma';

@Injectable()
export class AiBlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Pending AI Posts ─────────────────────────────────────────────────────

  async findPendingAiPosts() {
    return this.prisma.blogPost.findMany({
      where: { status: BlogPostStatus.DRAFT, is_ai_generated: true },
      include: {
        author: { select: { id: true, name: true, image: true } },
        category: true,
        tags: { include: { tag: true } },
        featured_country: { select: { id: true, name: true, flag: true } },
        translations: { select: { locale: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findTranslationLocalesForPost(postId: string): Promise<string[]> {
    const rows = await this.prisma.blogPostTranslation.findMany({
      where: { post_id: postId },
      select: { locale: true },
    });
    return rows.map((r) => r.locale);
  }

  async approvePost(id: string) {
    return this.prisma.blogPost.update({
      where: { id },
      data: { status: BlogPostStatus.PUBLISHED, published_at: new Date() },
      include: {
        author: { select: { id: true, name: true, image: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });
  }

  async deletePost(id: string) {
    return this.prisma.blogPost.delete({ where: { id } });
  }

  async findPostById(id: string) {
    return this.prisma.blogPost.findUnique({
      where: { id },
      // O país entra porque o prompt da capa o cita; sem ele a imagem sai
      // genérica quando o retry reenfileira a etapa de imagem.
      include: { featured_country: { select: { name: true } } },
    });
  }

  /** Recoloca o post na etapa que vai ser repetida, limpando o erro anterior. */
  async setPipelineStatus(id: string, status: BlogPipelineStatus) {
    return this.prisma.blogPost.update({
      where: { id },
      data: { pipeline_status: status, pipeline_error: Prisma.DbNull },
    });
  }

  // ─── Cron Jobs ────────────────────────────────────────────────────────────

  async findAllCronJobs() {
    return this.prisma.aiBlogCronJob.findMany({
      include: { country: { select: { id: true, name: true, flag: true } } },
      orderBy: { created_at: 'desc' },
    });
  }

  async findCronJobById(id: string) {
    return this.prisma.aiBlogCronJob.findUnique({
      where: { id },
      include: { country: { select: { id: true, name: true, flag: true } } },
    });
  }

  async findActiveCronJobs() {
    return this.prisma.aiBlogCronJob.findMany({
      where: { is_active: true },
      include: { country: { select: { id: true, name: true, flag: true } } },
    });
  }

  async createCronJob(dto: CreateAiBlogCronDto, bullmqJobId?: string) {
    return this.prisma.aiBlogCronJob.create({
      data: {
        country_id: dto.country_id,
        category_id: dto.category_id,
        cron_expr: dto.cron_expr,
        is_active: dto.is_active ?? true,
        bullmq_job_id: bullmqJobId ?? null,
        author_id: dto.author_id ?? null,
        display_author_id: dto.display_author_id ?? null,
        complexity: dto.complexity ?? 'SIMPLE',
        political_tone: dto.political_tone ?? 'NEUTRAL',
        custom_instructions: dto.custom_instructions ?? null,
      },
      include: { country: { select: { id: true, name: true, flag: true } } },
    });
  }

  async updateCronJob(
    id: string,
    dto: UpdateAiBlogCronDto,
    bullmqJobId?: string,
  ) {
    return this.prisma.aiBlogCronJob.update({
      where: { id },
      data: {
        ...(dto.country_id !== undefined && { country_id: dto.country_id }),
        ...(dto.category_id !== undefined && { category_id: dto.category_id }),
        ...(dto.cron_expr !== undefined && { cron_expr: dto.cron_expr }),
        ...(dto.is_active !== undefined && { is_active: dto.is_active }),
        ...(dto.author_id !== undefined && { author_id: dto.author_id }),
        ...(dto.display_author_id !== undefined && {
          display_author_id: dto.display_author_id,
        }),
        ...(dto.complexity !== undefined && { complexity: dto.complexity }),
        ...(dto.political_tone !== undefined && {
          political_tone: dto.political_tone,
        }),
        ...(dto.custom_instructions !== undefined && {
          custom_instructions: dto.custom_instructions,
        }),
        ...(bullmqJobId !== undefined && { bullmq_job_id: bullmqJobId }),
      },
      include: { country: { select: { id: true, name: true, flag: true } } },
    });
  }

  async deleteCronJob(id: string) {
    return this.prisma.aiBlogCronJob.delete({ where: { id } });
  }
}

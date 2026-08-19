import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';
import { PrismaService } from '@app/database';
import {
  AiRouterService,
  buildBlogOpinionModerationPrompt,
  blogOpinionModerationResultSchema,
  buildBlogPostPrompt,
  blogPostAiSchema,
  PostComplexity,
  PoliticalTone,
  type RssNewsItem,
} from '@app/ai';
import {
  AI_BLOG_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  GENERATE_AI_BLOG_POST,
  TRANSLATE_BLOG_POST,
  TRANSLATION_LOCALES,
} from '@app/config/constants';
import {
  BlogPersonaTheme,
  BlogPipelineStatus,
  BlogPostStatus,
} from '../../../../generated/prisma';
import { XMLParser } from 'fast-xml-parser';
import { CorrelatedJobData } from '@app/config/job-data';
import { getCorrelationId } from '@app/config/request-context';

export interface GenerateBlogPostJobData extends CorrelatedJobData {
  country_id: string;
  category_id: string;
  cron_job_id?: string;
  author_id?: string;
  display_author_id?: string;
  complexity?: PostComplexity;
  political_tone?: PoliticalTone;
  custom_instructions?: string;
  /** Sobre o que escrever. Vira termo de busca no RSS e fica no post. */
  topic?: string;
  persona_id?: string;
  debate_group_id?: string | null;
  generate_both_sides?: boolean;
  /** User who triggered generation (for SSE notification) */
  requestedByUserId?: string;
}

@Injectable()
export class AiBlogWorkerService {
  private readonly logger = new Logger(AiBlogWorkerService.name);
  private readonly xmlParser = new XMLParser({ ignoreAttributes: false });

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiRouter: AiRouterService,
    @InjectQueue(BLOG_TRANSLATION_QUEUE)
    private readonly translationQueue: Queue,
    @InjectQueue(AI_BLOG_QUEUE)
    private readonly aiBlogQueue: Queue,
  ) {}

  async generatePost(data: GenerateBlogPostJobData): Promise<void> {
    const country = await this.prisma.country.findUnique({
      where: { id: data.country_id },
    });

    if (!country) {
      throw new Error(`Country not found: ${data.country_id}`);
    }

    this.logger.log(`Generating AI blog post for country: ${country.name}`);

    const persona = data.persona_id
      ? await this.prisma.blogPersona.findUnique({
          where: { id: data.persona_id },
        })
      : null;

    if (data.persona_id && !persona) {
      throw new Error(`Persona not found: ${data.persona_id}`);
    }

    if (data.generate_both_sides && persona && !data.debate_group_id) {
      data.debate_group_id = await this.enqueueCounterpart(data, persona);
    }

    const newsItems = await this.fetchGoogleNewsRss(country.name, data.topic);

    if (newsItems.length === 0) {
      throw new Error(
        `No RSS news found for ${country.name}, nothing to generate from`,
      );
    }

    const prompt = buildBlogPostPrompt({
      countryName: country.name,
      newsItems,
      complexity: data.complexity ?? PostComplexity.SIMPLE,
      politicalTone: persona
        ? PoliticalTone.NEUTRAL
        : (data.political_tone ?? PoliticalTone.NEUTRAL),
      customInstructions: data.custom_instructions,
      persona: persona
        ? {
            name: persona.name,
            personaPrompt: persona.persona_prompt,
            styleGuidelines: persona.style_guidelines,
          }
        : undefined,
    });

    // Posts de rotina usam o cenário barato. Colunas de imigração com persona
    // pagam o cenário de opinião — turismo permanece no barato.
    const scenario =
      persona?.theme === BlogPersonaTheme.IMMIGRATION
        ? 'blog_writing_opinion'
        : 'blog_writing_standard';

    const { data: parsed, result } = await this.aiRouter.generateJson(
      scenario,
      prompt,
      blogPostAiSchema,
      {
        entityType: 'blog_post',
        preferredModel: persona?.preferred_model ?? undefined,
      },
    );

    if (!parsed) {
      throw new Error(
        `Failed to parse ${result.model} response for country: ${country.name}`,
      );
    }

    const slug = this.slugify(`${parsed.title}-${Date.now()}`);
    const readingTimeMin = this.calcReadingTime(parsed.content);

    // Find or create tags from AI suggestions
    const tagIds = await this.ensureTags(parsed.suggested_tags);

    // Resolve author: use provided author_id if valid, else fallback to system admin
    const authorId = await this.resolveAuthorId(data.author_id);

    const post = await this.prisma.blogPost.create({
      data: {
        title: parsed.title,
        slug,
        excerpt: parsed.excerpt,
        content: parsed.content,
        status: BlogPostStatus.DRAFT,
        is_ai_generated: true,
        original_locale: 'en',
        // Guardado para a fila de aprovação: saber que o post veio de um elo de
        // fallback, e não do modelo configurado, muda como o revisor o lê.
        generated_by_model: result.model,
        generation_cost_usd: result.usage.costUsd,
        reading_time_min: readingTimeMin,
        author_id: authorId,
        display_author_id:
          data.display_author_id ?? persona?.blog_author_id ?? null,
        persona_id: persona?.id ?? null,
        debate_group_id: data.debate_group_id ?? null,
        category_id: data.category_id,
        featured_country_id: data.country_id,
        source_topic: data.topic?.trim() || null,
        // A cadeia continua na tradução, então o post já nasce nesse estado.
        pipeline_status: BlogPipelineStatus.TRANSLATING,
        tags: tagIds.length
          ? { create: tagIds.map((tag_id) => ({ tag_id })) }
          : undefined,
      },
    });

    this.logger.log(`AI blog post created as DRAFT for: ${country.name}`);

    if (persona) {
      await this.moderateOpinion(post.id, {
        personaName: persona.name,
        editorialStance: persona.editorial_stance,
        title: parsed.title,
        content: parsed.content,
        newsItems: newsItems
          .map((item, i) => `${i + 1}. ${item.title}`)
          .join('\n'),
      });
    }

    // A cadeia segue para a tradução, e é o último locale traduzido que enfileira
    // a capa. Antes daqui a capa vinha logo depois do texto e a tradução ficava
    // de fora: o cron das 03:00 só varre posts publicados, então um DRAFT nunca
    // era traduzido sozinho — e o refinamento exige as traduções. O admin era
    // obrigado a enfileirar tradução na mão entre gerar e refinar.
    //
    // A imagem fica por último de propósito: o refinamento depende de pt+es, não
    // da capa, então uma capa que falha não bloqueia o resto.
    await this.translationQueue.addBulk(
      TRANSLATION_LOCALES.map((locale) => ({
        name: TRANSLATE_BLOG_POST,
        data: {
          postId: post.id,
          targetLocale: locale,
          requestedByUserId: data.requestedByUserId,
          // Mantém os jobs encadeados no rastro da requisição que os originou.
          correlationId: getCorrelationId(),
        },
      })),
    );

    // Update last_run_at on cron job if triggered by one
    if (data.cron_job_id) {
      await this.prisma.aiBlogCronJob
        .update({
          where: { id: data.cron_job_id },
          data: { last_run_at: new Date() },
        })
        .catch((err) =>
          this.logger.warn(`Could not update cron job last_run_at: ${err}`),
        );
    }
  }

  /**
   * Cron jobs are a single repeatable payload. When they ask for both sides we
   * mint the debate group here and enqueue the counterpart as its own job, so a
   * retry of one column does not rerun the other.
   */
  private async enqueueCounterpart(
    data: GenerateBlogPostJobData,
    persona: { id: string; theme: BlogPersonaTheme; editorial_stance: string },
  ): Promise<string> {
    const debateGroupId = randomUUID();
    const counterpart = await this.prisma.blogPersona.findFirst({
      where: {
        theme: persona.theme,
        is_active: true,
        id: { not: persona.id },
        NOT: { editorial_stance: persona.editorial_stance },
      },
    });

    if (!counterpart) {
      this.logger.warn(
        `No counterpart persona for ${persona.id}; generating a single side`,
      );
      return debateGroupId;
    }

    await this.aiBlogQueue.add(GENERATE_AI_BLOG_POST, {
      ...data,
      persona_id: counterpart.id,
      display_author_id: counterpart.blog_author_id,
      generate_both_sides: false,
      debate_group_id: debateGroupId,
    });

    return debateGroupId;
  }

  private async moderateOpinion(
    postId: string,
    input: {
      personaName: string;
      editorialStance: string;
      title: string;
      content: string;
      newsItems: string;
    },
  ): Promise<void> {
    try {
      const { data } = await this.aiRouter.generateJson(
        'blog_writing_standard',
        buildBlogOpinionModerationPrompt(input),
        blogOpinionModerationResultSchema,
        { entityType: 'blog_post', entityId: postId },
      );

      if (!data || data.recommendation === 'approve') {
        return;
      }

      await this.prisma.blogPost.update({
        where: { id: postId },
        data: { moderation_flag: data },
      });
    } catch (error) {
      this.logger.warn(
        `Opinion moderation failed for ${postId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  // ─── RSS ──────────────────────────────────────────────────────────────────

  /**
   * O `topic` entra na busca em vez de substituí-la: sozinho ele traria notícia
   * do assunto em qualquer lugar do mundo, e o post é sobre um país.
   */
  private async fetchGoogleNewsRss(
    countryName: string,
    topic?: string,
  ): Promise<RssNewsItem[]> {
    const terms = topic?.trim()
      ? `${countryName} ${topic.trim()}`
      : `${countryName} immigration imigração`;
    const query = encodeURIComponent(terms);
    const url = `https://news.google.com/rss/search?q=${query}&hl=en&gl=US&ceid=US:en`;

    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImmigrantBot/1.0)' },
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        this.logger.warn(
          `RSS fetch returned ${response.status} for ${countryName}`,
        );
        return [];
      }

      const xml = await response.text();
      const result = this.xmlParser.parse(xml);
      const items = result?.rss?.channel?.item ?? [];
      const itemsArray = Array.isArray(items) ? items : [items];

      return itemsArray.slice(0, 5).map((item: any) => ({
        title: String(item.title ?? ''),
        description: item.description
          ? String(item.description)
              .replace(/<[^>]+>/g, '')
              .slice(0, 200)
          : undefined,
        link: String(item.link ?? ''),
        pubDate: item.pubDate ? String(item.pubDate) : undefined,
      }));
    } catch (err) {
      this.logger.error(`Error fetching RSS for ${countryName}: ${err}`);
      return [];
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private async resolveAuthorId(authorId?: string): Promise<string> {
    if (authorId) {
      const user = await this.prisma.users.findUnique({
        where: { id: authorId },
      });
      if (user) return user.id;
      this.logger.warn(
        `Author with id ${authorId} not found, falling back to system admin`,
      );
    }
    return this.getSystemUserId();
  }

  private async ensureTags(suggestedTags: string[]): Promise<string[]> {
    const tagIds: string[] = [];

    for (const tagName of suggestedTags.slice(0, 6)) {
      const slug = this.slugify(tagName);
      try {
        const tag = await this.prisma.blogTag.upsert({
          where: { slug },
          create: { name: tagName, slug },
          update: {},
        });
        tagIds.push(tag.id);
      } catch {
        // Skip tag on conflict
      }
    }

    return tagIds;
  }

  private async getSystemUserId(): Promise<string> {
    // Use the first admin user as the AI post author
    const admin = await this.prisma.userRoles.findFirst({
      include: { role: true },
      where: { role: { name: 'admin' } },
    });

    if (admin) return admin.userId;

    // Fallback: first user in the system
    const firstUser = await this.prisma.users.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!firstUser) throw new Error('No users found in the system');
    return firstUser.id;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
  }

  private calcReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '@app/database';
import {
  GeminiBaseService,
  buildBlogPostPrompt,
  blogPostAiSchema,
  PostComplexity,
  PoliticalTone,
  type RssNewsItem,
} from '@app/ai';
import { AI_BLOG_IMAGE_QUEUE, GENERATE_AI_BLOG_IMAGE } from '@app/config/constants';
import { BlogPostStatus } from '../../../../generated/prisma';
import { XMLParser } from 'fast-xml-parser';

export interface GenerateBlogPostJobData {
  country_id: string;
  category_id: string;
  cron_job_id?: string;
  author_id?: string;
  display_author_id?: string;
  complexity?: PostComplexity;
  political_tone?: PoliticalTone;
  custom_instructions?: string;
}

@Injectable()
export class AiBlogWorkerService {
  private readonly logger = new Logger(AiBlogWorkerService.name);
  private readonly xmlParser = new XMLParser({ ignoreAttributes: false });

  constructor(
    private readonly prisma: PrismaService,
    private readonly gemini: GeminiBaseService,
    @InjectQueue(AI_BLOG_IMAGE_QUEUE) private readonly aiBlogImageQueue: Queue,
  ) {}

  async generatePost(data: GenerateBlogPostJobData): Promise<void> {
    const country = await this.prisma.country.findUnique({
      where: { id: data.country_id },
    });

    if (!country) {
      throw new Error(`Country not found: ${data.country_id}`);
    }

    this.logger.log(`Generating AI blog post for country: ${country.name}`);

    const newsItems = await this.fetchGoogleNewsRss(country.name);

    if (newsItems.length === 0) {
      this.logger.warn(`No RSS news found for ${country.name}, aborting generation`);
      return;
    }

    const prompt = buildBlogPostPrompt({
      countryName: country.name,
      newsItems,
      complexity: data.complexity ?? PostComplexity.SIMPLE,
      politicalTone: data.political_tone ?? PoliticalTone.NEUTRAL,
      customInstructions: data.custom_instructions,
    });

    const response = await this.gemini.generateContent(prompt);
    const rawText = response.response.text();

    const parsed = this.gemini.parseJsonResponse(rawText, blogPostAiSchema);

    if (!parsed) {
      this.logger.error(`Failed to parse Gemini response for country: ${country.name}`);
      return;
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
        reading_time_min: readingTimeMin,
        author_id: authorId,
        display_author_id: data.display_author_id ?? null,
        category_id: data.category_id,
        featured_country_id: data.country_id,
        tags: tagIds.length
          ? { create: tagIds.map((tag_id) => ({ tag_id })) }
          : undefined,
      },
    });

    this.logger.log(`AI blog post created as DRAFT for: ${country.name}`);

    await this.aiBlogImageQueue.add(GENERATE_AI_BLOG_IMAGE, {
      postId: post.id,
      slug: post.slug,
      title: post.title,
      countryName: country.name,
    });

    // Update last_run_at on cron job if triggered by one
    if (data.cron_job_id) {
      await this.prisma.aiBlogCronJob
        .update({
          where: { id: data.cron_job_id },
          data: { last_run_at: new Date() },
        })
        .catch((err) => this.logger.warn(`Could not update cron job last_run_at: ${err}`));
    }
  }

  // ─── RSS ──────────────────────────────────────────────────────────────────

  private async fetchGoogleNewsRss(countryName: string): Promise<RssNewsItem[]> {
    const query = encodeURIComponent(`${countryName} immigration imigração`);
    const url = `https://news.google.com/rss/search?q=${query}&hl=en&gl=US&ceid=US:en`;

    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImmigrantBot/1.0)' },
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        this.logger.warn(`RSS fetch returned ${response.status} for ${countryName}`);
        return [];
      }

      const xml = await response.text();
      const result = this.xmlParser.parse(xml);
      const items = result?.rss?.channel?.item ?? [];
      const itemsArray = Array.isArray(items) ? items : [items];

      return itemsArray.slice(0, 5).map((item: any) => ({
        title: String(item.title ?? ''),
        description: item.description
          ? String(item.description).replace(/<[^>]+>/g, '').slice(0, 200)
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
      const user = await this.prisma.users.findUnique({ where: { id: authorId } });
      if (user) return user.id;
      this.logger.warn(`Author with id ${authorId} not found, falling back to system admin`);
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

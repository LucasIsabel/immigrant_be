import { Injectable, Logger } from '@nestjs/common';
import {
  AiRouterService,
  businessPageModerationResultSchema,
  buildImageModerationPrompt,
  flattenModerationContent,
  imageModerationResultSchema,
  type BusinessPageModerationResult,
  type BusinessPageModerationInput,
  type ImageModerationResult,
  buildBusinessPageModerationPrompt,
} from '@app/ai';

/**
 * Appended when the content was too large to be analysed in full. User-facing
 * copy, so it stays in Portuguese like the rest of the moderation summary.
 */
const TRUNCATED_SUMMARY_NOTE =
  ' Parte do conteúdo excedeu o limite de análise automática e não foi analisada.';

/**
 * How many photos go to the vision model in one call.
 *
 * Not about money — the chain is free — but about an answer that stays
 * coherent: a model asked to index forty images starts miscounting, and a
 * finding pinned to the wrong photo is worse than none. Findings come back
 * indexed within their own batch, so nothing has to be offset afterwards.
 */
const IMAGE_BATCH_SIZE = 8;

/**
 * How many batches one page is worth.
 *
 * A restaurant really does upload a photo per dish, so the answer to a long
 * menu is more calls and a slower submit — not silently skipping the tail.
 * The ceiling exists for the pathological page, and crossing it does not drop
 * the extra photos quietly: the verdict is floored so a human sees it.
 */
const MAX_IMAGE_BATCHES = 8;

/** Extensions worth showing a vision model. */
const IMAGE_URL_PATTERN = /\.(jpe?g|png|webp|gif|avif)(\?|$)/i;

/** O veredicto e quem o produziu. `model` é `null` quando ninguém respondeu. */
export interface ModerationOutcome {
  result: BusinessPageModerationResult;
  model: string | null;
}

/**
 * O que fica gravado na página.
 *
 * `origin` responde a pergunta que o admin faz ao abrir a fila — "por que esta
 * página está aqui?" — sem custar mais que uma string: `gate` é o portão do
 * submit, `manual` é alguém que apertou analisar.
 */
export interface BusinessPageModerationRecord
  extends BusinessPageModerationResult {
  model: string | null;
  analyzedAt: string;
  origin: 'gate' | 'manual';
}

/** Empacota um veredicto para persistir. */
export function toModerationRecord(
  outcome: ModerationOutcome,
  origin: BusinessPageModerationRecord['origin'],
): BusinessPageModerationRecord {
  return {
    ...outcome.result,
    model: outcome.model,
    analyzedAt: new Date().toISOString(),
    origin,
  };
}

/** A photo, and the field the reviewer will look for it in. */
interface ModeratedPhoto {
  /** `logoUrl`, `coverPhotoUrl`, or a `typeData` path like `menu[3].imageUrl`. */
  field: string;
  url: string;
}

/**
 * Every picture the page publishes, in a stable order.
 *
 * Logo and cover come first because they are the two a visitor sees without
 * scrolling; the rest follow in the order `flattenModerationContent` walked
 * them, so the cap cuts the tail rather than something arbitrary.
 */
export function collectPhotos(
  pendingContent: Record<string, unknown>,
  links: Record<string, string>,
): ModeratedPhoto[] {
  const photos: ModeratedPhoto[] = [];
  const seen = new Set<string>();

  const push = (field: string, value: unknown) => {
    if (typeof value !== 'string' || !IMAGE_URL_PATTERN.test(value)) return;
    if (seen.has(value)) return;
    seen.add(value);
    photos.push({ field, url: value });
  };

  push('logoUrl', pendingContent.logoUrl);
  push('coverPhotoUrl', pendingContent.coverPhotoUrl);

  if (Array.isArray(pendingContent.photos)) {
    pendingContent.photos.forEach((photo, i) => push(`photos[${i}]`, photo));
  }

  for (const [field, url] of Object.entries(links)) push(field, url);

  return photos;
}

@Injectable()
export class BusinessPageModerationService {
  private readonly logger = new Logger(BusinessPageModerationService.name);

  constructor(private readonly aiRouter: AiRouterService) {}

  /**
   * Analisa o conteúdo e diz **quem** analisou.
   *
   * O modelo sempre esteve à mão: `generateJson` devolve `{ data, result }` e
   * `result.model` é quem respondeu. Era descartado, e sem ele um veredicto
   * gravado não conta de onde veio — que é metade do valor de gravá-lo.
   */
  async moderateContent(
    pendingContent: Record<string, unknown>,
    businessType: string,
    /** Só para correlacionar a chamada no `AiUsageLog`; a análise não usa. */
    pageId?: string,
  ): Promise<ModerationOutcome> {
    const input: BusinessPageModerationInput = {
      name:
        typeof pendingContent.name === 'string'
          ? pendingContent.name
          : undefined,
      description:
        typeof pendingContent.description === 'string'
          ? pendingContent.description
          : undefined,
      logoUrl:
        typeof pendingContent.logoUrl === 'string'
          ? pendingContent.logoUrl
          : undefined,
      coverPhotoUrl:
        typeof pendingContent.coverPhotoUrl === 'string'
          ? pendingContent.coverPhotoUrl
          : undefined,
      phone:
        typeof pendingContent.phone === 'string'
          ? pendingContent.phone
          : undefined,
      whatsapp:
        typeof pendingContent.whatsapp === 'string'
          ? pendingContent.whatsapp
          : undefined,
      email:
        typeof pendingContent.email === 'string'
          ? pendingContent.email
          : undefined,
      website:
        typeof pendingContent.website === 'string'
          ? pendingContent.website
          : undefined,
      address:
        typeof pendingContent.address === 'string'
          ? pendingContent.address
          : undefined,
      city:
        typeof pendingContent.city === 'string'
          ? pendingContent.city
          : undefined,
      businessType,
    };

    // `typeData` holds the tours, the menu and the itinerary — most of what a
    // page actually publishes — and none of it used to reach the moderator.
    const { text, links, truncated } = flattenModerationContent(
      pendingContent.typeData,
    );
    if (Object.keys(text).length > 0) input.typeDataText = text;
    if (Object.keys(links).length > 0) input.typeDataLinks = links;

    const photos = collectPhotos(pendingContent, links);

    const prompt = buildBusinessPageModerationPrompt(input);

    try {
      const { data: parsed, result } = await this.aiRouter.generateJson(
        'business_moderation',
        prompt,
        businessPageModerationResultSchema,
        // Sem `entityId` nem o log de custo sabia de que página se tratava.
        { entityType: 'business_page', entityId: pageId },
      );

      if (!parsed) {
        this.logger.warn(
          'Failed to parse moderation response, defaulting to review',
        );
        return {
          result: {
            riskLevel: 'medium',
            flags: [],
            summary:
              'Não foi possível analisar o conteúdo automaticamente. Revisão manual recomendada.',
            recommendation: 'review',
          },
          // O modelo respondeu — respondeu mal. Guardar qual foi é o que
          // permite descobrir depois que um deles não sabe responder isto.
          model: result?.model ?? null,
        };
      }

      const text = truncated ? this.floorForTruncation(parsed) : parsed;

      return {
        result: await this.withImageVerdict(text, photos, pageId),
        model: result?.model ?? null,
      };
    } catch (error) {
      this.logger.error(
        'Moderation AI call failed',
        error instanceof Error ? error.stack : undefined,
      );
      return {
        result: {
          riskLevel: 'medium',
          flags: [],
          summary: 'Erro na análise automática. Revisão manual recomendada.',
          recommendation: 'review',
        },
        // Ninguém respondeu; dizer que um modelo disse isto seria mentira.
        model: null,
      };
    }
  }

  /**
   * Looks at the photos, and lets what they show raise the verdict.
   *
   * Kept separate from the text pass, and merged rather than replacing it,
   * because the two fail independently: a vision outage must not lose the
   * text findings, and a page can be clean in prose and not in pictures.
   *
   * It only ever raises. A picture cannot argue a flagged description back
   * down to "low".
   */
  private async withImageVerdict(
    text: BusinessPageModerationResult,
    photos: ModeratedPhoto[],
    pageId?: string,
  ): Promise<BusinessPageModerationResult> {
    if (photos.length === 0) return text;

    const batches: ModeratedPhoto[][] = [];
    for (let i = 0; i < photos.length; i += IMAGE_BATCH_SIZE) {
      batches.push(photos.slice(i, i + IMAGE_BATCH_SIZE));
    }

    // Past the ceiling the tail is not analysed, and the verdict has to say so
    // rather than quietly report on the half it read.
    const overflow = batches.length > MAX_IMAGE_BATCHES;
    const analysed = batches.slice(0, MAX_IMAGE_BATCHES);

    const flags: BusinessPageModerationResult['flags'] = [];
    const summaries: string[] = [];
    let worst: BusinessPageModerationResult['riskLevel'] = 'low';
    let anyFailed = false;

    /*
     * In parallel, and it matters. Measured against the real model, a call
     * costs about eight seconds of overhead plus two per image, so a
     * forty-photo menu is five batches: ninety seconds one after another,
     * twenty when they go together. `Promise.all` keeps them in order, which
     * is what the per-batch index mapping below relies on.
     *
     * Eight concurrent calls sit inside OpenRouter's free-tier ceiling of
     * twenty a minute, and `MAX_IMAGE_BATCHES` is what keeps it there.
     */
    const verdicts = await Promise.all(
      analysed.map((batch) => this.analyseBatch(batch, pageId)),
    );

    verdicts.forEach((verdict, batchIndex) => {
      if (!verdict) {
        anyFailed = true;
        return;
      }

      const batch = analysed[batchIndex];
      worst = worstRisk(worst, verdict.riskLevel);
      summaries.push(verdict.summary);

      for (const finding of verdict.findings) {
        const photo = batch[finding.index];
        // An index outside the batch means the model lost count; a flag pinned
        // to the wrong photo is worse than one only the summary mentions.
        if (!photo) continue;
        flags.push({
          category:
            finding.category === 'pornography' || finding.category === 'nudity'
              ? 'pornography'
              : 'off_platform',
          field: photo.field,
          excerpt: photo.url,
          reason: `Imagem: ${finding.reason}`,
        });
      }
    });

    // Anything unread — a failed batch or a tail past the ceiling — means no
    // picture here can be called clean.
    const incomplete = anyFailed || overflow;
    if (incomplete) {
      worst = worstRisk(worst, 'medium');
      summaries.push(
        overflow
          ? `Apenas as primeiras ${MAX_IMAGE_BATCHES * IMAGE_BATCH_SIZE} fotos foram analisadas automaticamente.`
          : 'Parte das fotos não pôde ser analisada automaticamente.',
      );
    }

    const riskLevel = worstRisk(text.riskLevel, worst);

    return {
      riskLevel,
      flags: [...text.flags, ...flags],
      summary: [text.summary, ...summaries].join(' '),
      recommendation:
        riskLevel === 'high'
          ? 'reject'
          : riskLevel === 'medium' && text.recommendation === 'approve'
            ? 'review'
            : text.recommendation,
    };
  }

  /** One batch, or `null` when nobody managed to look at it. */
  private async analyseBatch(
    batch: ModeratedPhoto[],
    pageId?: string,
  ): Promise<ImageModerationResult | null> {
    try {
      const { data } = await this.aiRouter.analyseImages(
        'image_moderation',
        buildImageModerationPrompt(batch.length),
        batch.map((photo) => photo.url),
        imageModerationResultSchema,
        { entityType: 'business_page', entityId: pageId },
      );
      return data;
    } catch (error) {
      this.logger.error(
        'Image moderation failed',
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }

  /**
   * Content nobody read cannot be approved by the model alone, so a truncated
   * analysis never comes back better than "review". A verdict that is already
   * worse is left alone — this raises the floor, it never lowers a finding.
   */
  private floorForTruncation(
    result: BusinessPageModerationResult,
  ): BusinessPageModerationResult {
    return {
      ...result,
      riskLevel: result.riskLevel === 'low' ? 'medium' : result.riskLevel,
      recommendation:
        result.recommendation === 'approve' ? 'review' : result.recommendation,
      summary: result.summary + TRUNCATED_SUMMARY_NOTE,
    };
  }
}

const RISK_ORDER = { low: 0, medium: 1, high: 2 } as const;

function worstRisk(
  a: BusinessPageModerationResult['riskLevel'],
  b: BusinessPageModerationResult['riskLevel'],
): BusinessPageModerationResult['riskLevel'] {
  return RISK_ORDER[a] >= RISK_ORDER[b] ? a : b;
}

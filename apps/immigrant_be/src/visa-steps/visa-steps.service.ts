import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VisaStepsRepository } from './visa-steps.repository';
import { CreateVisaStepsDto } from './dto/create-visa-steps.dto';
import { UpdateVisaStepsDto } from './dto/update-visa-steps.dto';
import { TranslateVisaStepsDto } from './dto/translate-visa-steps.dto';
import { Prisma } from 'generated/prisma';
import {
  GeminiBaseService,
  buildVisaStepsTranslationPrompt,
  visaStepsTranslationAiSchema,
} from '@app/ai';

@Injectable()
export class VisaStepsService {
  constructor(
    private readonly visaStepsRepository: VisaStepsRepository,
    private readonly gemini: GeminiBaseService,
  ) {}

  create(dto: CreateVisaStepsDto) {
    const data: Prisma.VisaStepsCreateInput = {
      language: dto.language,
      steps: dto.steps,
      visa_type: {
        connect: { id: dto.visa_type_id },
      },
    };

    return this.visaStepsRepository.create(data);
  }

  findAll(filters: { visa_type_id?: string; language?: string }) {
    return this.visaStepsRepository.findAll(filters);
  }

  /**
   * The set of step keys in a `steps` blob, in no particular order.
   *
   * Returns `null` when the blob is not shaped like steps at all, so the caller
   * can tell "no keys" apart from "not comparable".
   */
  private extractKeys(steps: unknown): Set<string> | null {
    if (typeof steps !== 'object' || steps === null || Array.isArray(steps)) {
      return null;
    }

    const keys = new Set<string>();

    for (const items of Object.values(steps as Record<string, unknown>)) {
      if (!Array.isArray(items)) {
        return null;
      }

      for (const item of items) {
        const key = (item as { key?: unknown })?.key;
        if (typeof key !== 'string' || !key) {
          return null;
        }
        keys.add(key);
      }
    }

    return keys;
  }

  /**
   * A step's key is its identity across languages — the same value has to be in
   * all three blobs of a visa type, because `plans.completed_step_keys` is what
   * a user's progress is made of and it is language-independent.
   *
   * The seed guarantees this by deriving every key from the English name. This
   * endpoint is the one place that can break it: it overwrites one language's
   * blob in isolation, so a hand-edited payload could drop a key, rename one,
   * or invent one, and the mismatch would only surface as steps silently
   * unticking when the user switches language.
   */
  private async assertKeyParity(
    id: string,
    visaTypeId: string,
    language: string,
    steps: unknown,
  ): Promise<void> {
    const incoming = this.extractKeys(steps);

    if (!incoming) {
      throw new BadRequestException(
        'Every step must carry a non-empty `key`. The key is what user progress is stored against.',
      );
    }

    const siblings = await this.visaStepsRepository.findAll({
      visa_type_id: visaTypeId,
    });

    const reference = siblings.find(
      (row) => row.id !== id && row.language !== language,
    );

    if (!reference) {
      return;
    }

    const expected = this.extractKeys(reference.steps);

    if (!expected) {
      // The other language predates keys or is itself malformed. Nothing
      // trustworthy to compare against, and blocking here would make the row
      // uneditable.
      return;
    }

    const missing = [...expected].filter((key) => !incoming.has(key));
    const unknown = [...incoming].filter((key) => !expected.has(key));

    if (missing.length || unknown.length) {
      throw new BadRequestException(
        `Step keys must match the other languages of this visa type (compared against "${reference.language}").` +
          (missing.length ? ` Missing: ${missing.join(', ')}.` : '') +
          (unknown.length ? ` Unexpected: ${unknown.join(', ')}.` : '') +
          ' Only the text of a step is language-specific; the key is its identity.',
      );
    }
  }

  async update(id: string, dto: UpdateVisaStepsDto) {
    const existing = await this.visaStepsRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Visa steps not found');
    }

    if (dto.steps !== undefined) {
      await this.assertKeyParity(
        id,
        existing.visa_type_id,
        dto.language ?? existing.language,
        dto.steps,
      );
    }

    const data: Prisma.VisaStepsUpdateInput = {
      language: dto.language,
      steps: dto.steps,
    };

    return this.visaStepsRepository.update(id, data);
  }

  async translate(
    dto: TranslateVisaStepsDto,
  ): Promise<Record<string, unknown>> {
    const prompt = buildVisaStepsTranslationPrompt({
      steps: dto.steps,
      sourceLanguage: dto.sourceLanguage,
      targetLanguage: dto.targetLanguage,
    });

    const response = await this.gemini.generateContent(prompt);
    const rawText = response.response.text();
    const parsed = this.gemini.parseJsonResponse(
      rawText,
      visaStepsTranslationAiSchema,
    );

    if (!parsed) {
      throw new Error('Failed to parse translation response');
    }

    return parsed;
  }
}

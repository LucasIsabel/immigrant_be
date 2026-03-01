import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, dto: UpdateVisaStepsDto) {
    const existing = await this.visaStepsRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Visa steps not found');
    }

    const data: Prisma.VisaStepsUpdateInput = {
      language: dto.language,
      steps: dto.steps,
    };

    return this.visaStepsRepository.update(id, data);
  }

  async translate(dto: TranslateVisaStepsDto): Promise<Record<string, unknown>> {
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

    return parsed as Record<string, unknown>;
  }
}

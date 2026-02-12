import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GeminiBaseService,
  visaStepsSchema,
  VisaStepsType,
  buildVisaStepsPrompt,
} from '@app/ai';

@Injectable()
export class GeminiService extends GeminiBaseService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async generateVisaSteps(
    visaType: {
      category: string;
      description: string;
      source: string;
    },
    language: string,
  ): Promise<VisaStepsType | null> {
    const prompt = buildVisaStepsPrompt(visaType, language);

    const {
      response: { text },
    } = await this.model.generateContent(prompt);

    return this.parseJsonResponse(text(), visaStepsSchema);
  }
}

import { Injectable } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { GeminiService } from './gemini.service';
import { VisaStepsType } from '@app/ai';

@Injectable()
export class VisaStepsService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly geminiService: GeminiService,
  ) {}

  async generateStepsForVisaType(
    visaTypeId: string,
    language: string,
  ): Promise<VisaStepsType | null> {
    const visaType =
      await this.planRepository.getVisaTypeByRecommendationId(visaTypeId);

    if (!visaType || !visaType.source) {
      return null;
    }

    return this.geminiService.generateVisaSteps(
      {
        category: visaType.category,
        description: visaType.description,
        source: visaType.source,
      },
      language,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';
import { PlanRepository } from './plan.repository';
import { VisaStepsService } from './visa-steps.service';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly visaStepsService: VisaStepsService,
  ) {}

  async createPlan(createPlanDto: CreatePlanDto) {
    const visaType = await this.planRepository.getVisaTypeByRecommendationId(
      createPlanDto.visa_type_id,
    );

    if (!visaType) {
      return {
        success: false,
        message: 'Visa type not found',
        planId: createPlanDto.plan_id,
        visaSteps: [],
      };
    }

    const visaSteps = await this.visaStepsService.generateStepsForVisaType(
      createPlanDto.visa_type_id,
      createPlanDto.language,
    );

    console.log('========================================', visaSteps);

    return await Promise.resolve({
      success: true,
      message: 'Plan created successfully',
      planId: createPlanDto.plan_id,
      visaSteps: visaSteps || {
        documents: [],
        required_funds: '',
        steps: [],
      },
    });
  }
}

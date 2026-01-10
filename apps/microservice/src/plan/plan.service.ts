import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  async createPlan(createPlanDto: CreatePlanDto) {
    return await Promise.resolve({
      success: true,
      message: 'Plan created successfully',
      planId: createPlanDto.id,
    });
  }
}

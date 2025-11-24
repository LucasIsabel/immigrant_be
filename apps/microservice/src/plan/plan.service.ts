import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  createPlan(createPlanDto: CreatePlanDto) {
    console.log('createPlanDto', createPlanDto);
  }
}

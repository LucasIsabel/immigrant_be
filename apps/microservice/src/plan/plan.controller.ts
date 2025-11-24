import { Body, Controller } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan.dto';
import { PlanService } from './plan.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @MessagePattern('CREATE_PLAN')
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.createPlan(createPlanDto);
  }
}

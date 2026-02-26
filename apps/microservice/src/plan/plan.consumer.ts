import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PlanService } from './plan.service';
import { EventsService } from '../events/events.service';
import { PLAN_QUEUE, PROCESS_CREATE_PLAN } from '@app/config/constants';
import { CreatePlanDto } from './dto/plan.dto';

@Processor(PLAN_QUEUE)
export class PlanQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(PlanQueueProcessor.name);

  constructor(
    private readonly planService: PlanService,
    private readonly eventsService: EventsService,
  ) {
    super();
  }

  async process(job: Job<CreatePlanDto>): Promise<void> {
    switch (job.name) {
      case PROCESS_CREATE_PLAN: {
        this.logger.log(`Processing plan creation job: ${job.id}`);
        const data = await this.planService.createPlan(job.data);
        this.logger.log(`Plan creation completed: ${data.planId}`);

        if (data.success && job.data.user_id) {
          await this.eventsService.emit({
            userId: job.data.user_id,
            type: 'plan_completed',
            title: 'Plano criado',
            message: 'Seu plano de imigração foi criado com sucesso.',
            payload: { planId: data.planId },
          });
        }
        break;
      }
    }
  }
}

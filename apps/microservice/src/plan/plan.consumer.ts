import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PlanService } from './plan.service';
import { EventsService } from '../events/events.service';
import { PLAN_QUEUE, PROCESS_CREATE_PLAN } from '@app/config/constants';

@Processor(PLAN_QUEUE)
export class PlanQueueProcessor extends WorkerHost {
  constructor(
    private readonly planService: PlanService,
    private readonly eventsService: EventsService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log('========================================', job);

    switch (job.name) {
      case PROCESS_CREATE_PLAN: {
        const data = await this.planService.createPlan(job.data);
        console.log('========================================', data);
        break;
      }
      case 'concatenate': {
        break;
      }
    }
  }
}

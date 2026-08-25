import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { CreateEventInterestDto } from './dto/create-event-interest.dto';
import { EventInterestResponseDto } from './dto/event-interest-response.dto';
import { EventInterestService } from './event-interest.service';

@ApiTags('Event Interest')
@Controller('event-interest')
export class EventInterestController {
  constructor(private readonly service: EventInterestService) {}

  /**
   * Public and unauthenticated on purpose: the organizer is not a user yet —
   * asking them to create an account to say "I am interested" is how the
   * signal dies. The honeypot plus a tight throttle carry the abuse load.
   */
  @Post()
  @AllowAnonymous()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register an organizer’s interest in promoting events',
  })
  @ApiCreatedResponse({ type: EventInterestResponseDto })
  register(
    @Body() dto: CreateEventInterestDto,
  ): Promise<EventInterestResponseDto> {
    return this.service.register(dto);
  }
}

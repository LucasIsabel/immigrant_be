import { Controller, Get, Query } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyCitySummaryQueryDto } from './dto/my-city-summary-query.dto';
import { MyCitySummaryResponseDto } from './dto/my-city-summary-response.dto';
import { MyCityService } from './my-city.service';

@ApiTags('My City')
@Controller('my-city')
export class MyCityController {
  constructor(private readonly service: MyCityService) {}

  @Get('summary')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'How much each tab of the My City screen holds',
    description:
      'Counts only. Lets a tab say what it holds before anyone opens it, so that each list can wait for its own tab.',
  })
  @ApiOkResponse({ type: MyCitySummaryResponseDto })
  summary(
    @Query() query: MyCitySummaryQueryDto,
  ): Promise<MyCitySummaryResponseDto> {
    return this.service.summary(query);
  }
}

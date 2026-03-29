import { Controller, Get, Query } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusinessPagesService } from './business-pages.service';
import { CheckSlugQueryDto } from './dto/check-slug-query.dto';
import { CheckSlugResponseDto } from './dto/check-slug-response.dto';

@ApiTags('Business Pages')
@Controller('business-pages')
export class BusinessPagesController {
  constructor(private readonly service: BusinessPagesService) {}

  @Get('check-slug')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Verificar disponibilidade de slug para página pública' })
  @ApiOkResponse({ type: CheckSlugResponseDto })
  checkSlug(@Query() query: CheckSlugQueryDto): Promise<CheckSlugResponseDto> {
    return this.service.checkSlugAvailability(query.slug);
  }
}

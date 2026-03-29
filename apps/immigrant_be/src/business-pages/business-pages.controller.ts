import { Controller, Get, Param, Query } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessPagesService } from './business-pages.service';
import { CheckSlugQueryDto } from './dto/check-slug-query.dto';
import { CheckSlugResponseDto } from './dto/check-slug-response.dto';
import { BusinessPagePublicResponseDto } from './dto/business-page-public-response.dto';

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

  @Get('public/:slug')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Buscar página pública aprovada por slug' })
  @ApiParam({ name: 'slug', description: 'Slug único da página' })
  @ApiOkResponse({ type: BusinessPagePublicResponseDto })
  @ApiNotFoundResponse({ description: 'Página não encontrada ou não aprovada' })
  getPublicPage(@Param('slug') slug: string): Promise<BusinessPagePublicResponseDto> {
    return this.service.getPublicPage(slug) as unknown as Promise<BusinessPagePublicResponseDto>;
  }
}

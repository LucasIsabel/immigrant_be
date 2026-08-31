import { Controller, Get, Param, Query } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { BusinessCitiesQueryDto } from './dto/business-cities-query.dto';
import { BusinessCityDto } from './dto/business-city.dto';
import { BusinessListQueryDto } from './dto/business-list-query.dto';
import {
  PaginatedPublicBusinessesResponseDto,
  PublicBusinessResponseDto,
} from './dto/public-business-response.dto';

@ApiTags('Business')
@Controller('business')
export class BusinessPublicController {
  constructor(private readonly service: BusinessService) {}

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar negócios públicos com filtros' })
  @ApiOkResponse({
    description: 'Lista paginada de negócios',
    type: PaginatedPublicBusinessesResponseDto,
  })
  getPublicBusinesses(@Query() query: BusinessListQueryDto) {
    return this.service.getPublicBusinesses(query);
  }

  /*
   * Declared before `public/:id` on purpose: Nest matches in order, and the
   * parameterised route would otherwise swallow "cities" as an id.
   */
  @Get('public/cities')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Cidades que têm negócios listados' })
  @ApiOkResponse({ type: [BusinessCityDto] })
  getPublicCities(@Query() query: BusinessCitiesQueryDto) {
    return this.service.getPublicCities(query);
  }

  @Get('public/:id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Buscar negócio público por ID' })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: PublicBusinessResponseDto })
  @ApiNotFoundResponse({ description: 'Negócio não encontrado ou privado' })
  getPublicBusinessById(@Param('id') id: string) {
    return this.service.getPublicBusinessById(id);
  }
}

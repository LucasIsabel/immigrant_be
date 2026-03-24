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
import { BusinessListQueryDto } from './dto/business-list-query.dto';
import { BusinessResponseDto } from './dto/business-response.dto';

@ApiTags('Business')
@Controller('business')
export class BusinessPublicController {
  constructor(private readonly service: BusinessService) {}

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar negócios públicos com filtros' })
  @ApiOkResponse({
    description: 'Lista paginada de negócios',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/BusinessResponseDto' },
        },
        total: { type: 'number', example: 42 },
      },
    },
  })
  getPublicBusinesses(@Query() query: BusinessListQueryDto) {
    return this.service.getPublicBusinesses(query);
  }

  @Get('public/:id')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Buscar negócio público por ID' })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  @ApiNotFoundResponse({ description: 'Negócio não encontrado ou privado' })
  getPublicBusinessById(@Param('id') id: string) {
    return this.service.getPublicBusinessById(id);
  }
}

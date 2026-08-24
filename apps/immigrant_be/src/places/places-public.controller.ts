import { Controller, Get, Query } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PlacesService } from './places.service';
import {
  PlaceCitiesQueryDto,
  PlacesListQueryDto,
} from './dto/places-list-query.dto';
import { PlaceCityDto } from './dto/place-city.dto';
import { PlaceResponseDto } from './dto/place-response.dto';

@ApiTags('Places')
// `PlaceResponseDto` só aparece dentro do `$ref` do schema inline abaixo, e o
// Swagger não registra um DTO que nenhuma rota declara em `type:`. Sem este
// `ApiExtraModels` a referência fica pendurada no docs-json e o codegen do
// frontend gera um tipo vazio.
@ApiExtraModels(PlaceResponseDto)
@Controller('places')
export class PlacesPublicController {
  constructor(private readonly service: PlacesService) {}

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar lugares turísticos de um país/cidade' })
  @ApiOkResponse({
    description: 'Lista paginada de lugares',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/PlaceResponseDto' },
        },
        total: { type: 'number', example: 10 },
      },
    },
  })
  getPublicPlaces(@Query() query: PlacesListQueryDto) {
    return this.service.getPublicPlaces(query);
  }

  @Get('public/cities')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Cidades que já têm lugares cadastrados, com o centro do mapa',
  })
  @ApiOkResponse({ type: [PlaceCityDto] })
  getCities(@Query() query: PlaceCitiesQueryDto) {
    return this.service.getCities(query);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { ItinerariesService } from './itineraries.service';
import {
  AddItineraryStopDto,
  AddItineraryStopResponseDto,
} from './dto/add-itinerary-stop.dto';
import { ListMyItinerariesQueryDto } from './dto/list-my-itineraries-query.dto';
import { ListPublicItinerariesQueryDto } from './dto/list-public-itineraries-query.dto';
import {
  PaginatedPublicItinerariesResponseDto,
  PublicItineraryResponseDto,
} from './dto/public-itinerary.dto';
import {
  ReportItineraryDto,
  ReportItineraryResponseDto,
} from './dto/report-itinerary.dto';
import {
  MyItineraryResponseDto,
  PaginatedMyItinerariesResponseDto,
} from './dto/itinerary-response.dto';
import { ReorderItineraryStopsDto } from './dto/reorder-itinerary-stops.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { UpdateItineraryVisibilityDto } from './dto/update-itinerary-visibility.dto';

/**
 * Declaration order is routing order: `mine` and `stops` are registered before
 * `:id`, or Express hands them to the detail handler as an id and the caller
 * gets "Roteiro não encontrado" for a route that exists.
 *
 * The anonymous routes come first for the same reason: `public` is a literal
 * segment, and Express would hand `/itineraries/public` to the detail handler
 * as if `public` were a slug.
 */
@ApiTags('Itineraries')
@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly service: ItinerariesService) {}

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar roteiros públicos',
    description:
      'O país filtra a coluna do roteiro; a cidade sub-filtra pelas paradas — "roteiros que passam por aqui", porque um percurso atravessa cidades.',
  })
  @ApiOkResponse({ type: PaginatedPublicItinerariesResponseDto })
  listPublic(
    @Query() query: ListPublicItinerariesQueryDto,
  ): Promise<PaginatedPublicItinerariesResponseDto> {
    return this.service.listPublic(query);
  }

  @Get('public/:slug')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Detalhe público de um roteiro',
    description:
      'Paradas indisponíveis saem e as restantes são renumeradas 1..n, para a lista e os pinos do mapa não poderem discordar.',
  })
  @ApiParam({ name: 'slug', description: 'Slug único do roteiro' })
  @ApiOkResponse({ type: PublicItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  getPublic(@Param('slug') slug: string): Promise<PublicItineraryResponseDto> {
    return this.service.getPublic(slug);
  }

  @Post('public/:slug/report')
  @AllowAnonymous()
  @Throttle({ default: { ttl: 60_000, limit: 3 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Denunciar um roteiro público',
    description:
      'Anónimo de propósito: exigir conta para denunciar é como a denúncia morre. É a rede que substitui a fila de moderação.',
  })
  @ApiParam({ name: 'slug', description: 'Slug único do roteiro' })
  @ApiCreatedResponse({ type: ReportItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  report(
    @Param('slug') slug: string,
    @Body() dto: ReportItineraryDto,
  ): Promise<ReportItineraryResponseDto> {
    return this.service.report(slug, dto);
  }

  @Get('mine')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Listar os meus roteiros' })
  @ApiOkResponse({ type: PaginatedMyItinerariesResponseDto })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  listMine(
    @Query() query: ListMyItinerariesQueryDto,
    @Session() session: UserSession,
  ): Promise<PaginatedMyItinerariesResponseDto> {
    return this.service.listMine(session.user.id, query);
  }

  @Post('stops')
  @Roles(UserRole.USER)
  @Throttle({ default: { ttl: 60_000, limit: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Adicionar uma parada, criando o roteiro se ainda não houver',
    description:
      'Sem `itineraryId`, o servidor usa o roteiro mais recente da pessoa naquele país e cria um se não existir nenhum.',
  })
  @ApiCreatedResponse({ type: AddItineraryStopResponseDto })
  @ApiBadRequestResponse({ description: 'Alvo inválido ou país divergente' })
  @ApiNotFoundResponse({
    description: 'Roteiro, lugar ou negócio não encontrado',
  })
  @ApiConflictResponse({ description: 'O item já está no roteiro' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  addStop(
    @Body() dto: AddItineraryStopDto,
    @Session() session: UserSession,
  ): Promise<AddItineraryStopResponseDto> {
    return this.service.addStop(session.user.id, dto);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Detalhe do meu roteiro',
    description:
      'Paradas indisponíveis aparecem com `available: false` — o dono precisa vê-las para as remover.',
  })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  getMine(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<MyItineraryResponseDto> {
    return this.service.getMine(id, session.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Renomear o roteiro',
    description: 'O slug não muda: um link já partilhado continua a resolver.',
  })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  rename(
    @Param('id') id: string,
    @Body() dto: UpdateItineraryDto,
    @Session() session: UserSession,
  ): Promise<MyItineraryResponseDto> {
    return this.service.rename(id, session.user.id, dto);
  }

  @Patch(':id/visibility')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Publicar ou despublicar',
    description: 'Imediato, sem fila de moderação — o interruptor é do dono.',
  })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  setVisibility(
    @Param('id') id: string,
    @Body() dto: UpdateItineraryVisibilityDto,
    @Session() session: UserSession,
  ): Promise<MyItineraryResponseDto> {
    return this.service.setVisibility(id, session.user.id, dto);
  }

  @Put(':id/stops/order')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Reordenar as paradas',
    description:
      'A lista tem de conter exatamente as paradas do roteiro, uma vez cada. Meia ordem é pior do que nenhuma.',
  })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiBadRequestResponse({ description: 'A ordem não corresponde às paradas' })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  reorderStops(
    @Param('id') id: string,
    @Body() dto: ReorderItineraryStopsDto,
    @Session() session: UserSession,
  ): Promise<MyItineraryResponseDto> {
    return this.service.reorderStops(id, session.user.id, dto);
  }

  @Delete(':id/stops/:stopId')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Remover uma parada' })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiParam({ name: 'stopId', description: 'UUID da parada' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro ou parada não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  removeStop(
    @Param('id') id: string,
    @Param('stopId') stopId: string,
    @Session() session: UserSession,
  ): Promise<MyItineraryResponseDto> {
    return this.service.removeStop(id, stopId, session.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Apagar o roteiro' })
  @ApiParam({ name: 'id', description: 'UUID do roteiro' })
  @ApiNoContentResponse({ description: 'Roteiro apagado' })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  remove(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<void> {
    return this.service.remove(id, session.user.id);
  }
}

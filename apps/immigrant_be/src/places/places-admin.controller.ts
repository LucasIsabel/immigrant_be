import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import {
  AdminPlaceResponseDto,
  CityIngestionDetailResponseDto,
  CityIngestionResponseDto,
  PaginatedCityIngestionsResponseDto,
} from './dto/city-ingestion-response.dto';
import { CreateCityIngestionDto } from './dto/create-city-ingestion.dto';
import { ListCityIngestionsQueryDto } from './dto/list-city-ingestions-query.dto';
import {
  RejectCityIngestionDto,
  RejectPlaceDto,
} from './dto/reject-city-ingestion.dto';
import { UpdateIngestedPlaceDto } from './dto/update-ingested-place.dto';
import { PlacesAdminService } from './places-admin.service';

/**
 * Toda resposta é declarada como classe nomeada em `@ApiResponse({ type })`.
 *
 * É essa declaração que vira tipo no frontend: um schema inline não gera nada
 * utilizável, e um `$ref` dentro dele exigiria `@ApiExtraModels`. Foi o que
 * custou dois PRs de retrabalho no #132/#133.
 */
@ApiTags('Admin — Places Ingestion')
@Controller('admin/places/ingestions')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso insuficiente' })
export class PlacesAdminController {
  constructor(private readonly service: PlacesAdminService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Disparar a ingestão de lugares de uma cidade' })
  @ApiAcceptedResponse({
    description: 'Ingestão criada e enfileirada',
    type: CityIngestionResponseDto,
  })
  @ApiConflictResponse({ description: 'Já existe ingestão ativa desta cidade' })
  create(
    @Body() dto: CreateCityIngestionDto,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.createIngestion(dto, session.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ingestões, com filtro por status' })
  @ApiOkResponse({ type: PaginatedCityIngestionsResponseDto })
  list(
    @Query() query: ListCityIngestionsQueryDto,
  ): Promise<PaginatedCityIngestionsResponseDto> {
    return this.service.listIngestions(query);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Detalhe da ingestão — lugares, traduções, proveniência e conflitos',
  })
  @ApiOkResponse({ type: CityIngestionDetailResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestão não encontrada' })
  @ApiParam({ name: 'id', description: 'UUID da ingestão' })
  detail(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CityIngestionDetailResponseDto> {
    return this.service.getIngestion(id);
  }

  @Patch(':id/places/:placeId')
  @ApiOperation({ summary: 'Editar um lugar em rascunho' })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado nesta ingestão' })
  @ApiConflictResponse({ description: 'O lugar não está em rascunho' })
  updatePlace(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
    @Body() dto: UpdateIngestedPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.updatePlace(id, placeId, dto);
  }

  @Post(':id/places/:placeId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recusar um lugar — ele não renasce no reprocesso' })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado nesta ingestão' })
  rejectPlace(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
    @Body() dto: RejectPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.rejectPlace(id, placeId, dto.reason);
  }

  @Post(':id/places/:placeId/retry-texts')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Re-enfileirar a escrita do texto de um lugar' })
  @ApiAcceptedResponse({ description: 'Job enfileirado' })
  @ApiNotFoundResponse({ description: 'Lugar não encontrado nesta ingestão' })
  retryTexts(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
  ): Promise<void> {
    return this.service.retryPlaceTexts(id, placeId);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Aprovar a cidade — publica todos os rascunhos de uma vez',
  })
  @ApiOkResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestão não encontrada' })
  @ApiConflictResponse({ description: 'A cidade não está pronta para revisão' })
  @ApiUnprocessableEntityResponse({
    description: 'Há lugares sem as três traduções — a resposta lista quais',
  })
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.approve(id, session.user.id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recusar a cidade inteira' })
  @ApiOkResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestão não encontrada' })
  @ApiConflictResponse({ description: 'A cidade não está pronta para revisão' })
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectCityIngestionDto,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.reject(id, session.user.id, dto.reason);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Reprocessar uma ingestão que falhou' })
  @ApiAcceptedResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestão não encontrada' })
  @ApiConflictResponse({ description: 'A ingestão não está em FAILED' })
  retry(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CityIngestionResponseDto> {
    return this.service.retry(id);
  }
}

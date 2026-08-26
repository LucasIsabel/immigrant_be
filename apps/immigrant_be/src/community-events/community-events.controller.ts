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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CommunityEventsService } from './community-events.service';
import { CreateCommunityEventDto } from './dto/create-community-event.dto';
import { UpdateCommunityEventDto } from './dto/update-community-event.dto';
import { ReportCommunityEventDto } from './dto/report-community-event.dto';
import { RemoveEventImageDto } from './dto/remove-event-image.dto';
import { ListCommunityEventsQueryDto } from './dto/list-community-events-query.dto';
import { ListPublicCommunityEventsQueryDto } from './dto/list-public-community-events-query.dto';
import {
  CommunityEventResponseDto,
  PaginatedCommunityEventsResponseDto,
} from './dto/community-event-response.dto';
import {
  PaginatedPublicCommunityEventsResponseDto,
  PublicCommunityEventDto,
} from './dto/public-community-event.dto';
import {
  UploadEventGalleryImageResponseDto,
  UploadEventImageResponseDto,
} from './dto/upload-event-image-response.dto';
import { ReportCommunityEventResponseDto } from './dto/report-community-event-response.dto';

/**
 * Declaration order is routing order: `public`, `public/:slug`,
 * `public/:slug/report` and `mine` all have to be registered before `:id`,
 * or Express hands `mine` to the owner detail handler as an id.
 */
@ApiTags('Community Events')
@Controller('events')
export class CommunityEventsController {
  constructor(private readonly service: CommunityEventsService) {}

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar eventos aprovados que ainda não terminaram',
    description:
      '`when=today` e `when=weekend` respeitam o fuso de cada evento, não o de quem consulta.',
  })
  @ApiOkResponse({ type: PaginatedPublicCommunityEventsResponseDto })
  listPublic(
    @Query() query: ListPublicCommunityEventsQueryDto,
  ): Promise<PaginatedPublicCommunityEventsResponseDto> {
    return this.service.listPublic(query);
  }

  @Get('public/:slug')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Detalhe público de um evento aprovado' })
  @ApiParam({ name: 'slug', description: 'Slug único do evento' })
  @ApiOkResponse({ type: PublicCommunityEventDto })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  getPublic(@Param('slug') slug: string): Promise<PublicCommunityEventDto> {
    return this.service.getPublic(slug);
  }

  @Post('public/:slug/report')
  @AllowAnonymous()
  @Throttle({ default: { ttl: 60_000, limit: 3 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Denunciar um evento publicado',
    description:
      'Anónimo de propósito: exigir conta para denunciar é como a denúncia morre.',
  })
  @ApiParam({ name: 'slug', description: 'Slug único do evento' })
  @ApiCreatedResponse({ type: ReportCommunityEventResponseDto })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  report(
    @Param('slug') slug: string,
    @Body() dto: ReportCommunityEventDto,
  ): Promise<ReportCommunityEventResponseDto> {
    return this.service.report(slug, dto);
  }

  @Get('mine')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Listar os meus eventos, em qualquer status' })
  @ApiOkResponse({ type: PaginatedCommunityEventsResponseDto })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  listMine(
    @Query() query: ListCommunityEventsQueryDto,
    @Session() session: UserSession,
  ): Promise<PaginatedCommunityEventsResponseDto> {
    return this.service.listMine(session.user.id, query);
  }

  @Post()
  @Roles(UserRole.USER)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Criar evento em DRAFT',
    description:
      'Exige o aceite dos termos na versão vigente; uma versão antiga é recusada com 400.',
  })
  @ApiCreatedResponse({ type: CommunityEventResponseDto })
  @ApiBadRequestResponse({
    description: 'Termos desatualizados ou dados inválidos',
  })
  @ApiConflictResponse({ description: 'Eventos demais aguardando análise' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  create(
    @Body() dto: CreateCommunityEventDto,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.create(session.user.id, dto);
  }

  @Get(':id')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Detalhe do meu evento' })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  getMine(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.getMine(id, session.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Editar evento',
    description:
      'Editar um evento APPROVED devolve-o a PENDING_REVIEW e some do público até nova aprovação.',
  })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiConflictResponse({ description: 'Evento em análise ou cancelado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommunityEventDto,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.update(id, session.user.id, dto);
  }

  @Post(':id/image')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Enviar a foto de capa do evento',
    description:
      'JPEG/PNG/WebP até 5 MB. Numa capa nova de evento APPROVED, o evento volta a análise.',
  })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: UploadEventImageResponseDto })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  uploadImage(
    @Param('id') id: string,
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadEventImageResponseDto> {
    return this.service.uploadImage(id, session.user.id, file);
  }

  @Post(':id/images')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Adicionar uma foto à galeria do evento',
    description:
      'JPEG/PNG/WebP até 5 MB, no máximo 8 fotos além da capa. Numa galeria alterada de evento APPROVED, o evento volta a análise.',
  })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: UploadEventGalleryImageResponseDto })
  @ApiConflictResponse({ description: 'Galeria cheia ou evento cancelado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  uploadGalleryImage(
    @Param('id') id: string,
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadEventGalleryImageResponseDto> {
    return this.service.uploadGalleryImage(id, session.user.id, file);
  }

  @Delete(':id/images')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Remover uma foto da galeria do evento',
    description:
      'A foto é identificada pela URL. Numa galeria alterada de evento APPROVED, o evento volta a análise.',
  })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiNotFoundResponse({ description: 'Foto não encontrada' })
  @ApiConflictResponse({ description: 'Evento cancelado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  removeGalleryImage(
    @Param('id') id: string,
    @Body() dto: RemoveEventImageDto,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.removeGalleryImage(id, session.user.id, dto);
  }

  @Post(':id/submit')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Enviar o evento para análise' })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiConflictResponse({ description: 'Evento já está em análise' })
  @ApiUnprocessableEntityResponse({
    description: 'Evento ainda não tem imagem',
  })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  submit(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.submit(id, session.user.id);
  }

  @Post(':id/cancel')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Cancelar o evento (some do público)' })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiConflictResponse({ description: 'Evento já está cancelado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  cancel(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.cancel(id, session.user.id);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CommunityEventsService } from './community-events.service';
import { ListCommunityEventsQueryDto } from './dto/list-community-events-query.dto';
import { RejectCommunityEventDto } from './dto/reject-community-event.dto';
import {
  CommunityEventResponseDto,
  PaginatedCommunityEventsResponseDto,
} from './dto/community-event-response.dto';

@ApiTags('Admin — Community Events')
@Controller('admin/events')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso insuficiente' })
export class CommunityEventsAdminController {
  constructor(private readonly service: CommunityEventsService) {}

  @Get()
  @ApiOperation({
    summary: 'Fila de moderação de eventos',
    description:
      'O que está em análise vem primeiro, submissão mais antiga no topo. Cada item traz `reportCount`.',
  })
  @ApiOkResponse({ type: PaginatedCommunityEventsResponseDto })
  list(
    @Query() query: ListCommunityEventsQueryDto,
  ): Promise<PaginatedCommunityEventsResponseDto> {
    return this.service.listForAdmin(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe do evento, com as denúncias' })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  detail(@Param('id') id: string): Promise<CommunityEventResponseDto> {
    return this.service.getForAdmin(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aprovar evento — passa a aparecer ao público' })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiConflictResponse({ description: 'Evento não está em análise' })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  approve(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.approve(id, session.user.id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Recusar ou derrubar evento',
    description:
      'Aceita PENDING_REVIEW (recusa) e APPROVED (derrubada depois de denúncia). Motivo obrigatório.',
  })
  @ApiParam({ name: 'id', description: 'UUID do evento' })
  @ApiOkResponse({ type: CommunityEventResponseDto })
  @ApiConflictResponse({
    description: 'Evento não está em análise nem publicado',
  })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  reject(
    @Param('id') id: string,
    @Body() dto: RejectCommunityEventDto,
    @Session() session: UserSession,
  ): Promise<CommunityEventResponseDto> {
    return this.service.reject(id, session.user.id, dto);
  }
}

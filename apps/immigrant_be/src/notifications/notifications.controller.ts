import {
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
import { Throttle } from '@nestjs/throttler';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { NotificationsInboxService } from './notifications.service';
import { ListNotificationsQueryDto } from './dto/list-notifications-query.dto';
import {
  NotificationDto,
  PaginatedNotificationsResponseDto,
  ReadAllResponseDto,
  UnreadCountResponseDto,
} from './dto/notification-response.dto';

/**
 * Declaration order is routing order: `unread-count` and `read-all` are
 * registered before `:id`, or Express hands them to the by-id handlers as an id
 * and the caller gets a 404 — or, worse, a `ParseUUIDPipe` 400 — for a route
 * that exists. Same trap the itineraries controller documents.
 */
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsInboxService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Listar as minhas notificações',
    description: 'Mais recentes primeiro, lidas e por ler na mesma lista.',
  })
  @ApiOkResponse({ type: PaginatedNotificationsResponseDto })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  list(
    @Query() query: ListNotificationsQueryDto,
    @Session() session: UserSession,
  ): Promise<PaginatedNotificationsResponseDto> {
    return this.service.list(session.user.id, query);
  }

  @Get('unread-count')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Quantas ainda não foram lidas',
    description:
      'O que o contador do sino mostra. Separado da listagem porque sobe sozinho pelo SSE, sem ninguém abrir o painel.',
  })
  @ApiOkResponse({ type: UnreadCountResponseDto })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  unreadCount(
    @Session() session: UserSession,
  ): Promise<UnreadCountResponseDto> {
    return this.service.unreadCount(session.user.id);
  }

  @Post('read-all')
  @Roles(UserRole.USER)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Marcar todas as minhas como lidas' })
  @ApiOkResponse({ type: ReadAllResponseDto })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  readAll(@Session() session: UserSession): Promise<ReadAllResponseDto> {
    return this.service.markAllRead(session.user.id);
  }

  @Patch(':id/read')
  @Roles(UserRole.USER)
  @Throttle({ default: { ttl: 60_000, limit: 60 } })
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Marcar uma como lida',
    description:
      'Idempotente: marcar de novo devolve a notificação sem reescrever o momento em que foi lida.',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: NotificationDto })
  @ApiNotFoundResponse({ description: 'Notificação não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  markRead(
    @Param('id', ParseUUIDPipe) id: string,
    @Session() session: UserSession,
  ): Promise<NotificationDto> {
    return this.service.markRead(id, session.user.id);
  }
}

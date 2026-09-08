import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
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
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment-response.dto';
import { PaginatedInboxResponseDto } from './dto/inbox-comment.dto';
import {
  AdminCommentsQueryDto,
  RejectCommentDto,
} from './dto/moderate-comment.dto';

/**
 * The admin's way into comments, and the only moderation the blog has.
 *
 * A controller of its own rather than admin branches inside the owner's
 * routes: `@Roles(ADMIN)` on the class is a single fact about the whole file,
 * and `POST /comments/:id/reject` goes on meaning exactly what it says.
 */
@ApiTags('Comments')
@Controller('admin/comments')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
export class CommentsAdminController {
  constructor(private readonly service: CommentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Comentários de todas as superfícies',
    description:
      'Filtrável por estado e por tipo de conteúdo, o blog incluído.',
  })
  @ApiOkResponse({ type: PaginatedInboxResponseDto })
  list(
    @Query() query: AdminCommentsQueryDto,
  ): Promise<PaginatedInboxResponseDto> {
    return this.service.adminList(query);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Libertar um comentário, como admin' })
  @ApiParam({ name: 'id', description: 'UUID do comentário' })
  @ApiOkResponse({ type: CommentDto })
  @ApiNotFoundResponse({ description: 'Comentário não encontrado' })
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Session() session: UserSession,
  ): Promise<CommentDto> {
    return this.service.approve(id, session.user.id, true);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Derrubar um comentário',
    description:
      'É como o admin esconde: `REJECTED` com motivo, e não uma coluna à ' +
      'parte de «escondido por admin». Reversível, e o motivo fica.',
  })
  @ApiParam({ name: 'id', description: 'UUID do comentário' })
  @ApiOkResponse({ type: CommentDto })
  @ApiNotFoundResponse({ description: 'Comentário não encontrado' })
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectCommentDto,
    @Session() session: UserSession,
  ): Promise<CommentDto> {
    return this.service.reject(id, session.user.id, true, dto.reason ?? null);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Apagar um comentário de vez',
    description:
      'Hard delete, para conteúdo que não pode ficar guardado. Recusar é o ' +
      'caminho normal; isto é a excepção.',
  })
  @ApiParam({ name: 'id', description: 'UUID do comentário' })
  @ApiNoContentResponse({ description: 'Comentário apagado' })
  @ApiNotFoundResponse({ description: 'Comentário não encontrado' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.adminRemove(id);
  }
}

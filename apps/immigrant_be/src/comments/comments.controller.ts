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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
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
import { MAX_COMMENT_IMAGE_SIZE } from './comments.constants';
import { CommentsService } from './comments.service';
import {
  CommentDto,
  PaginatedCommentsResponseDto,
} from './dto/comment-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ListCommentsQueryDto } from './dto/list-comments-query.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get()
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Comentários de um conteúdo',
    description:
      'Comentários de topo com as respostas por baixo. Quem está autenticado ' +
      'vê também os seus próprios comentários à espera de aprovação.',
  })
  @ApiOkResponse({ type: PaginatedCommentsResponseDto })
  list(
    @Query() query: ListCommentsQueryDto,
    @Session() session?: UserSession,
  ): Promise<PaginatedCommentsResponseDto> {
    return this.service.list(query, session?.user?.id);
  }

  /*
   * Multipart because the photo travels with the comment. Sending the text
   * first and attaching the image afterwards would publish a comment and then
   * change it under whoever had already read it.
   */
  @Post()
  @Roles(UserRole.USER)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_COMMENT_IMAGE_SIZE } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['target', 'targetId', 'body'],
      properties: {
        target: {
          type: 'string',
          enum: ['post', 'business', 'event', 'itinerary'],
        },
        targetId: { type: 'string', format: 'uuid' },
        body: { type: 'string', maxLength: 2000 },
        parentId: { type: 'string', format: 'uuid' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Comentar',
    description:
      'Sem fotografia publica na hora. Com fotografia fica à espera do dono ' +
      'da página. Artigos não aceitam fotografia.',
  })
  @ApiCreatedResponse({ type: CommentDto })
  @ApiBadRequestResponse({
    description:
      'Fotografia num artigo, resposta a uma resposta ou dados inválidos',
  })
  @ApiNotFoundResponse({ description: 'Conteúdo não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  create(
    @Body() dto: CreateCommentDto,
    @Session() session: UserSession,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CommentDto> {
    return this.service.create(session.user.id, dto, file);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Apagar o meu comentário',
    description:
      'Sem respostas por baixo a linha sai. Com respostas fica a âncora, sem ' +
      'texto nem fotografia, para as respostas não desaparecerem com ela.',
  })
  @ApiParam({ name: 'id', description: 'UUID do comentário' })
  @ApiNoContentResponse({ description: 'Comentário apagado' })
  @ApiNotFoundResponse({ description: 'Comentário não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Session() session: UserSession,
  ): Promise<void> {
    return this.service.remove(id, session.user.id);
  }
}

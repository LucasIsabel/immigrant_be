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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiAcceptedResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog-tag.dto';
import { CreateBlogAuthorDto } from './dto/create-blog-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-blog-author.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { BlogPostListResponseDto } from './dto/blog-post-list-response.dto';
import { BlogCategoryResponseDto } from './dto/blog-category-response.dto';
import { BlogTagResponseDto } from './dto/blog-tag-response.dto';
import { BlogAuthorResponseDto } from './dto/blog-author-response.dto';
import { AdminBlogQueryDto } from './dto/blog-query.dto';
import { UpsertBlogTranslationDto } from './dto/upsert-blog-translation.dto';
import { BlogTranslationResponseDto } from './dto/blog-translation-response.dto';
import {
  BLOG_TRANSLATION_QUEUE,
  TRANSLATE_BLOG_POST,
} from '@app/config/constants';

@ApiTags('Admin Blog')
@Controller('admin/blog')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class BlogAdminController {
  constructor(
    private readonly blogService: BlogService,
    @InjectQueue(BLOG_TRANSLATION_QUEUE)
    private readonly translationQueue: Queue,
  ) {}

  // ─── Posts ────────────────────────────────────────────────────────────────

  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar post',
    description:
      'Cria um novo post no blog. Slug gerado automaticamente pelo título.',
  })
  @ApiBody({ type: CreateBlogPostDto })
  @ApiCreatedResponse({
    description: 'Post criado com sucesso',
    type: BlogPostResponseDto,
  })
  createPost(@Session() session: any, @Body() dto: CreateBlogPostDto) {
    return this.blogService.createPost(session.user.id, dto);
  }

  @Get('posts')
  @ApiOperation({
    summary: 'Listar todos os posts (admin)',
    description:
      'Retorna todos os posts independente do status, com filtros opcionais',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts listados com sucesso',
    type: BlogPostListResponseDto,
  })
  findAllPosts(@Query() query: AdminBlogQueryDto) {
    return this.blogService.findAdminPosts(query);
  }

  @Patch('posts/:id')
  @ApiOperation({
    summary: 'Atualizar post',
    description:
      'Atualiza dados de um post existente. Slug e reading_time recalculados automaticamente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateBlogPostDto })
  @ApiResponse({
    status: 200,
    description: 'Post atualizado com sucesso',
    type: BlogPostResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  updatePost(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blogService.updatePost(id, dto);
  }

  @Delete('posts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover post',
    description: 'Remove permanentemente um post do blog',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({ description: 'Post removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  deletePost(@Param('id') id: string) {
    return this.blogService.deletePost(id);
  }

  // ─── Translations ─────────────────────────────────────────────────────────

  @Get('posts/:id/translations')
  @ApiOperation({
    summary: 'Listar traduções do post',
    description: 'Retorna todas as traduções disponíveis para um post',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiResponse({
    status: 200,
    description: 'Traduções listadas',
    type: [BlogTranslationResponseDto],
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  getPostTranslations(@Param('id') id: string) {
    return this.blogService.getPostTranslations(id);
  }

  @Put('posts/:id/translations/:locale')
  @ApiOperation({
    summary: 'Criar ou atualizar tradução manual',
    description:
      'Upsert de tradução humana para um locale específico ("pt" | "en" | "es")',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiParam({
    name: 'locale',
    description: 'Locale da tradução',
    example: 'en',
  })
  @ApiBody({ type: UpsertBlogTranslationDto })
  @ApiResponse({
    status: 200,
    description: 'Tradução salva com sucesso',
    type: BlogTranslationResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  upsertPostTranslation(
    @Param('id') id: string,
    @Param('locale') locale: string,
    @Body() dto: UpsertBlogTranslationDto,
  ) {
    return this.blogService.upsertPostTranslation(id, locale, dto);
  }

  @Post('posts/:id/translations/enqueue')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Enfileirar tradução automática via IA',
    description:
      'Enfileira jobs de tradução para Português e Espanhol usando Gemini (a partir do conteúdo em inglês)',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiAcceptedResponse({ description: 'Jobs enfileirados com sucesso' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  async enqueueTranslation(
    @Param('id') id: string,
    @Session() session: UserSession,
  ) {
    // Validate post exists
    await this.blogService.getPostTranslations(id);

    const locales = ['pt', 'es'] as const;
    const requestedByUserId = session?.user?.id;

    await this.translationQueue.addBulk(
      locales.map((locale) => ({
        name: TRANSLATE_BLOG_POST,
        data: {
          postId: id,
          targetLocale: locale,
          requestedByUserId: requestedByUserId ?? undefined,
        },
        opts: { removeOnComplete: 10, removeOnFail: 5 },
      })),
    );

    return { message: 'Translation jobs enqueued', locales };
  }

  // ─── Categories ───────────────────────────────────────────────────────────

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar categoria',
    description:
      'Cria uma nova categoria. Slug gerado automaticamente pelo nome.',
  })
  @ApiBody({ type: CreateBlogCategoryDto })
  @ApiCreatedResponse({
    description: 'Categoria criada com sucesso',
    type: BlogCategoryResponseDto,
  })
  createCategory(@Body() dto: CreateBlogCategoryDto) {
    return this.blogService.createCategory(dto);
  }

  @Patch('categories/:id')
  @ApiOperation({
    summary: 'Atualizar categoria',
    description:
      'Atualiza dados de uma categoria existente. Slug recalculado automaticamente pelo nome.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateBlogCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    type: BlogCategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada' })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateBlogCategoryDto) {
    return this.blogService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover categoria',
    description: 'Remove permanentemente uma categoria do blog',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({ description: 'Categoria removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Categoria não encontrada' })
  deleteCategory(@Param('id') id: string) {
    return this.blogService.deleteCategory(id);
  }

  // ─── Tags ─────────────────────────────────────────────────────────────────

  @Post('tags')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar tag',
    description: 'Cria uma nova tag. Slug gerado automaticamente pelo nome.',
  })
  @ApiBody({ type: CreateBlogTagDto })
  @ApiCreatedResponse({
    description: 'Tag criada com sucesso',
    type: BlogTagResponseDto,
  })
  createTag(@Body() dto: CreateBlogTagDto) {
    return this.blogService.createTag(dto);
  }

  @Patch('tags/:id')
  @ApiOperation({
    summary: 'Atualizar tag',
    description:
      'Atualiza dados de uma tag existente. Slug recalculado automaticamente pelo nome.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tag',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateBlogTagDto })
  @ApiResponse({
    status: 200,
    description: 'Tag atualizada com sucesso',
    type: BlogTagResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Tag não encontrada' })
  updateTag(@Param('id') id: string, @Body() dto: UpdateBlogTagDto) {
    return this.blogService.updateTag(id, dto);
  }

  @Delete('tags/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover tag',
    description: 'Remove permanentemente uma tag do blog',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tag',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({ description: 'Tag removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Tag não encontrada' })
  deleteTag(@Param('id') id: string) {
    return this.blogService.deleteTag(id);
  }

  // ─── Authors ─────────────────────────────────────────────────────────────────

  @Post('authors')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar autor',
    description: 'Cria um novo autor do blog',
  })
  @ApiBody({ type: CreateBlogAuthorDto })
  @ApiCreatedResponse({
    description: 'Autor criado com sucesso',
    type: BlogAuthorResponseDto,
  })
  createAuthor(@Body() dto: CreateBlogAuthorDto) {
    return this.blogService.createAuthor(dto);
  }

  @Get('authors')
  @ApiOperation({
    summary: 'Listar autores',
    description: 'Retorna todos os autores do blog',
  })
  @ApiResponse({
    status: 200,
    description: 'Autores listados com sucesso',
    type: [BlogAuthorResponseDto],
  })
  findAllAuthors() {
    return this.blogService.findAllAuthors();
  }

  @Get('authors/:id')
  @ApiOperation({
    summary: 'Buscar autor por ID',
    description: 'Retorna um autor pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do autor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Autor encontrado',
    type: BlogAuthorResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  findAuthorById(@Param('id') id: string) {
    return this.blogService.findAuthorById(id);
  }

  @Patch('authors/:id')
  @ApiOperation({
    summary: 'Atualizar autor',
    description: 'Atualiza dados de um autor existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do autor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateBlogAuthorDto })
  @ApiResponse({
    status: 200,
    description: 'Autor atualizado com sucesso',
    type: BlogAuthorResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  updateAuthor(@Param('id') id: string, @Body() dto: UpdateBlogAuthorDto) {
    return this.blogService.updateAuthor(id, dto);
  }

  @Delete('authors/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover autor',
    description:
      'Remove um autor do blog. Posts com display_author_id apontando para este autor terão o vínculo removido (SetNull).',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do autor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({ description: 'Autor removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  deleteAuthor(@Param('id') id: string) {
    return this.blogService.deleteAuthor(id);
  }
}

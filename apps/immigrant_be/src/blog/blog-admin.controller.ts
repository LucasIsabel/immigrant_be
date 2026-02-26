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
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { CreateBlogAuthorDto } from './dto/create-blog-author.dto';
import { UpdateBlogAuthorDto } from './dto/update-blog-author.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { BlogPostListResponseDto } from './dto/blog-post-list-response.dto';
import { BlogCategoryResponseDto } from './dto/blog-category-response.dto';
import { BlogTagResponseDto } from './dto/blog-tag-response.dto';
import { BlogAuthorResponseDto } from './dto/blog-author-response.dto';
import { AdminBlogQueryDto } from './dto/blog-query.dto';

@ApiTags('Admin Blog')
@Controller('admin/blog')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class BlogAdminController {
  constructor(private readonly blogService: BlogService) {}

  // ─── Posts ────────────────────────────────────────────────────────────────

  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar post',
    description: 'Cria um novo post no blog. Slug gerado automaticamente pelo título.',
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
    description: 'Retorna todos os posts independente do status, com filtros opcionais',
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
    description: 'Atualiza dados de um post existente. Slug e reading_time recalculados automaticamente.',
  })
  @ApiParam({ name: 'id', description: 'ID do post', example: '123e4567-e89b-12d3-a456-426614174000' })
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
  @ApiParam({ name: 'id', description: 'ID do post', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiNoContentResponse({ description: 'Post removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  deletePost(@Param('id') id: string) {
    return this.blogService.deletePost(id);
  }

  // ─── Categories ───────────────────────────────────────────────────────────

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar categoria',
    description: 'Cria uma nova categoria. Slug gerado automaticamente pelo nome.',
  })
  @ApiBody({ type: CreateBlogCategoryDto })
  @ApiCreatedResponse({
    description: 'Categoria criada com sucesso',
    type: BlogCategoryResponseDto,
  })
  createCategory(@Body() dto: CreateBlogCategoryDto) {
    return this.blogService.createCategory(dto);
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
  @ApiParam({ name: 'id', description: 'ID do autor', example: '123e4567-e89b-12d3-a456-426614174000' })
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
  @ApiParam({ name: 'id', description: 'ID do autor', example: '123e4567-e89b-12d3-a456-426614174000' })
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
    description: 'Remove um autor do blog. Posts com display_author_id apontando para este autor terão o vínculo removido (SetNull).',
  })
  @ApiParam({ name: 'id', description: 'ID do autor', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiNoContentResponse({ description: 'Autor removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  deleteAuthor(@Param('id') id: string) {
    return this.blogService.deleteAuthor(id);
  }
}

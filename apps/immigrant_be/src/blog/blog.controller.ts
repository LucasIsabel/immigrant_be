import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AllowAnonymous, Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { BlogService } from './blog.service';
import { BlogQueryDto, AdminBlogQueryDto } from './dto/blog-query.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { BlogPostListResponseDto } from './dto/blog-post-list-response.dto';
import { BlogCategoryResponseDto } from './dto/blog-category-response.dto';
import { BlogTagResponseDto } from './dto/blog-tag-response.dto';
import { BlogAuthorResponseDto } from './dto/blog-author-response.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar posts publicados',
    description:
      'Retorna lista paginada de posts publicados, com filtros opcionais por categoria e tag',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts listados com sucesso',
    type: BlogPostListResponseDto,
  })
  findPublishedPosts(
    @Query() query: BlogQueryDto,
    @Session() session?: UserSession,
  ) {
    return this.blogService.findPublishedPosts(
      query,
      session?.user?.id,
    );
  }

  @Get('posts/admin')
  @Roles(UserRole.ADMIN)
  @ApiCookieAuth('better-auth.session_token')
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
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Requer role de administrador' })
  findAdminPosts(@Query() query: AdminBlogQueryDto) {
    return this.blogService.findAdminPosts(query);
  }

  @Get('posts/:slug')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Buscar post por slug',
    description: 'Retorna post individual e incrementa contador de visualizações',
  })
  @ApiParam({
    name: 'slug',
    description: 'Slug do post',
    example: 'como-imigrar-para-o-canada-em-2024',
  })
  @ApiResponse({
    status: 200,
    description: 'Post encontrado',
    type: BlogPostResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  findPostBySlug(
    @Param('slug') slug: string,
    @Query('lang') lang?: string,
    @Session() session?: UserSession,
  ) {
    return this.blogService.findPostBySlug(
      slug,
      lang,
      session?.user?.id,
    );
  }

  @Get('categories')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar categorias',
    description: 'Retorna todas as categorias do blog',
  })
  @ApiResponse({
    status: 200,
    description: 'Categorias listadas com sucesso',
    type: [BlogCategoryResponseDto],
  })
  findAllCategories() {
    return this.blogService.findAllCategories();
  }

  @Get('tags')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar tags',
    description: 'Retorna todas as tags do blog',
  })
  @ApiResponse({
    status: 200,
    description: 'Tags listadas com sucesso',
    type: [BlogTagResponseDto],
  })
  findAllTags() {
    return this.blogService.findAllTags();
  }

  @Get('authors')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar autores',
    description: 'Retorna todos os autores do blog (público)',
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
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Buscar autor por ID',
    description: 'Retorna um autor pelo ID (público)',
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

  @Post('posts/:id/like')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Toggle like em post',
    description:
      'Alterna o like do usuário autenticado no post. Requer autenticação.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do post (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Like alternado com sucesso',
    schema: { type: 'object', properties: { liked: { type: 'boolean' } } },
  })
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  toggleLike(@Param('id') id: string, @Session() session: UserSession) {
    return this.blogService.togglePostLike(id, session.user.id);
  }
}

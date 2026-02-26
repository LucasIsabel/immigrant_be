import { Controller, Get, Param, Query } from '@nestjs/common';
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
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { BlogService } from './blog.service';
import { BlogQueryDto, AdminBlogQueryDto } from './dto/blog-query.dto';
import { BlogPostResponseDto } from './dto/blog-post-response.dto';
import { BlogPostListResponseDto } from './dto/blog-post-list-response.dto';
import { BlogCategoryResponseDto } from './dto/blog-category-response.dto';
import { BlogTagResponseDto } from './dto/blog-tag-response.dto';
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
  findPublishedPosts(@Query() query: BlogQueryDto) {
    return this.blogService.findPublishedPosts(query);
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
  findPostBySlug(@Param('slug') slug: string) {
    return this.blogService.findPostBySlug(slug);
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
}

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
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
import { BlogPersonasService } from './blog-personas.service';
import { CreateBlogPersonaDto } from './dto/create-blog-persona.dto';
import { UpdateBlogPersonaDto } from './dto/update-blog-persona.dto';
import { BlogPersonaResponseDto } from './dto/blog-persona-response.dto';

@ApiTags('Blog Personas')
@Controller('admin/blog/personas')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class BlogPersonasController {
  constructor(private readonly blogPersonasService: BlogPersonasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma persona da equipe de reportagem' })
  @ApiBody({ type: CreateBlogPersonaDto })
  @ApiCreatedResponse({ type: BlogPersonaResponseDto })
  @ApiConflictResponse({ description: 'Slug ou autor já em uso' })
  @ApiNotFoundResponse({ description: 'Autor do blog não encontrado' })
  create(@Body() dto: CreateBlogPersonaDto) {
    return this.blogPersonasService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar personas' })
  @ApiOkResponse({ type: [BlogPersonaResponseDto] })
  findAll() {
    return this.blogPersonasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma persona' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: BlogPersonaResponseDto })
  @ApiNotFoundResponse({ description: 'Persona não encontrada' })
  findById(@Param('id') id: string) {
    return this.blogPersonasService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma persona' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateBlogPersonaDto })
  @ApiOkResponse({ type: BlogPersonaResponseDto })
  @ApiConflictResponse({
    description: 'Slug em uso, autor em uso, ou geração em andamento',
  })
  @ApiNotFoundResponse({ description: 'Persona não encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateBlogPersonaDto) {
    return this.blogPersonasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Apagar uma persona' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse()
  @ApiConflictResponse({ description: 'Geração em andamento' })
  @ApiNotFoundResponse({ description: 'Persona não encontrada' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.blogPersonasService.delete(id);
  }
}

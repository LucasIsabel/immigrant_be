import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { AiImageService } from './ai-image.service';
import { GenerateAiImageDto } from './dto/generate-ai-image.dto';

@ApiTags('AI Image')
@Controller('admin/ai-image')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class AiImageController {
  constructor(private readonly aiImageService: AiImageService) {}

  @Post('generate')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Gerar imagem com IA',
    description:
      'Enfileira a geração de uma imagem via Gemini. A imagem ficará disponível quando o job for processado.',
  })
  @ApiResponse({ status: 202, description: 'Geração enfileirada com sucesso' })
  generate(@Body() dto: GenerateAiImageDto, @Session() session: UserSession) {
    const userId = session?.user?.id;
    if (!userId) throw new UnauthorizedException('User ID required');
    return this.aiImageService.generate(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar imagens geradas',
    description: 'Retorna imagens geradas com paginação e filtros opcionais',
  })
  @ApiQuery({ name: 'folder', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Lista de imagens' })
  findAll(
    @Query('folder') folder?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.aiImageService.findAll({
      folder,
      status,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma imagem por ID' })
  @ApiParam({ name: 'id', description: 'ID da imagem' })
  @ApiResponse({ status: 200, description: 'Imagem encontrada' })
  findOne(@Param('id') id: string) {
    return this.aiImageService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover imagem',
    description: 'Remove a imagem do bucket e do banco de dados',
  })
  @ApiParam({ name: 'id', description: 'ID da imagem' })
  @ApiNoContentResponse({ description: 'Imagem removida' })
  async remove(@Param('id') id: string) {
    await this.aiImageService.remove(id);
  }
}

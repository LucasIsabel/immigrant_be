import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StorageService } from '@app/storage';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { StorageFileItemDto } from './dto/storage-file-item.dto';
import { UploadResponseDto } from './dto/upload-response.dto';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

@ApiTags('Admin Storage')
@Controller('admin/storage')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class AdminStorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('folders')
  @ApiOperation({ summary: 'Listar pastas disponíveis no bucket' })
  @ApiResponse({ status: 200, type: [String] })
  async listFolders(): Promise<string[]> {
    return this.storageService.listFolders();
  }

  @Get('files')
  @ApiOperation({ summary: 'Listar arquivos de uma pasta (ou todo o bucket)' })
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Pasta para filtrar',
    example: 'uploads',
  })
  @ApiResponse({ status: 200, type: [StorageFileItemDto] })
  async listFiles(
    @Query('folder') folder?: string,
  ): Promise<StorageFileItemDto[]> {
    return this.storageService.listFiles(folder);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  @ApiOperation({
    summary: 'Upload de arquivo para o bucket (sem restrição de mime)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Pasta de destino',
    example: 'uploads',
  })
  @ApiResponse({ status: 201, type: UploadResponseDto })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = 'uploads',
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const { url, key } = await this.storageService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      folder,
    );

    return {
      url,
      key,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }

  @Delete('file')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar arquivo pelo key' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'Key do arquivo no bucket',
    example: 'uploads/abc123.png',
  })
  @ApiNoContentResponse({ description: 'Arquivo deletado com sucesso' })
  async deleteFile(@Query('key') key: string): Promise<void> {
    if (!key) {
      throw new BadRequestException('Key do arquivo é obrigatório');
    }
    await this.storageService.deleteFile(key);
  }
}

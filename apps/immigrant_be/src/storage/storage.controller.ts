import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StorageService } from '@app/storage';
import { UploadResponseDto } from './dto/upload-response.dto';
import {
  normalizeUploadFolder,
  validateUploadMimeForFolder,
} from './storage-upload.util';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  @ApiOperation({ summary: 'Upload de arquivo para R2' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Pasta de destino no bucket',
    example: 'uploads',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({ status: 201, type: UploadResponseDto })
  @ApiResponse({ status: 400, description: 'Tipo de arquivo não permitido' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = 'uploads',
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const safeFolder = normalizeUploadFolder(folder);
    validateUploadMimeForFolder(safeFolder, file.mimetype, ALLOWED_MIME_TYPES);

    const { url, key } = await this.storageService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      safeFolder,
    );

    return {
      url,
      key,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
    };
  }
}

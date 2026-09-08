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
  assertUploadFolderAllowed,
  BUSINESS_STORAGE_FOLDER,
  normalizeUploadFolder,
  UPLOAD_FOLDER_ALLOWLIST,
  validateUploadMimeForFolder,
} from './storage-upload.util';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

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

  /*
   * `@Roles(USER)` is written out rather than left to the global guard, which
   * lets a route through when it carries no metadata at all. A rule nobody can
   * see on the route is a rule the next person deletes by accident.
   */
  @Post('upload')
  @Roles(UserRole.USER)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }),
  )
  @ApiOperation({ summary: 'Upload de arquivo para R2' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    enum: [...UPLOAD_FOLDER_ALLOWLIST],
    description:
      'Pasta de destino. Só as três que o formulário de negócio usa: os ' +
      'envios por entidade (galeria de evento, foto de comentário) têm rotas ' +
      'próprias, que sabem a que entidade a chave pertence.',
    example: 'business',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({ status: 201, type: UploadResponseDto })
  @ApiResponse({ status: 400, description: 'Tipo de arquivo não permitido' })
  @ApiResponse({ status: 403, description: 'Pasta não servida por esta rota' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder = BUSINESS_STORAGE_FOLDER,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const safeFolder = normalizeUploadFolder(folder);
    assertUploadFolderAllowed(safeFolder);
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

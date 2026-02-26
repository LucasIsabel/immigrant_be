import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({ example: 'https://pub-xxx.r2.dev/uploads/abc123.png' })
  url: string;

  @ApiProperty({ example: 'uploads/abc123.png' })
  key: string;

  @ApiProperty({ example: 204800 })
  size: number;

  @ApiProperty({ example: 'image/png' })
  mimeType: string;

  @ApiProperty({ example: 'photo.png' })
  originalName: string;
}

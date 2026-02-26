import { ApiProperty } from '@nestjs/swagger';

export class StorageFileItemDto {
  @ApiProperty({ example: 'uploads/abc123.png' })
  key: string;

  @ApiProperty({ example: 204800 })
  size: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  lastModified: Date;

  @ApiProperty({ example: 'https://pub-xxx.r2.dev/uploads/abc123.png' })
  url: string;
}

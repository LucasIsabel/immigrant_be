import { ApiProperty } from '@nestjs/swagger';

export class UploadEventImageResponseDto {
  @ApiProperty({
    example: 'https://cdn.example.com/community-events/uuid/cover.jpg',
  })
  url: string;
}

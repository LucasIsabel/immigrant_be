import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

/**
 * The photo is named by its URL and not by an index: the client that renders
 * the gallery already holds the URL, and an index is wrong the moment two tabs
 * reorder the same event.
 */
export class RemoveEventImageDto {
  @ApiProperty({
    description: 'URL of the gallery photo to remove, exactly as stored.',
    example:
      'https://cdn.example.com/community-events/uuid/gallery/photo-uuid.jpg',
  })
  @IsString()
  @Length(1, 500)
  url: string;
}

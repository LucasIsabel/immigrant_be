import { ApiProperty } from '@nestjs/swagger';

export class UploadEventImageResponseDto {
  @ApiProperty({
    example: 'https://cdn.example.com/community-events/uuid/cover.jpg',
  })
  url: string;
}

/**
 * The gallery upload answers with the whole list, not just the new photo: the
 * order is the server's, and a client that appended locally would disagree with
 * it the first time two uploads race.
 */
export class UploadEventGalleryImageResponseDto {
  @ApiProperty({
    example:
      'https://cdn.example.com/community-events/uuid/gallery/photo-uuid.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'The gallery as it stands after the upload.',
    type: [String],
  })
  images: string[];
}

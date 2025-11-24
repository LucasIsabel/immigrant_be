import { ApiProperty } from '@nestjs/swagger';

export class SuggestionLanguageDto {
  @ApiProperty({
    description: 'Unique identifier for the suggestion language',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Language code',
    example: 'en',
    type: String,
  })
  language: string;

  @ApiProperty({
    description: 'Content of the suggestion in this language',
    type: Object,
  })
  content: unknown;

  @ApiProperty({
    description: 'Suggestion ID this language belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  suggestion_id: string;
}

export class SuggestionResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the suggestion',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Suggestion creation date',
    example: '2025-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Suggestion last update date',
    example: '2025-01-15T10:30:00Z',
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Suggestion languages with content',
    type: [SuggestionLanguageDto],
    isArray: true,
    required: false,
  })
  suggestion_languages?: Array<{
    id: string;
    language: string;
    content: unknown;
    suggestion_id: string;
  }>;
}

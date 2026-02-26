import { ApiProperty } from '@nestjs/swagger';

export class BlogTranslationResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  post_id: string;

  @ApiProperty({ example: 'en', description: '"pt" | "en" | "es"' })
  locale: string;

  @ApiProperty({ example: 'How to immigrate to Canada in 2025' })
  title: string;

  @ApiProperty({ example: 'A complete guide to Canadian immigration.' })
  excerpt: string;

  @ApiProperty({ example: '## Introduction\n\n...' })
  content: string;

  @ApiProperty({ example: 'AI', description: '"AI" | "HUMAN"' })
  translated_by: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

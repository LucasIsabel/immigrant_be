import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpsertBlogTranslationDto {
  @ApiProperty({
    description: 'Título traduzido',
    example: 'How to immigrate to Canada in 2025',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Resumo traduzido',
    example: 'A complete guide to Canadian immigration.',
  })
  @IsString()
  @MinLength(1)
  excerpt: string;

  @ApiProperty({ description: 'Conteúdo Markdown traduzido' })
  @IsString()
  @MinLength(1)
  content: string;
}

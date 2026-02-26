import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogAuthorDto {
  @ApiProperty({
    description: 'Nome do autor',
    example: 'Maria Silva',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Biografia do autor',
    example: 'Especialista em imigração com 10 anos de experiência.',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'URL do avatar do autor',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar_url?: string;

  @ApiPropertyOptional({
    description: 'URL do site pessoal',
    example: 'https://mariasilva.com',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({
    description: 'Usuário Twitter/X',
    example: 'mariasilva',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  twitter?: string;

  @ApiPropertyOptional({
    description: 'URL do perfil LinkedIn',
    example: 'https://linkedin.com/in/mariasilva',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  linkedin?: string;
}

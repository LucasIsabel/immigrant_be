import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  ArrayMaxSize,
} from 'class-validator';

export class UpsertProfessionalProfileDto {
  @ApiPropertyOptional({ example: 'Engenheiro de Software' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  jobTitle?: string;

  @ApiPropertyOptional({ example: 'Acme Corp' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/username' })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/username' })
  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://mysite.com' })
  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @ApiPropertyOptional({
    example: 'Desenvolvedor com 5 anos de experiência...',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  bio?: string;

  @ApiPropertyOptional({ type: [String], example: ['TypeScript', 'React'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(30)
  skills?: string[];

  @ApiPropertyOptional({ example: 5 })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(60)
  yearsOfExperience?: number;

  @ApiPropertyOptional({ example: 'Lisboa, Portugal' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

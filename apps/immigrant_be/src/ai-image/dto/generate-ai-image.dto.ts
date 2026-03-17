import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class GenerateAiImageDto {
  @ApiProperty({
    description: 'Prompt para geração da imagem via IA',
    example: 'A professional editorial cover of a city skyline at sunset',
  })
  @IsString()
  @MaxLength(2000)
  prompt: string;

  @ApiPropertyOptional({
    description: 'Pasta no bucket onde a imagem será salva',
    example: 'ai-images',
    default: 'ai-images',
  })
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiPropertyOptional({
    description: 'Se a imagem será pública (listável) ou privada',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

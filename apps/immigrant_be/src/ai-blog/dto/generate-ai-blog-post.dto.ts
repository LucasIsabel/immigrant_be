import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { PostComplexity } from '@app/ai';
import { PoliticalTone } from '@app/ai';

export class GenerateAiBlogPostDto {
  @ApiProperty({
    description: 'ID do país para buscar notícias e gerar o post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty({
    description: 'ID da categoria do blog para o post gerado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    description:
      'ID do usuário que será o autor do post (opcional, usa admin do sistema se omitido)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  author_id?: string;

  @ApiProperty({
    description: 'ID do autor do blog (BlogAuthor) exibido no post',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  display_author_id?: string;

  @ApiProperty({
    description: 'Complexidade do post gerado',
    enum: PostComplexity,
    default: PostComplexity.SIMPLE,
    required: false,
  })
  @IsEnum(PostComplexity)
  @IsOptional()
  complexity?: PostComplexity;

  @ApiProperty({
    description: 'Tom político do post gerado',
    enum: PoliticalTone,
    default: PoliticalTone.NEUTRAL,
    required: false,
  })
  @IsEnum(PoliticalTone)
  @IsOptional()
  political_tone?: PoliticalTone;

  @ApiProperty({
    description: 'Instruções personalizadas adicionadas ao prompt do AI',
    example:
      'Foque no mercado de trabalho tech. Mencione vistos de trabalho específicos.',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  custom_instructions?: string;

  @ApiProperty({
    description:
      'Sobre o que o post deve ser. Entra na busca de notícias junto do nome do país e fica registrado no post. Diferente de `custom_instructions`, que é texto livre para o prompt.',
    example: 'novas metas de imigração para 2027',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  topic?: string;
}

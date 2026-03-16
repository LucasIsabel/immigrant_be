import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { PostComplexity } from '@app/ai';
import { PoliticalTone } from '@app/ai';

export class CreateAiBlogCronDto {
  @ApiProperty({
    description: 'ID do país para o cron job',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty({
    description: 'ID da categoria do blog para os posts gerados',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    description: 'Expressão cron (5 campos: minuto hora dia mês dia-semana)',
    example: '0 8 * * *',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\S+\s){4}\S+$/, {
    message: 'cron_expr deve ser uma expressão cron válida com 5 campos',
  })
  cron_expr: string;

  @ApiProperty({
    description: 'Se o cron job está ativo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    description:
      'ID do usuário que será o autor dos posts gerados (opcional, usa admin do sistema se omitido)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  author_id?: string;

  @ApiProperty({
    description: 'ID do autor do blog (BlogAuthor) exibido nos posts gerados',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  display_author_id?: string;

  @ApiProperty({
    description: 'Complexidade dos posts gerados',
    enum: PostComplexity,
    default: PostComplexity.SIMPLE,
    required: false,
  })
  @IsEnum(PostComplexity)
  @IsOptional()
  complexity?: PostComplexity;

  @ApiProperty({
    description: 'Tom político dos posts gerados',
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
}

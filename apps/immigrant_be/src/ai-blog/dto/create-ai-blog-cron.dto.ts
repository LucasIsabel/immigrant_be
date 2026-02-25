import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

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
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ReportCommentDto {
  @ApiProperty({
    description: 'O que está errado com o comentário.',
    example: 'A fotografia é de outro restaurante, e o texto acusa sem base.',
  })
  @IsString()
  @Length(10, 500)
  reason: string;

  @ApiPropertyOptional({
    description:
      'Honeypot. Invisível no formulário; um bot que preenche todos os campos ' +
      'preenche este, e a denúncia é descartada em silêncio.',
  })
  @IsOptional()
  @IsString()
  website?: string;
}

export class ReportCommentResponseDto {
  @ApiProperty({ example: true })
  received: boolean;
}

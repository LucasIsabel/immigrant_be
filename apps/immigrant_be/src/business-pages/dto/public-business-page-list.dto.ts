import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * Teto documentado de propósito: o consumidor é o sitemap do FE, que pagina
 * em laço (o mesmo padrão do blog, cujo teto de 50 já mordeu uma vez virando
 * truncamento silencioso). Aqui o limite está no Swagger e no validador.
 */
export const PUBLIC_PAGE_LIST_MAX_LIMIT = 50;

export class PublicBusinessPageListQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    default: PUBLIC_PAGE_LIST_MAX_LIMIT,
    minimum: 1,
    maximum: PUBLIC_PAGE_LIST_MAX_LIMIT,
    description: `Máximo ${PUBLIC_PAGE_LIST_MAX_LIMIT} por página; acima disso o consumidor precisa paginar em laço.`,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(PUBLIC_PAGE_LIST_MAX_LIMIT)
  @IsOptional()
  limit?: number = PUBLIC_PAGE_LIST_MAX_LIMIT;
}

/**
 * Só o que o sitemap precisa por item. `approvedContent`/`pendingContent`
 * ficam de fora de propósito: seriam payload grande para um consumidor que só
 * quer montar URLs, e `pendingContent` é conteúdo não revisado que nunca pode
 * vazar por rota anônima.
 */
export class PublicBusinessPageListItemDto {
  @ApiProperty({ example: 'cantina-da-vila' })
  slug: string;

  @ApiProperty({ example: 'restaurante' })
  businessType: string;

  @ApiProperty({
    example: '2026-08-22T12:00:00.000Z',
    nullable: true,
    description: 'Vira o lastModified da entrada no sitemap.',
  })
  approvedAt: Date | null;
}

export class PublicBusinessPageListResponseDto {
  @ApiProperty({ type: [PublicBusinessPageListItemDto] })
  data: PublicBusinessPageListItemDto[];

  @ApiProperty({ example: 12 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 50 })
  limit: number;
}

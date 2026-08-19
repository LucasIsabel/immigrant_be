import { ApiProperty } from '@nestjs/swagger';
import { BlogPipelineStatus } from '../../../../../generated/prisma';
import { BlogPostResponseDto } from '../../blog/dto/blog-post-response.dto';

export class FeaturedCountryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Canada' })
  name: string;

  @ApiProperty({ example: '🇨🇦', nullable: true })
  flag: string | null;
}

/**
 * O erro de uma etapa do pipeline.
 *
 * Tipado em vez de `Json` solto: sem isto o campo sairia como `object` no
 * contrato e o cliente gerado não conseguiria ler `message` nem `step` — que é
 * exatamente o que a tela precisa mostrar.
 */
export class PipelineErrorDto {
  @ApiProperty({ example: 'cover_image' })
  step: string;

  @ApiProperty({ example: 'Every model failed for "blog_image"' })
  message: string;

  @ApiProperty({ example: '2026-08-18T21:04:53.585Z' })
  at: string;
}

export class OpinionModerationFlagItemDto {
  @ApiProperty({ example: 'group_harm' })
  category: string;

  @ApiProperty({ example: '...' })
  excerpt: string;

  @ApiProperty({ example: 'Generalizes a group of people' })
  reason: string;
}

export class OpinionModerationFlagDto {
  @ApiProperty({ example: 'medium' })
  riskLevel: string;

  @ApiProperty({ type: [OpinionModerationFlagItemDto] })
  flags: OpinionModerationFlagItemDto[];

  @ApiProperty()
  summary: string;

  @ApiProperty({ example: 'review' })
  recommendation: string;
}

/**
 * `is_ai_generated` não é redeclarado aqui de propósito: ele passou a viver em
 * `BlogPostResponseDto`. Estar declarado só neste DTO de admin era justamente o
 * motivo de o contrato público nunca ter exposto o campo.
 */
export class PendingAiBlogPostResponseDto extends BlogPostResponseDto {
  @ApiProperty({
    description: 'País em destaque associado ao post',
    type: FeaturedCountryDto,
    nullable: true,
  })
  featured_country: FeaturedCountryDto | null;

  @ApiProperty({
    description: 'Locales de tradução que ainda estão faltando (en, es, pt)',
    example: ['es'],
    type: [String],
  })
  missing_translations: string[];

  @ApiProperty({
    description:
      'Em que etapa da cadeia texto→tradução→imagem o post está. A fila de aprovação depende deste campo para mostrar o progresso e oferecer o retry, então ele é parte do contrato e não detalhe interno.',
    enum: BlogPipelineStatus,
    example: BlogPipelineStatus.READY,
  })
  pipeline_status: BlogPipelineStatus;

  @ApiProperty({
    description:
      'A etapa que falhou e o motivo, quando houve falha. Existe para a tela não mandar ninguém ao log.',
    type: PipelineErrorDto,
    nullable: true,
  })
  pipeline_error: PipelineErrorDto | null;

  @ApiProperty({
    description: 'O assunto que o admin pediu, quando informou um',
    example: 'novas metas de imigração para 2027',
    nullable: true,
  })
  source_topic: string | null;

  @ApiProperty({
    description:
      'O modelo que de fato escreveu — pode ser um elo de fallback, e é isso que o revisor precisa saber antes de aprovar',
    example: 'moonshotai/kimi-k2.5',
    nullable: true,
  })
  generated_by_model: string | null;

  @ApiProperty({
    description:
      'Custo da geração em dólares. Number e não string: o `Decimal` do Prisma serializa como texto, e a tela precisa somar.',
    example: 0.011,
    type: Number,
    nullable: true,
  })
  generation_cost_usd: number | null;

  @ApiProperty({
    description: 'Grupo que liga os dois lados de um debate',
    nullable: true,
  })
  debate_group_id: string | null;

  @ApiProperty({
    description:
      'Auto-moderação. Draft flagado não é bloqueado — só destacado na fila.',
    type: OpinionModerationFlagDto,
    nullable: true,
  })
  moderation_flag: OpinionModerationFlagDto | null;
}

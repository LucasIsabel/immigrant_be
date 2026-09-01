import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { FeatureKind } from '../../../../../generated/prisma';

/** Que entidades podem entrar na faixa de destaques. */
export enum FeaturableEntity {
  BUSINESS = 'business',
  PLACE = 'place',
  EVENT = 'event',
}

export class SetFeatureDto {
  @ApiProperty({
    enum: FeatureKind,
    nullable: true,
    description:
      'CURATED para escolha editorial, PAID para espaço vendido, null para tirar o destaque',
  })
  @IsEnum(FeatureKind)
  @IsOptional()
  featureKind?: FeatureKind | null;

  @ApiPropertyOptional({
    description: 'Quando começa. Ausente significa "desde já"',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  featuredFrom?: Date | null;

  @ApiPropertyOptional({
    description:
      'Quando acaba. Ausente significa "até alguém tirar" — o que só é razoável para CURATED',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  featuredUntil?: Date | null;
}

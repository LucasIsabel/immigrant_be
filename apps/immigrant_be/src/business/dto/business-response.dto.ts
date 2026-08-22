import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  BusinessPageStatus,
  BusinessType,
} from '../../../../../generated/prisma';
import { GeneralTypeDataDto } from './type-data/general-type-data.dto';
import { LegalTypeDataDto } from './type-data/legal-type-data.dto';
import { RestaurantTypeDataDto } from './type-data/restaurant-type-data.dto';
import { TourGuideTypeDataDto } from './type-data/tour-guide-type-data.dto';

/**
 * Resumo da página pública embutido na listagem do dono.
 *
 * Existe para o dashboard renderizar o badge de status sem uma requisição por
 * card (`GET /business-pages/my/:id` × N). Só os campos que a listagem usa —
 * o conteúdo da página continua vindo do endpoint dedicado.
 */
export class BusinessPageSummaryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  id: string;

  @ApiProperty({ example: 'restaurante-do-joao' })
  slug: string;

  @ApiProperty({
    enum: BusinessPageStatus,
    example: BusinessPageStatus.APPROVED,
  })
  status: BusinessPageStatus;
}

@ApiExtraModels(
  RestaurantTypeDataDto,
  TourGuideTypeDataDto,
  LegalTypeDataDto,
  GeneralTypeDataDto,
)
export class BusinessResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  userId: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.RESTAURANT })
  businessType: BusinessType;

  @ApiProperty({ example: 'Restaurante do João' })
  name: string;

  @ApiProperty({
    example: 'Um restaurante aconchegante no centro da cidade.',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: 'Rua das Flores, 123', nullable: true })
  address: string | null;

  @ApiProperty({ example: 'Lisboa' })
  city: string;

  @ApiProperty({ example: 'Portugal', nullable: true })
  country: string | null;

  @ApiProperty({
    example: 'Lisbon',
    nullable: true,
    description: 'State, region, or district when stored',
  })
  state: string | null;

  @ApiProperty({ example: 38.7169, nullable: true })
  lat: number | null;

  @ApiProperty({ example: -9.1399, nullable: true })
  lng: number | null;

  @ApiProperty({ example: '+351 912 345 678', nullable: true })
  phone: string | null;

  @ApiProperty({ example: 'contato@restaurante.pt', nullable: true })
  email: string | null;

  @ApiProperty({ example: 'https://restaurante.pt', nullable: true })
  website: string | null;

  @ApiProperty({ type: [String], example: [] })
  photos: string[];

  @ApiProperty({
    description:
      'Dados específicos do tipo de negócio; a forma segue o businessType.',
    nullable: true,
    oneOf: [
      { $ref: getSchemaPath(RestaurantTypeDataDto) },
      { $ref: getSchemaPath(TourGuideTypeDataDto) },
      { $ref: getSchemaPath(LegalTypeDataDto) },
      { $ref: getSchemaPath(GeneralTypeDataDto) },
    ],
  })
  typeData: object | null;

  @ApiProperty({
    description:
      'Rascunho guardado via PUT (alterações ainda não publicadas ao vivo)',
    nullable: true,
  })
  draftData: object | null;

  @ApiProperty({ example: false })
  isPublic: boolean;

  @ApiProperty({
    type: BusinessPageSummaryDto,
    nullable: true,
    required: false,
    description:
      'Resumo da página pública (badge da listagem). Presente em GET /business/me; ' +
      'null quando o negócio ainda não tem página; ausente nas demais rotas.',
  })
  businessPage?: BusinessPageSummaryDto | null;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}

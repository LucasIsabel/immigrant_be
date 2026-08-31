import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BusinessType } from '../../../../../generated/prisma';
import { BusinessPageSummaryDto } from './business-response.dto';
import { GeneralTypeDataDto } from './type-data/general-type-data.dto';
import { WeeklyScheduleDto } from './opening-hours.dto';
import { LegalTypeDataDto } from './type-data/legal-type-data.dto';
import { RestaurantTypeDataDto } from './type-data/restaurant-type-data.dto';
import { TourGuideTypeDataDto } from './type-data/tour-guide-type-data.dto';

/**
 * What a visitor is allowed to know about a business.
 *
 * The public routes used to answer with `BusinessResponseDto`, the owner's own
 * shape, which carries three things a visitor has no business reading:
 *
 * - `draftData` — the owner's **unpublished** edit. `PUT /business/:id` writes
 *   only there and the live fields do not change until the draft is published,
 *   so everything typed and thought better of was readable by anyone holding
 *   the business id. The id is not a secret: it is in the URL of
 *   `/my-city/business/[id]`.
 * - `userId` — which account owns a listing, and therefore which listings
 *   belong to the same person. Nothing public consumes it.
 * - `isPublic` — since an approved page is now readable whether or not the
 *   owner listed the business in the directory, exposing this would announce
 *   the owner's choice not to be listed.
 *
 * Everything else stays, and deliberately: the public page reads `country` for
 * the currency its prices are in, `photos` for its gallery, `typeData` for the
 * menu or the tours, and `businessPage.slug` to link a card to its page. The
 * timestamps stay because the frontend's sitemap uses `updatedAt` as
 * `lastModified`.
 *
 * This is an allowlist rather than an `OmitType` of the owner's DTO: a field
 * added to the owner's shape tomorrow must not appear here by default.
 */
@ApiExtraModels(
  RestaurantTypeDataDto,
  TourGuideTypeDataDto,
  LegalTypeDataDto,
  GeneralTypeDataDto,
)
export class PublicBusinessResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

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

  @ApiProperty({ example: 'Lisbon', nullable: true })
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
    type: WeeklyScheduleDto,
    nullable: true,
    description:
      'Semana de funcionamento. Dia ausente é "não informado", que não é o ' +
      'mesmo que fechado — quem lê responde "não sei", não "fechado".',
  })
  openingHours: WeeklyScheduleDto | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'Europe/Lisbon',
    description:
      'Fuso IANA do negócio. Sem ele nenhuma superfície afirma "aberto ' +
      'agora": o relógio do visitante responderia pelo lugar errado.',
  })
  timezone: string | null;

  @ApiProperty({
    type: BusinessPageSummaryDto,
    nullable: true,
    required: false,
    description:
      'Resumo da página pública; o /my-city usa o slug para linkar o cartão à página.',
  })
  businessPage?: BusinessPageSummaryDto | null;

  @ApiProperty({ example: '2026-08-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-08-01T10:00:00.000Z' })
  updatedAt: Date;
}

export class PaginatedPublicBusinessesResponseDto {
  @ApiProperty({ type: [PublicBusinessResponseDto] })
  data: PublicBusinessResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;
}

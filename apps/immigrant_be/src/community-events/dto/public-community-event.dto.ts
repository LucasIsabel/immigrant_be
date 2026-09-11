import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommunityEventCategory } from '../../../../../generated/prisma';

/** The business hosting the event, when there is one. */
export class CommunityEventVenueDto {
  @ApiProperty()
  businessId: string;

  @ApiProperty({ example: 'Mercado de Campo de Ourique' })
  name: string;

  @ApiPropertyOptional({
    description:
      'Slug of the business public page, when it has an approved one.',
    nullable: true,
    type: String,
  })
  pageSlug?: string | null;
}

/** The event as anybody on the internet sees it. Approved events only. */
export class PublicCommunityEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional({ nullable: true, type: String })
  imageUrl?: string | null;

  @ApiProperty({
    description: 'Gallery photos, in the order the organizer arranged them.',
    type: [String],
    example: [],
  })
  images: string[];

  @ApiProperty({ enum: CommunityEventCategory })
  category: CommunityEventCategory;

  @ApiProperty()
  startsAt: Date;

  @ApiPropertyOptional({ nullable: true, type: Date })
  endsAt?: Date | null;

  @ApiProperty({ example: 'Europe/Lisbon' })
  timezone: string;

  @ApiProperty({ example: 'PT' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  city: string;

  @ApiPropertyOptional({
    description: 'State of the city, when the organizer named one.',
    example: 'Mato Grosso do Sul',
    nullable: true,
    type: String,
  })
  state?: string | null;

  @ApiProperty()
  venueName: string;

  @ApiProperty()
  venueAddress: string;

  @ApiProperty({ example: 38.7169 })
  lat: number;

  @ApiProperty({ example: -9.1662 })
  lng: number;

  @ApiPropertyOptional({ nullable: true, type: String })
  contactEmail?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  contactPhone?: string | null;

  @ApiProperty()
  isFree: boolean;

  @ApiPropertyOptional({ nullable: true, type: String })
  priceNote?: string | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  externalUrl?: string | null;

  @ApiPropertyOptional({ nullable: true, type: Number })
  minAge?: number | null;

  @ApiProperty({
    description: 'Name the organizer signed up with. Public, per the terms.',
  })
  organizerName: string;

  @ApiPropertyOptional({ type: CommunityEventVenueDto, nullable: true })
  venue?: CommunityEventVenueDto | null;
}

/**
 * The public event, plus what the detail page needs to draw the heart.
 *
 * Separate from `PublicCommunityEventDto` because the agenda does not carry
 * either field: a card that declared `isFavourite` it never received would be
 * drawn un-kept for somebody who kept it.
 */
export class PublicCommunityEventDetailDto extends PublicCommunityEventDto {
  @ApiProperty({
    example: 24,
    description:
      'Quantas pessoas guardaram este evento. É o "gosto" dos eventos: ' +
      '`EventFavourite` já existia, e dois corações na mesma página — um de ' +
      'guardar e outro de gostar — seriam dois gestos para a mesma intenção.',
  })
  favouritesCount: number;

  @ApiProperty({
    example: false,
    description:
      'Se quem está a ler guardou este evento. Sempre `false` sem sessão.',
  })
  isFavourite: boolean;
}

export class PaginatedPublicCommunityEventsResponseDto {
  @ApiProperty({ type: [PublicCommunityEventDto] })
  data: PublicCommunityEventDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}

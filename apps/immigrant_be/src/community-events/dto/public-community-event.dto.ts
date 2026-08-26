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

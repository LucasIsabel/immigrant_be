import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CommunityEventCategory,
  CommunityEventStatus,
} from '../../../../../generated/prisma';

/** An anonymous report, as the admin reads it. */
export class CommunityEventReportDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'O evento não existe no endereço indicado.' })
  reason: string;

  @ApiProperty()
  createdAt: Date;
}

/**
 * The event as its organizer and the admin see it: with the moderation state
 * the public never gets.
 */
export class CommunityEventResponseDto {
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
    description:
      'Gallery photos, in the order the organizer arranged them. The cover is `imageUrl` and is not repeated here.',
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

  @ApiProperty()
  venueName: string;

  @ApiProperty()
  venueAddress: string;

  @ApiProperty({ example: 38.7169 })
  lat: number;

  @ApiProperty({ example: -9.1662 })
  lng: number;

  @ApiPropertyOptional({ nullable: true, type: String })
  businessId?: string | null;

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

  @ApiProperty({ example: '2026-08-26' })
  termsVersion: string;

  @ApiProperty()
  termsAcceptedAt: Date;

  @ApiProperty({ enum: CommunityEventStatus })
  status: CommunityEventStatus;

  @ApiPropertyOptional({ nullable: true, type: Date })
  submittedAt?: Date | null;

  @ApiPropertyOptional({ nullable: true, type: Date })
  approvedAt?: Date | null;

  @ApiPropertyOptional({ nullable: true, type: Date })
  rejectedAt?: Date | null;

  @ApiPropertyOptional({ nullable: true, type: String })
  rejectionReason?: string | null;

  @ApiProperty({
    description: 'How many anonymous reports the event has collected.',
    example: 0,
  })
  reportCount: number;

  @ApiPropertyOptional({
    description: 'Only on the admin detail.',
    type: [CommunityEventReportDto],
  })
  reports?: CommunityEventReportDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginatedCommunityEventsResponseDto {
  @ApiProperty({ type: [CommunityEventResponseDto] })
  data: CommunityEventResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}

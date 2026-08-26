import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { CommunityEventCategory } from '../../../../../generated/prisma';
import { COMMUNITY_EVENT_TERMS_VERSION } from '../community-events.constants';
import {
  EndsAtNotBeforeStartsAt,
  HasAtLeastOneContact,
  IsFutureDate,
  IsIanaTimeZone,
} from './community-event.validators';

@HasAtLeastOneContact()
@EndsAtNotBeforeStartsAt()
export class CreateCommunityEventDto {
  @ApiProperty({ example: 'Feira de artesanato imigrante' })
  @IsString()
  @Length(3, 120)
  title: string;

  @ApiProperty({
    description: 'Plain paragraphs describing the event. No HTML.',
    example:
      'Uma tarde de artesanato feito por imigrantes da cidade, com música ao vivo e comida de rua.',
  })
  @IsString()
  @Length(20, 4000)
  description: string;

  @ApiProperty({ enum: CommunityEventCategory })
  @IsEnum(CommunityEventCategory)
  category: CommunityEventCategory;

  @ApiProperty({
    description: 'ISO 8601 instant with offset. Must be in the future.',
    example: '2026-09-12T20:00:00+01:00',
  })
  @IsISO8601()
  @IsFutureDate()
  startsAt: string;

  @ApiPropertyOptional({
    description: 'ISO 8601 instant with offset. Cannot precede startsAt.',
    example: '2026-09-12T23:00:00+01:00',
  })
  @IsOptional()
  @IsISO8601()
  endsAt?: string;

  @ApiProperty({
    description:
      'IANA timezone of the venue. It is what turns the stored instant back into "Saturday, 9pm".',
    example: 'Europe/Lisbon',
  })
  @IsString()
  @Length(1, 64)
  @IsIanaTimeZone()
  timezone: string;

  @ApiProperty({ description: 'ISO2 country code, uppercase', example: 'PT' })
  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({ example: 'Mercado de Campo de Ourique' })
  @IsString()
  @Length(2, 120)
  venueName: string;

  @ApiProperty({ example: 'Rua Coelho da Rocha 104, 1350-075 Lisboa' })
  @IsString()
  @Length(5, 200)
  venueAddress: string;

  @ApiProperty({
    description: 'Exact location on the map — mandatory, not derived.',
    example: 38.7169,
  })
  @IsLatitude()
  lat: number;

  @ApiProperty({ example: -9.1662 })
  @IsLongitude()
  lng: number;

  @ApiPropertyOptional({
    description:
      'Business hosting the event. Must be public and in the same city.',
  })
  @IsOptional()
  @IsUUID()
  businessId?: string;

  @ApiPropertyOptional({ example: 'eventos@exemplo.pt' })
  @IsOptional()
  @IsEmail()
  @Length(3, 100)
  contactEmail?: string;

  @ApiPropertyOptional({ example: '+351912345678' })
  @IsOptional()
  @IsString()
  @Length(6, 20)
  contactPhone?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isFree: boolean;

  @ApiPropertyOptional({
    description: 'Ignored when isFree is true.',
    example: '10 € na porta',
  })
  @IsOptional()
  @IsString()
  @Length(1, 80)
  priceNote?: string;

  @ApiPropertyOptional({ example: 'https://exemplo.pt/ingressos' })
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @Length(1, 300)
  externalUrl?: string;

  @ApiPropertyOptional({
    description:
      'Minimum age, when the event is not for everybody. The honest way to allow an adults-only event without allowing adult content.',
    minimum: 0,
    maximum: 21,
    example: 18,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(21)
  minAge?: number;

  @ApiProperty({
    description: 'Must be literally true — the organizer accepted the terms.',
    example: true,
  })
  @Equals(true)
  acceptTerms: boolean;

  @ApiProperty({
    description:
      'Version of the terms the organizer read. A stale version is rejected so the frontend has to show the current text.',
    example: COMMUNITY_EVENT_TERMS_VERSION,
  })
  @IsString()
  @Length(1, 20)
  termsVersion: string;
}

import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { CreateCommunityEventDto } from './create-community-event.dto';
import { MAX_EVENT_GALLERY_IMAGES } from '../community-events.constants';

/**
 * Everything but the terms: the acceptance belongs to the moment of creation
 * and is not re-negotiated on an edit.
 *
 * `PartialType` copies property metadata but not the class-level constraints of
 * `CreateCommunityEventDto`, and that is the correct behaviour here — "has at
 * least one contact" and "endsAt is not before startsAt" can only be answered
 * against the merged event, which the service does.
 *
 * The clearable fields are omitted from the base and declared again below,
 * because an edit needs a third answer the create form never needed:
 * `undefined` leaves the field alone, `null` erases it. Re-declaring is what
 * lets the type widen to `| null` — a subclass cannot widen an inherited
 * property — and `nullable: true` is what carries that widening into the type
 * the frontend generates. `@ValidateIf` then keeps the format rules off an
 * explicit `null`: `@IsEmail` would otherwise reject the very value that means
 * "erase this".
 */
export class UpdateCommunityEventDto extends PartialType(
  OmitType(CreateCommunityEventDto, [
    'acceptTerms',
    'termsVersion',
    'endsAt',
    'businessId',
    'contactEmail',
    'contactPhone',
    'priceNote',
    'externalUrl',
    'minAge',
  ] as const),
) {
  @ApiPropertyOptional({
    description: 'ISO 8601 instant with offset. `null` clears the end time.',
    nullable: true,
    type: String,
    example: '2026-09-12T23:00:00+01:00',
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.endsAt !== null)
  @IsISO8601()
  endsAt?: string | null;

  @ApiPropertyOptional({
    description: 'Business hosting the event. `null` detaches it.',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.businessId !== null)
  @IsUUID()
  businessId?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    type: String,
    example: 'eventos@exemplo.pt',
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.contactEmail !== null)
  @IsEmail()
  @Length(3, 100)
  contactEmail?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    type: String,
    example: '+351912345678',
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.contactPhone !== null)
  @IsString()
  @Length(6, 20)
  contactPhone?: string | null;

  @ApiPropertyOptional({
    description: 'Ignored when isFree is true. `null` clears it.',
    nullable: true,
    type: String,
    example: '10 € na porta',
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.priceNote !== null)
  @IsString()
  @Length(1, 80)
  priceNote?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    type: String,
    example: 'https://exemplo.pt/ingressos',
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.externalUrl !== null)
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @Length(1, 300)
  externalUrl?: string | null;

  @ApiPropertyOptional({
    description: 'Minimum age. `null` opens the event to everybody again.',
    nullable: true,
    type: Number,
    minimum: 0,
    maximum: 21,
    example: 18,
  })
  @IsOptional()
  @ValidateIf((o: UpdateCommunityEventDto) => o.minAge !== null)
  @IsInt()
  @Min(0)
  @Max(21)
  minAge?: number | null;

  @ApiPropertyOptional({
    description:
      'The gallery, reordered or pruned. Photos are added and removed through `/events/:id/images`, so this list may only be a permutation or a subset of the stored one — anything else is 400.',
    type: [String],
    maxItems: MAX_EVENT_GALLERY_IMAGES,
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_EVENT_GALLERY_IMAGES)
  @IsString({ each: true })
  images?: string[];
}

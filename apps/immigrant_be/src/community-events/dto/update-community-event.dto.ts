import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCommunityEventDto } from './create-community-event.dto';

/**
 * Everything but the terms: the acceptance belongs to the moment of creation
 * and is not re-negotiated on an edit.
 *
 * `PartialType` copies property metadata but not the class-level constraints of
 * `CreateCommunityEventDto`, and that is the correct behaviour here — "has at
 * least one contact" and "endsAt is not before startsAt" can only be answered
 * against the merged event, which the service does.
 */
export class UpdateCommunityEventDto extends PartialType(
  OmitType(CreateCommunityEventDto, ['acceptTerms', 'termsVersion'] as const),
) {}

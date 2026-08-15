import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';

/**
 * Derived from `CreateCountryDto` instead of being declared by hand.
 *
 * The hand-written version had drifted: four fields were spelled in camelCase
 * (`difficultyScore`, `visaOptions`, `jobMarket`, `popularCities`) while the
 * Prisma model — and `CreateCountryDto` — use snake_case. `CountryRepository`
 * spreads this DTO straight into `prisma.country.update`, so every edit that
 * touched one of them died as a `PrismaClientValidationError`, which the client
 * saw as a 500. `background_image` was missing entirely, so the admin dialog
 * collected it and dropped it on submit.
 *
 * Deriving makes that class of bug unrepresentable: a field can no longer exist
 * here under a name that does not exist there. Every other `Update*Dto` in this
 * codebase already does this — this one was the outlier.
 *
 * `translations` is omitted on purpose. It is not an update of the country row:
 * the repository spreads this object into `data`, and Prisma would reject a
 * plain array where it expects a nested write. Country copy has its own route,
 * `PUT /countries/:id/translations/:language`.
 */
export class UpdateCountryDto extends PartialType(
  OmitType(CreateCountryDto, ['translations'] as const),
) {}

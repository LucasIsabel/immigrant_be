import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Matches } from 'class-validator';

/** Why the user wants to move. Drives which of the conditional fields follow. */
export const IMMIGRATION_GOALS = [
  'work',
  'study',
  'family',
  'retirement_income',
  'investment',
  'remote_work',
] as const;

/** Where the user stands on a job offer. Only meaningful when the goal is `work`. */
export const JOB_OFFER_STATES = [
  'signed_contract',
  'negotiating',
  'none',
] as const;

/** Monthly income or savings in EUR, as a band rather than a figure. */
export const INCOME_BANDS = [
  'under_1000',
  '1000_2500',
  '2500_5000',
  'over_5000',
] as const;

/**
 * The quiz answers a visa recommendation is built from.
 *
 * Every field is genuinely optional — Swagger has always said so, and the
 * prompt writes "Not specified" for whatever is missing. Without `@IsOptional`
 * the validation pipe rejected an omitted field as "must be a string", so a
 * user who skipped a question got a 400 instead of a recommendation.
 *
 * **Two different kinds of value live here.** `profession` and `plan_period`
 * carry the readable label the frontend showed the user ("Software Engineer",
 * "1 year"), in whatever language the form was in — they reach the model as
 * prose and nothing branches on them. `goal`, `job_offer` and `income_band`
 * carry stable keys instead, and `nationality` an ISO2 code, so the backend
 * renders the wording and a change of copy on the frontend cannot alter the
 * recommendation. That is also why the three keyed fields are `@IsIn`: a typo
 * has to be a 400, not prompt noise the model silently reasons over.
 */
export class UserDetailsQueryDto {
  @ApiProperty({
    description: 'Profession of the user',
    example: 'Software Engineer',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty({
    description: 'Country of origin of the user',
    example: 'United States',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  country_origin?: string;

  @ApiProperty({
    description: 'Plan period of the user',
    example: '1 year',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  plan_period?: string;

  @ApiProperty({
    description: 'What the user is moving for. Stable key, not a label.',
    example: 'work',
    enum: IMMIGRATION_GOALS,
    required: false,
  })
  @IsOptional()
  @IsIn([...IMMIGRATION_GOALS])
  goal?: string;

  @ApiProperty({
    description:
      'ISO 3166-1 alpha-2 code of the passport the user would travel on. ' +
      'The passport, not the residence: it is what decides visa exemptions ' +
      'and the agreement-based routes (CPLP, EU, Mercosur).',
    example: 'PT',
    type: String,
    required: false,
  })
  @IsOptional()
  @Matches(/^[A-Z]{2}$/, {
    message: 'nationality must be an ISO 3166-1 alpha-2 code, uppercase',
  })
  nationality?: string;

  @ApiProperty({
    description:
      'How far along the user is with a job offer. Sent only when the goal ' +
      'is `work`.',
    example: 'signed_contract',
    enum: JOB_OFFER_STATES,
    required: false,
  })
  @IsOptional()
  @IsIn([...JOB_OFFER_STATES])
  job_offer?: string;

  @ApiProperty({
    description:
      'Monthly income or savings in EUR, as a band. Sent only when the goal ' +
      'is `retirement_income`, `remote_work` or `investment`.',
    example: '2500_5000',
    enum: INCOME_BANDS,
    required: false,
  })
  @IsOptional()
  @IsIn([...INCOME_BANDS])
  income_band?: string;
}

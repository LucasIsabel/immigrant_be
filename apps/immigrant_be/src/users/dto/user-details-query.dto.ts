import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * The quiz answers a visa recommendation is built from.
 *
 * Every field is genuinely optional — Swagger has always said so, and the
 * prompt writes "Not specified" for whatever is missing. Without `@IsOptional`
 * the validation pipe rejected an omitted field as "must be a string", so a
 * user who skipped a question got a 400 instead of a recommendation.
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
}

import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from '../../countries/dto/country.dto';
import { SuggestionResponseDto } from './suggestion-response.dto';
import { Type } from 'class-transformer';

export class UserPlanResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'User ID who owns the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'Suggestion ID associated with the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    nullable: true,
  })
  suggestion_id: string | null;

  @ApiProperty({
    description: 'Country ID associated with the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    nullable: true,
  })
  country_id: string | null;

  @ApiProperty({
    description:
      'Stable keys of the steps the user has completed. The list endpoint does not resolve the step text — use GET /users/plan/:id?language= for that.',
    type: [String],
    example: ['valid-passport'],
  })
  completed_step_keys: string[];

  @ApiProperty({
    description: 'Fraction of the required steps completed, 0 to 1',
    example: 0.5,
    type: Number,
  })
  progress: number;

  @ApiProperty({
    description: 'Selected suggestion details',
    example: {
      country: 'Canada',
      compatibility: 85,
      reasons: ['Strong job market', 'High quality of life'],
    },
    type: Object,
    nullable: true,
    required: false,
  })
  selected_suggestion?: unknown;

  @ApiProperty({
    description: 'Status of the plan',
    example: 'draft',
    enum: ['draft', 'in_progress', 'completed'],
    type: String,
  })
  status: string;

  @ApiProperty({
    description: 'Name of the plan',
    example: 'My Immigration Plan to Canada',
    type: String,
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    description: 'Notes about the plan',
    example: 'Need to gather documents',
    type: String,
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description: 'Plan creation date',
    example: '2025-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Plan last update date',
    example: '2025-01-15T10:30:00Z',
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Country information associated with the plan',
    type: CountryDto,
    nullable: true,
    required: false,
  })
  country?: CountryDto | null;

  @ApiProperty({
    description: 'Suggestion information associated with the plan',
    type: SuggestionResponseDto,
    nullable: true,
    required: false,
  })
  @Type(() => SuggestionResponseDto)
  suggestion?: SuggestionResponseDto | null;
}

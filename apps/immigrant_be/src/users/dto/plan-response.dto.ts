import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Prisma } from 'generated/prisma';

export enum PlanStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export class ImmigrationVisaTypeDto {
  @ApiProperty({
    description: 'Unique identifier for the visa type',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Category of the visa type',
    example: 'Work Visa',
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'Description of the visa type',
    example: 'Visa for skilled workers',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Source of the visa information',
    example: 'https://example.com/visa-info',
    type: String,
  })
  source: string;

  @ApiProperty({
    description: 'Country ID associated with the visa type',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  country_id: string;

  @ApiProperty({
    description: 'Steps required for this visa type',
    example: [],
    type: Array,
  })
  steps: Prisma.JsonValue;
}

export class PlanResponseDto {
  @ApiProperty({
    description: 'Progress of the plan',
    example: 0.5,
    type: Number,
    required: false,
  })
  progress: number | undefined;

  @ApiProperty({
    description: 'Start date of the plan',
    example: '2025-01-15T10:30:00Z',
    type: Date,
    required: false,
  })
  start_date: Date | undefined;

  @ApiProperty({
    description: 'Estimated end date of the plan',
    example: '1 year',
    type: String,
    required: false,
  })
  estimated_end_date: string | undefined;

  @ApiProperty({
    description: 'Time to complete the plan',
    example: 10,
    type: String,
    required: false,
  })
  time_to_complete: string | undefined;

  @ApiProperty({
    description: 'Status of the plan',
    example: 'draft',
    enum: PlanStatus,
    type: String,
  })
  status: PlanStatus;

  @ApiProperty({
    description: 'Description of the plan',
    example: 'This is a description of the plan',
    type: String,
    nullable: true,
    required: false,
  })
  description: string | null | undefined;

  @ApiProperty({
    description: 'Target of the plan',
    example: 'This is a target of the plan',
    type: String,
    required: false,
  })
  target: string | undefined;

  @ApiProperty({
    description: 'Budget of the plan',
    example: 'This is a budget of the plan',
    type: String,
    required: false,
  })
  budget: string | undefined;

  @ApiProperty({
    description: 'English level of the plan',
    example: 'This is a english level of the plan',
    type: String,
    required: false,
  })
  english_level: string | undefined;

  @ApiProperty({
    description: 'Family members of the plan',
    example: 1,
    type: String,
    required: false,
  })
  family_members: string | undefined;

  @ApiProperty({
    description: 'Visa type of the plan',
    type: [ImmigrationVisaTypeDto],
    isArray: true,
  })
  @IsArray()
  visa_types: ImmigrationVisaTypeDto[];

  @ApiProperty({
    description: 'Flag of the country',
    example: '',
    type: String,
    required: false,
  })
  flag: string | undefined;

  @ApiProperty({
    description: 'Name of the country',
    example: 'Canada',
    type: String,
    required: false,
  })
  country_name: string | undefined;

  @ApiProperty({
    description: 'Selected visa type of the plan',
    example: 'Work Visa',
    type: String,
    required: false,
  })
  selected_visa_type: string | undefined;

  @ApiProperty({
    description: 'Steps of the plan',
    example: [
      { type: 'country', answer: 'Canada' },
      { type: 'visa', answer: 'Express Entry' },
    ],
    type: Array,
  })
  questions: Prisma.JsonValue;
}

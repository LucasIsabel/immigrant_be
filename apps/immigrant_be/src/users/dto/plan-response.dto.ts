import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Prisma } from 'generated/prisma';

export enum PlanStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

/** Visa type as embedded in plan responses (avoids Swagger duplicate with ImmigrationVisaTypeDto from immigration-visa-type module). */
export class PlanImmigrationVisaTypeDto {
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
}

export class PlanResponseDto {
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
    required: false,
    nullable: true,
  })
  suggestion_id: string | null | undefined;

  @ApiProperty({
    description: 'Country ID associated with the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    required: false,
    nullable: true,
  })
  country_id: string | null | undefined;

  @ApiProperty({
    description: 'Steps of the plan',
    example: [
      { type: 'country', answer: 'Canada' },
      { type: 'visa', answer: 'Express Entry' },
    ],
    type: Array,
  })
  steps: Prisma.JsonValue;

  @ApiProperty({
    description:
      'Completed steps of the plan, grouped by category. Each category contains an array of step items that have been checked off.',
    example: {
      core_documents: [
        {
          name: 'Valid passport (applicant and sponsor)',
          required: true,
          priority: 1,
          notes:
            'Passport must be valid for the duration of the visa process and stay.',
          checked: true,
        },
      ],
      health_and_character: [
        {
          name: 'Medical examination results',
          required: true,
          priority: 1,
          notes: 'Must be completed with an approved panel physician.',
          checked: true,
        },
      ],
    },
    type: Object,
    nullable: true,
  })
  steps_completed: Prisma.JsonValue | null;

  @ApiProperty({
    description:
      'Remaining steps of the plan, grouped by category. Each category contains an array of step items.',
    example: {
      core_documents: [
        {
          name: 'Valid passport (applicant and sponsor)',
          required: true,
          priority: 1,
          notes:
            'Passport must be valid for the duration of the visa process and stay.',
          checked: false,
        },
        {
          name: 'Completed visa application form',
          required: true,
          priority: 1,
          notes:
            'Correct form depending on family, partner, or dependent visa subclass.',
          checked: false,
        },
      ],
      health_and_character: [
        {
          name: 'Medical examination results',
          required: true,
          priority: 1,
          notes: 'Must be completed with an approved panel physician.',
          checked: false,
        },
        {
          name: 'Police clearance certificates',
          required: true,
          priority: 1,
          notes: 'Required for all countries lived in for 12 months or more.',
          checked: false,
        },
      ],
    },
    type: Object,
    nullable: true,
  })
  steps_remaining: Prisma.JsonValue;

  @ApiProperty({
    description: 'Documents required for the plan',
    example: [],
    type: Array,
  })
  documents: Prisma.JsonValue;

  @ApiProperty({
    description: 'Selected suggestion details',
    type: Object,
    required: false,
    nullable: true,
  })
  selected_suggestion: Prisma.JsonValue | null | undefined;

  @ApiProperty({
    description: 'Status of the plan',
    example: 'draft',
    enum: PlanStatus,
    type: String,
  })
  status: PlanStatus;

  @ApiProperty({
    description: 'Name of the plan',
    example: 'My Immigration Plan',
    type: String,
    required: false,
    nullable: true,
  })
  name: string | null | undefined;

  @ApiProperty({
    description: 'Notes about the plan',
    example: 'Need to gather documents',
    type: String,
    required: false,
    nullable: true,
  })
  notes: string | null | undefined;

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
    description: 'Progress of the plan',
    example: 0.5,
    type: Number,
    required: false,
  })
  progress: number | undefined;

  @ApiProperty({
    description: 'Description of the plan',
    example: 'This is a description of the plan',
    type: String,
    nullable: true,
    required: false,
  })
  description: string | null | undefined;

  @ApiProperty({
    description: 'Selected visa type ID of the plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
    required: false,
    nullable: true,
  })
  selected_visa_type_id: string | null | undefined;

  @ApiProperty({
    description: 'Visa type of the plan',
    type: () => PlanImmigrationVisaTypeDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  visa_types: PlanImmigrationVisaTypeDto[] | undefined;

  @ApiProperty({
    description: 'Selected visa type of the plan',
    type: () => PlanImmigrationVisaTypeDto,
    required: false,
  })
  selected_visa_type: PlanImmigrationVisaTypeDto | undefined;
}

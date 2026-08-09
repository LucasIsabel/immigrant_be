import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Prisma } from 'generated/prisma';

export enum PlanStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

/**
 * One step of the plan, already resolved into a language.
 *
 * `key` is the identity and the only part the client sends back; `name` and
 * `notes` are the projection of that key into the requested locale.
 */
export class PlanStepItemDto {
  @ApiProperty({
    description:
      'Language-independent identity of the step. This is what goes in `completed_step_keys`.',
    example: 'valid-passport',
    type: String,
  })
  key: string;

  @ApiProperty({
    description: 'Step name in the resolved language',
    example: 'Passaporte válido',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Step notes in the resolved language',
    example: 'Deve valer por toda a duração do processo e da estadia.',
    type: String,
  })
  notes: string;

  @ApiProperty({
    description: 'Rendering order hint',
    example: '1',
    type: String,
  })
  priority: string;

  @ApiProperty({
    description: 'Only required steps count toward the progress bar',
    example: true,
    type: Boolean,
  })
  required: boolean;

  @ApiProperty({
    description: 'Whether the key is in the plan `completed_step_keys`',
    example: false,
    type: Boolean,
  })
  completed: boolean;
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
    description:
      'Steps of the selected visa type, grouped by category, already resolved into the requested language. ' +
      'Empty when the plan has no visa type selected yet. The text is not stored on the plan — it is read from ' +
      '`visa_steps` on every request, which is why switching language changes the copy without touching progress.',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: getSchemaPath(PlanStepItemDto) },
    },
    example: {
      core_documents: [
        {
          key: 'valid-passport',
          name: 'Passaporte válido',
          notes: 'Deve valer por toda a duração do processo e da estadia.',
          priority: '1',
          required: true,
          completed: true,
        },
      ],
    },
  })
  steps: Record<string, PlanStepItemDto[]>;

  @ApiProperty({
    description:
      'Stable keys of the steps the user has completed. Language-independent — this is what survives a locale switch.',
    type: [String],
    example: ['valid-passport'],
  })
  completed_step_keys: string[];

  @ApiProperty({
    description:
      'Language the steps were actually resolved into. Differs from the requested one when that language has no row and the fallback applied.',
    example: 'pt',
    type: String,
  })
  language: string;

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

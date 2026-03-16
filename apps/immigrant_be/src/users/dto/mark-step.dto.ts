import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class MarkStepDto {
  @ApiProperty({
    description:
      'Full state of remaining steps grouped by category. The client owns this state and sends it as-is.',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'object' },
    },
    example: {
      core_documents: [
        {
          name: 'Birth certificate',
          required: true,
          priority: 2,
          notes: '',
          checked: false,
        },
      ],
    },
  })
  @IsObject()
  steps_remaining: Record<string, any[]>;

  @ApiProperty({
    description:
      'Full state of completed steps grouped by category. The client owns this state and sends it as-is.',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { type: 'object' },
    },
    example: {
      core_documents: [
        {
          name: 'Valid passport',
          required: true,
          priority: 1,
          notes: '',
          checked: true,
        },
      ],
    },
  })
  @IsObject()
  steps_completed: Record<string, any[]>;
}

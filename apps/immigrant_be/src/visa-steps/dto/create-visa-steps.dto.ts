import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString, IsUUID } from 'class-validator';

export class CreateVisaStepsDto {
  @ApiProperty({
    description: 'Visa type id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  visa_type_id: string;

  @ApiProperty({
    description: 'Language code for the steps (e.g., en, pt, es)',
    example: 'en',
    type: String,
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Steps payload as JSON object',
    example: {
      documents: [
        {
          name: 'Valid passport',
          required: true,
          priority: 1,
          notes: 'Must be valid for the required period.',
        },
      ],
    },
    type: Object,
  })
  @IsObject()
  steps: Record<string, any>;
}

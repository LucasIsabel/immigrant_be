import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class TranslateVisaStepsDto {
  @ApiProperty({
    description: 'Steps payload as JSON object to translate',
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
  steps: Record<string, unknown>;

  @ApiProperty({
    description: 'Source language code (e.g. en, pt, es)',
    example: 'en',
    type: String,
  })
  @IsString()
  sourceLanguage: string;

  @ApiProperty({
    description: 'Target language code (e.g. pt, es)',
    example: 'pt',
    type: String,
  })
  @IsString()
  targetLanguage: string;
}

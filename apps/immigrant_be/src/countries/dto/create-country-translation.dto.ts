import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { SUPPORTED_LANGUAGES } from '../country-translation.util';
import { UpsertCountryTranslationDto } from './upsert-country-translation.dto';

export class CreateCountryTranslationDto extends UpsertCountryTranslationDto {
  @ApiProperty({
    description: 'Idioma desta tradução',
    example: 'en',
    enum: SUPPORTED_LANGUAGES,
    type: String,
  })
  @IsIn([...SUPPORTED_LANGUAGES])
  language: string;
}

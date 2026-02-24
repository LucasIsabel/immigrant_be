import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Steps, SuggestionItem } from '../../system/dto/suggestions.dto';

export class CreateUserPlanDto {
  @ApiProperty({
    description: 'Suggestion item with country recommendation details',
    type: SuggestionItem,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SuggestionItem)
  suggestion: SuggestionItem;

  @ApiProperty({
    description: 'ID of the suggestion',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  suggestion_id: string;

  @ApiProperty({
    description: 'Language of the suggestion',
    example: 'en',
    type: String,
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Steps)
  steps: Steps[];
}

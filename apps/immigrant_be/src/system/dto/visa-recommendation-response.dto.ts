import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VisaRecommendationResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the recommended visa type',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Explanation of why this visa type was recommended',
    example:
      'This visa type is recommended because it aligns well with your profession as a Software Engineer, fits within your 1-year plan period, and offers a straightforward application process for applicants from your continent.',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  explanations?: string;

  @ApiProperty({
    description:
      'True when the passport carries freedom of movement into this country ' +
      '(both are EU/EEA/Swiss), so no visa is required and only registration ' +
      'is. The recommended route is then context, not something to apply for.',
    example: false,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  freedom_of_movement: boolean;
}

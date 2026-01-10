import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for selecting a visa type.
 * Note: This endpoint uses path parameters (plan_id and visa_type_id) instead of a request body.
 * This DTO is kept for consistency but the actual data comes from path parameters.
 */
export class SelectVisaTypeDto {
  @ApiProperty({
    description: 'ID of the plan to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  plan_id: string;

  @ApiProperty({
    description: 'ID of the visa type to select',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  visa_type_id: string;
}

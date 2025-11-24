import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SelectVisaTypeDto {
  @ApiProperty({
    description: 'ID of the visa type to select',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  visa_type_id: string;
}

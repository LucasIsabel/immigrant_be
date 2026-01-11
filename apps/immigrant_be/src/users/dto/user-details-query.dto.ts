import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDetailsQueryDto {
  @ApiProperty({
    description: 'Profession of the user',
    example: 'Software Engineer',
    type: String,
    required: false,
  })
  @IsString()
  profession?: string;

  @ApiProperty({
    description: 'Country of origin of the user',
    example: 'United States',
    type: String,
    required: false,
  })
  @IsString()
  country_origin?: string;

  @ApiProperty({
    description: 'Plan period of the user',
    example: '1 year',
    type: String,
    required: false,
  })
  @IsString()
  plan_period?: string;
}

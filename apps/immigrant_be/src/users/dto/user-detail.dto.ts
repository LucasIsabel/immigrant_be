import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDetailsDto {
  @ApiProperty({
    description: 'Profession of the user',
    example: 'Software Engineer',
    type: String,
  })
  @IsString()
  profession: string;

  @ApiProperty({
    description: 'Country of origin of the user',
    example: 'United States',
    type: String,
  })
  @IsString()
  country_origin: string;

  @ApiProperty({
    description: 'Plan period of the user',
    example: '1 year',
    type: String,
  })
  @IsString()
  plan_period: string;
}

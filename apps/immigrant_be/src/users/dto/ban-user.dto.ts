import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BanUserDto {
  @ApiProperty({
    description: 'Reason for banning the user',
    example: 'Violation of terms of service',
    required: false,
  })
  @IsString()
  @IsOptional()
  banReason?: string;

  @ApiProperty({
    description:
      'Ban duration in seconds. If not provided, the ban is permanent.',
    example: 604800,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  banExpiresInSeconds?: number;
}

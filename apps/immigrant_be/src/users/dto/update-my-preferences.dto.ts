import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMyPreferencesDto {
  @ApiProperty({
    description: 'Whether email notifications are enabled',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  emailNotificationsEnabled?: boolean;
}

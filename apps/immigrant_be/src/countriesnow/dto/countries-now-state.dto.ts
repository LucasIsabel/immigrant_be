import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CountriesNowStateDto {
  @ApiProperty({ example: 'Lagos' })
  name: string;

  @ApiPropertyOptional({
    example: 'LA',
    description: 'State code when provided by upstream',
  })
  stateCode?: string;
}

import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {


  @ApiProperty({
    description: 'Cidades populares para imigrantes',
    example: ['Toronto', 'Vancouver', 'Montreal'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  popularCities?: string[];
}

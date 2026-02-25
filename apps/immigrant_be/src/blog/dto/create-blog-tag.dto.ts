import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogTagDto {
  @ApiProperty({
    description: 'Nome da tag',
    example: 'Express Entry',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Visto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

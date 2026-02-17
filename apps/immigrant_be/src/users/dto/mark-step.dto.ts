import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class MarkStepDto {
  @ApiProperty({ example: 'core_documents' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Valid passport' })
  @IsString()
  @IsNotEmpty()
  step_name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  completed: boolean;
}

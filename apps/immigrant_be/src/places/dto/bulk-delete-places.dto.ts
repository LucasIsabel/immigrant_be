import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class BulkDeletePlacesDto {
  @ApiProperty({
    description:
      'Ids of the places to delete. Ids that no longer exist are ignored.',
    type: [String],
    format: 'uuid',
    minItems: 1,
    maxItems: 100,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsUUID('all', { each: true })
  ids: string[];
}

export class BulkDeletePlacesResponseDto {
  @ApiProperty({ description: 'How many places were actually deleted' })
  deleted: number;
}

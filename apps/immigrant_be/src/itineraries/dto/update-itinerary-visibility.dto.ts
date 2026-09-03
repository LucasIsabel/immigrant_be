import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/** The owner's own switch, in the mold of `Business.isPublic`. */
export class UpdateItineraryVisibilityDto {
  @ApiProperty({
    description:
      'Public itineraries are listed for everyone, immediately. There is no review step.',
    example: true,
  })
  @IsBoolean()
  isPublic: boolean;
}

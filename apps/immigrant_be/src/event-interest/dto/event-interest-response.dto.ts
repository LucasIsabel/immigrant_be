import { ApiProperty } from '@nestjs/swagger';

export class EventInterestResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;
}

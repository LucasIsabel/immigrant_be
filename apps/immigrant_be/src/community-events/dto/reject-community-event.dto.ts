import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RejectCommunityEventDto {
  @ApiProperty({
    description:
      'Why the event was turned down or taken down. Mandatory: the organizer reads it, and a takedown without a reason is not reviewable.',
    example: 'A imagem de capa não corresponde ao evento descrito.',
  })
  @IsString()
  @Length(3, 500)
  reason: string;
}

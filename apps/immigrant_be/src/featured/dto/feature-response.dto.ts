import { ApiProperty } from '@nestjs/swagger';
import { FeatureKind } from '../../../../../generated/prisma';

export class FeatureResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: FeatureKind, nullable: true })
  featureKind: FeatureKind | null;

  @ApiProperty({ nullable: true, type: String, format: 'date-time' })
  featuredFrom: Date | null;

  @ApiProperty({ nullable: true, type: String, format: 'date-time' })
  featuredUntil: Date | null;

  @ApiProperty({ description: 'Se conta como destaque neste instante' })
  featuredNow: boolean;
}

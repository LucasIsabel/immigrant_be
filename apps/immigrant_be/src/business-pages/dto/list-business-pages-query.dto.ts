import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { BusinessPageStatus } from '../../../../../generated/prisma';

export class ListBusinessPagesQueryDto {
  @ApiPropertyOptional({
    description: 'Filtrar por status',
    enum: [
      'DRAFT',
      'PENDING_REVIEW',
      'APPROVED',
      'APPROVED_WITH_PENDING',
      'REJECTED',
    ],
  })
  @IsOptional()
  @IsIn([
    'DRAFT',
    'PENDING_REVIEW',
    'APPROVED',
    'APPROVED_WITH_PENDING',
    'REJECTED',
  ])
  status?: BusinessPageStatus;
}

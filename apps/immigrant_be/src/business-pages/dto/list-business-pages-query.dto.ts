import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

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
  @IsIn(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'APPROVED_WITH_PENDING', 'REJECTED'])
  status?: string;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateAiBlogCronDto } from './create-ai-blog-cron.dto';

export class UpdateAiBlogCronDto extends PartialType(CreateAiBlogCronDto) {
  @ApiProperty({
    description: 'Ativar ou desativar o cron job',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

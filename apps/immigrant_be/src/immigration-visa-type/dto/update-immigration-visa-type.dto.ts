import { PartialType } from '@nestjs/swagger';
import { CreateImmigrationVisaTypeDto } from './create-immigration-visa-type.dto';

export class UpdateImmigrationVisaTypeDto extends PartialType(
  CreateImmigrationVisaTypeDto,
) {}

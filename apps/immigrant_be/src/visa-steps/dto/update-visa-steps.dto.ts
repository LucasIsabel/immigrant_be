import { PartialType } from '@nestjs/swagger';
import { CreateVisaStepsDto } from './create-visa-steps.dto';

export class UpdateVisaStepsDto extends PartialType(CreateVisaStepsDto) {}

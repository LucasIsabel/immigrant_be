import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdatePlanStepsDto {
  @ApiProperty({
    description:
      'Full set of step keys the user has completed. The client owns this state and sends it whole, as it did before. ' +
      'Keys are language-independent, so the same list is valid whatever locale the user is reading in. ' +
      'Keys the visa type does not declare are discarded server-side.',
    type: [String],
    example: ['valid-passport', 'visa-application-form-and-fee'],
  })
  @IsArray()
  @IsString({ each: true })
  completed_step_keys: string[];
}

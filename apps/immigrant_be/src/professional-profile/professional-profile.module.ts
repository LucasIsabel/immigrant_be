import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ProfessionalProfileController } from './professional-profile.controller';
import { ProfessionalProfileService } from './professional-profile.service';
import { ProfessionalProfileRepository } from './professional-profile.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalProfileController],
  providers: [ProfessionalProfileService, ProfessionalProfileRepository],
})
export class ProfessionalProfileModule {}

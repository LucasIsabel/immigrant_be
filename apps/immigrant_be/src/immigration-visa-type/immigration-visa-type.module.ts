import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ImmigrationVisaTypeController } from './immigration-visa-type.controller';
import { ImmigrationVisaTypeService } from './immigration-visa-type.service';
import { ImmigrationVisaTypeRepository } from './immigration-visa-type.repository';
import { CountryModule } from '../countries/country.module';

@Module({
  imports: [DatabaseModule, CountryModule],
  controllers: [ImmigrationVisaTypeController],
  providers: [ImmigrationVisaTypeService, ImmigrationVisaTypeRepository],
  exports: [ImmigrationVisaTypeService],
})
export class ImmigrationVisaTypeModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { MyCityController } from './my-city.controller';
import { MyCityRepository } from './my-city.repository';
import { MyCityService } from './my-city.service';

/**
 * The My City screen, as a domain of its own.
 *
 * It counts across three others — businesses, events and places — which is
 * exactly why it does not live inside any of them: the screen is the thing
 * these numbers belong to, and putting the place count in the business module
 * would be filing it by where it is read rather than by what it is about.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [MyCityController],
  providers: [MyCityService, MyCityRepository],
})
export class MyCityModule {}

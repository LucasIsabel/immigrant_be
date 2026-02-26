import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { AdminUserController } from './admin-user.controller';
import { DatabaseModule } from '@app/database';
import { SystemModule } from '../system/system.module';
import { CountryModule } from '../countries/country.module';

@Module({
  imports: [SystemModule, DatabaseModule, CountryModule],
  providers: [UserService, UserRepository],
  controllers: [UserController, AdminUserController],
})
export class UserModule {}

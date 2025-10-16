import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { UserModule } from './users/user.module';

@Module({
  imports: [AppConfigModule, UserModule],
})
export class AppModule {}

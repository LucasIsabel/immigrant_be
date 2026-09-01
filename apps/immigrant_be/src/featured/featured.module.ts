import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';

/**
 * Destacar é um ato editorial, e um só — por isso vive num módulo próprio em
 * vez de repetido dentro de negócios, lugares e eventos.
 */
@Module({
  imports: [DatabaseModule],
  controllers: [FeaturedController],
  providers: [FeaturedService],
})
export class FeaturedModule {}

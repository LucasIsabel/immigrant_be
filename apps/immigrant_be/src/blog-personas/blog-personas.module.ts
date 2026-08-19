import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { BlogPersonasController } from './blog-personas.controller';
import { BlogPersonasRepository } from './blog-personas.repository';
import { BlogPersonasService } from './blog-personas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogPersonasController],
  providers: [BlogPersonasService, BlogPersonasRepository],
  exports: [BlogPersonasService],
})
export class BlogPersonasModule {}

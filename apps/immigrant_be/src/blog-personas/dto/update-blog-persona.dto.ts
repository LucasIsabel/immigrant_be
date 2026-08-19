import { PartialType } from '@nestjs/swagger';
import { CreateBlogPersonaDto } from './create-blog-persona.dto';

export class UpdateBlogPersonaDto extends PartialType(CreateBlogPersonaDto) {}

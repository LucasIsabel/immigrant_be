import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpsertBlogCategoryTranslationDto {
  /**
   * Only the name. The slug is derived from it on the server, the same way the
   * canonical rename and the worker already do it — a mechanical transformation
   * with one right answer is not something to ask a person to type twice.
   */
  @ApiProperty({
    description:
      'Nome da categoria neste idioma. O slug é derivado dele no servidor.',
    example: 'Visas and Permits',
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;
}

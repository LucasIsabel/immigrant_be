import { ApiProperty } from '@nestjs/swagger';

export class BusinessLikeResponseDto {
  @ApiProperty({
    description:
      'Estado depois da chamada. Gostar duas vezes responde `true` das duas ' +
      'vezes, e deixar de gostar do que já não se gostava responde `false`.',
  })
  liked: boolean;

  @ApiProperty({
    example: 37,
    description: 'Quantas pessoas gostam deste negócio, já com esta chamada.',
  })
  likesCount: number;
}

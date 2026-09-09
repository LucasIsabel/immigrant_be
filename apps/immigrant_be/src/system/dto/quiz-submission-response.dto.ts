import { ApiProperty } from '@nestjs/swagger';
import { StepType } from './types.dto';

export class QuizSubmissionAnswerDto {
  @ApiProperty({ enum: StepType })
  type: StepType;

  @ApiProperty({ example: 'work' })
  answer: string;
}

export class QuizSubmissionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: String, nullable: true, example: 'PT' })
  originCountry: string | null;

  @ApiProperty({ example: 'pt' })
  language: string;

  @ApiProperty({ type: String, nullable: true })
  suggestionId: string | null;

  @ApiProperty({
    type: [QuizSubmissionAnswerDto],
    description: 'Empty when the submission has no profile to read them from.',
  })
  answers: QuizSubmissionAnswerDto[];
}

export class PaginatedQuizSubmissionsResponseDto {
  @ApiProperty({ type: [QuizSubmissionResponseDto] })
  data: QuizSubmissionResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}

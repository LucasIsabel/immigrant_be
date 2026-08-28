import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  CreateTourGuideReviewDto,
  REVIEW_COMMENT_MAX_LENGTH,
} from './create-tour-guide-review.dto';

async function check(payload: Record<string, unknown>) {
  const dto = plainToInstance(CreateTourGuideReviewDto, payload);
  const errors = await validate(dto);
  return { dto, errors };
}

describe('CreateTourGuideReviewDto', () => {
  it('accepts a rating with no comment', async () => {
    const { errors } = await check({ rating: 5 });
    expect(errors).toHaveLength(0);
  });

  it('rejects a comment past the maximum', async () => {
    // The column is `text`, so nothing else stood between a request and a
    // megabyte of prose on the page.
    const { errors } = await check({
      rating: 5,
      comment: 'x'.repeat(REVIEW_COMMENT_MAX_LENGTH + 1),
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints?.maxLength).toContain(
      String(REVIEW_COMMENT_MAX_LENGTH),
    );
  });

  it('accepts a comment exactly at the maximum', async () => {
    const { errors } = await check({
      rating: 5,
      comment: 'x'.repeat(REVIEW_COMMENT_MAX_LENGTH),
    });
    expect(errors).toHaveLength(0);
  });

  it('trims the surrounding whitespace', async () => {
    const { dto, errors } = await check({
      rating: 4,
      comment: '   Guia atencioso.   ',
    });

    expect(errors).toHaveLength(0);
    expect(dto.comment).toBe('Guia atencioso.');
  });

  it('treats a whitespace-only comment as no comment', async () => {
    const { dto, errors } = await check({ rating: 4, comment: '    ' });

    expect(errors).toHaveLength(0);
    expect(dto.comment).toBeUndefined();
  });

  it('still accepts the deprecated authorName, so the published frontend keeps working', async () => {
    const { errors } = await check({ rating: 5, authorName: 'Outra Pessoa' });
    expect(errors).toHaveLength(0);
  });

  it('rejects a rating outside one to five', async () => {
    expect((await check({ rating: 0 })).errors).toHaveLength(1);
    expect((await check({ rating: 6 })).errors).toHaveLength(1);
  });
});

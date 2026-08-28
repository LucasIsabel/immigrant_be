jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
    FAILED_TRANSLATION: 'FAILED_TRANSLATION',
    FAILED_IMAGE: 'FAILED_IMAGE',
  },
}));

import { Job } from 'bullmq';
import {
  TRANSLATE_ALL_PENDING,
  TRANSLATE_BLOG_CATEGORY,
  TRANSLATE_BLOG_POST,
} from '@app/config/constants';
import { BlogTranslationConsumer } from './blog-translation.consumer';

/**
 * The nightly sweep, and the one way it went wrong.
 *
 * Posts and categories are two independent backlogs that happen to share a
 * cron tick. The first version returned early when there were no pending
 * posts -- which is the *normal* state of a blog whose posts are all
 * translated, and it meant the categories were never reached.
 */
describe('BlogTranslationConsumer — the nightly sweep', () => {
  const build = (pendingPosts: unknown[], pendingCategories: string[]) => {
    const queue = { addBulk: jest.fn().mockResolvedValue([]) };
    const translationService = {
      getPendingTranslations: jest.fn().mockResolvedValue(pendingPosts),
    };
    const categoryTranslationService = {
      findCategoriesNeedingTranslation: jest
        .fn()
        .mockResolvedValue(pendingCategories),
    };

    const consumer = new BlogTranslationConsumer(
      translationService as never,
      categoryTranslationService as never,
      { emit: jest.fn() } as never,
      queue as never,
      { add: jest.fn() } as never,
    );

    return { consumer, queue };
  };

  const sweep = { name: TRANSLATE_ALL_PENDING, id: '1', data: {} } as Job;

  const namesEnqueued = (queue: { addBulk: jest.Mock }): string[] =>
    queue.addBulk.mock.calls.flatMap((call: [{ name: string }[]]) =>
      call[0].map((job) => job.name),
    );

  it('enqueues the categories even when no post is waiting', async () => {
    const { consumer, queue } = build([], ['category-a', 'category-b']);

    await consumer.process(sweep);

    expect(namesEnqueued(queue)).toEqual([
      TRANSLATE_BLOG_CATEGORY,
      TRANSLATE_BLOG_CATEGORY,
    ]);
  });

  it('enqueues the posts even when no category is waiting', async () => {
    const { consumer, queue } = build(
      [{ postId: 'post-a', targetLocale: 'en' }],
      [],
    );

    await consumer.process(sweep);

    expect(namesEnqueued(queue)).toEqual([TRANSLATE_BLOG_POST]);
  });

  it('enqueues both backlogs in one tick', async () => {
    const { consumer, queue } = build(
      [{ postId: 'post-a', targetLocale: 'en' }],
      ['category-a'],
    );

    await consumer.process(sweep);

    expect(namesEnqueued(queue)).toEqual([
      TRANSLATE_BLOG_POST,
      TRANSLATE_BLOG_CATEGORY,
    ]);
  });

  it('asks the queue for nothing when both backlogs are empty', async () => {
    const { consumer, queue } = build([], []);

    await consumer.process(sweep);

    expect(queue.addBulk).not.toHaveBeenCalled();
  });
});

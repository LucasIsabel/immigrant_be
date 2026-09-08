jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

jest.mock('@app/config', () => ({
  env: { FRONTEND_URL: 'https://app.test' },
  ConfigModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  buildCommentWaitingEmail: jest
    .fn()
    .mockReturnValue({ subject: 's', html: 'h' }),
}));

import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { StorageService } from '@app/storage';
import { NotificationsService } from '@app/notifications/notifications.service';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { CommentTarget } from './dto/comment-target';

const BUSINESS_ID = '8c1d84a5-2523-451f-9ad2-e819862ef7c0';
const POST_ID = '3c9e6679-7425-40de-944b-e07fc1f90ae7';
const AUTHOR_ID = 'b7f2a1c0-1111-4444-8888-aaaaaaaaaaaa';
const OWNER_ID = 'b7f2a1c0-2222-4444-8888-bbbbbbbbbbbb';
const PARENT_ID = 'b7f2a1c0-3333-4444-8888-cccccccccccc';
const COMMENT_ID = 'b7f2a1c0-4444-4444-8888-dddddddddddd';

const photo = (mimetype = 'image/jpeg', size = 1024) =>
  ({ buffer: Buffer.from('x'), mimetype, size }) as Express.Multer.File;

const row = (overrides: Record<string, unknown> = {}) =>
  ({
    id: COMMENT_ID,
    body: 'O bacalhau estava excelente.',
    imageUrl: null,
    status: 'APPROVED',
    parentId: null,
    deletedAt: null,
    createdAt: new Date('2026-09-08T10:00:00Z'),
    author: { id: AUTHOR_ID, name: 'Ana Costa', image: null },
    ...overrides,
  }) as never;

const repository = {
  findVisibleTarget: jest.fn(),
  targetColumn: jest.fn(),
  listRoots: jest.fn(),
  create: jest.fn(),
  findParent: jest.fn(),
  findOwnedById: jest.fn(),
  deleteById: jest.fn(),
  anonymise: jest.fn(),
  listInbox: jest.fn(),
  listForAdmin: jest.fn(),
  countPending: jest.fn(),
  findForModeration: jest.fn(),
  setStatus: jest.fn(),
  findRootAuthor: jest.fn(),
  createReport: jest.fn(),
  findReportableById: jest.fn(),
};

const storage = {
  uploadFileAtKey: jest.fn(),
  deleteFile: jest.fn(),
};

const notifications = { notify: jest.fn() };

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    repository.findVisibleTarget.mockResolvedValue({
      ownerId: OWNER_ID,
      title: 'Tasca do Bairro',
      path: '/my-city/pg/restaurant/tasca-do-bairro',
    });
    repository.targetColumn.mockReturnValue({ businessId: BUSINESS_ID });
    repository.create.mockImplementation((data: { status: string }) =>
      Promise.resolve(row({ status: data.status })),
    );
    storage.uploadFileAtKey.mockResolvedValue({
      url: `https://cdn.test/comments/${COMMENT_ID}/photo.jpg`,
      key: `comments/${COMMENT_ID}/photo.jpg`,
    });

    const module = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: CommentsRepository, useValue: repository },
        { provide: StorageService, useValue: storage },
        { provide: NotificationsService, useValue: notifications },
      ],
    }).compile();

    service = module.get(CommentsService);
  });

  describe('create', () => {
    const businessComment = {
      target: CommentTarget.BUSINESS,
      targetId: BUSINESS_ID,
      body: 'O bacalhau estava excelente.',
    };

    it('publishes a text-only comment at once', async () => {
      const comment = await service.create(AUTHOR_ID, businessComment);

      expect(comment.status).toBe('APPROVED');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'APPROVED', imageUrl: null }),
      );
    });

    /*
     * A wrong photo sits on somebody's page looking like it belongs there,
     * which text does not — and a queue that only fills with photos is a queue
     * somebody actually reads.
     */
    it('holds a comment carrying a photo until the owner sees it', async () => {
      const comment = await service.create(AUTHOR_ID, businessComment, photo());

      expect(comment.status).toBe('PENDING');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'PENDING' }),
      );
    });

    it('stores the photo under the folder of the comment it belongs to', async () => {
      await service.create(AUTHOR_ID, businessComment, photo());

      const [, key] = storage.uploadFileAtKey.mock.calls[0];
      const [created] = repository.create.mock.calls[0];
      expect(key).toContain(`comments/${created.id}/`);
      expect(key.endsWith('.jpg')).toBe(true);
    });

    /*
     * The upload happens before the insert, so a failed upload leaves nothing
     * behind rather than a comment pointing at an object that is not there.
     */
    it('writes no comment when the photo fails to upload', async () => {
      storage.uploadFileAtKey.mockRejectedValue(new Error('R2 is down'));

      await expect(
        service.create(AUTHOR_ID, businessComment, photo()),
      ).rejects.toThrow('R2 is down');
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('refuses a photo on a blog post', async () => {
      await expect(
        service.create(
          AUTHOR_ID,
          {
            target: CommentTarget.POST,
            targetId: POST_ID,
            body: 'Bom artigo.',
          },
          photo(),
        ),
      ).rejects.toThrow(BadRequestException);
      expect(repository.create).not.toHaveBeenCalled();
      expect(storage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('accepts a text comment on a blog post', async () => {
      const comment = await service.create(AUTHOR_ID, {
        target: CommentTarget.POST,
        targetId: POST_ID,
        body: 'Bom artigo.',
      });

      expect(comment.status).toBe('APPROVED');
    });

    it('refuses a file that is not an image we accept', async () => {
      await expect(
        service.create(AUTHOR_ID, businessComment, photo('application/pdf')),
      ).rejects.toThrow(BadRequestException);
    });

    it('refuses a photo over five megabytes', async () => {
      await expect(
        service.create(
          AUTHOR_ID,
          businessComment,
          photo('image/jpeg', 6 * 1024 * 1024),
        ),
      ).rejects.toThrow(BadRequestException);
    });

    /*
     * Commenting on something the public cannot see would be writing into a
     * place nobody can read, and would confirm a private id exists.
     */
    it('does not admit that an invisible target exists', async () => {
      repository.findVisibleTarget.mockResolvedValue(null);

      await expect(service.create(AUTHOR_ID, businessComment)).rejects.toThrow(
        NotFoundException,
      );
    });

    describe('replies', () => {
      it('accepts a reply to a top-level comment of the same target', async () => {
        repository.findParent.mockResolvedValue({
          id: PARENT_ID,
          parentId: null,
          postId: null,
          businessId: BUSINESS_ID,
          eventId: null,
          itineraryId: null,
          deletedAt: null,
        });

        await service.create(AUTHOR_ID, {
          ...businessComment,
          parentId: PARENT_ID,
        });

        expect(repository.create).toHaveBeenCalledWith(
          expect.objectContaining({ parentId: PARENT_ID }),
        );
      });

      it('refuses a reply to a reply', async () => {
        repository.findParent.mockResolvedValue({
          id: PARENT_ID,
          parentId: COMMENT_ID,
          postId: null,
          businessId: BUSINESS_ID,
          eventId: null,
          itineraryId: null,
          deletedAt: null,
        });

        await expect(
          service.create(AUTHOR_ID, {
            ...businessComment,
            parentId: PARENT_ID,
          }),
        ).rejects.toThrow(BadRequestException);
        expect(repository.create).not.toHaveBeenCalled();
      });

      /*
       * The parent defines the target. A reply that names a different one
       * would land on a page where its parent is not.
       */
      it('refuses a reply whose parent lives on another target', async () => {
        repository.findParent.mockResolvedValue({
          id: PARENT_ID,
          parentId: null,
          postId: POST_ID,
          businessId: null,
          eventId: null,
          itineraryId: null,
          deletedAt: null,
        });

        await expect(
          service.create(AUTHOR_ID, {
            ...businessComment,
            parentId: PARENT_ID,
          }),
        ).rejects.toThrow(BadRequestException);
      });

      it('answers 404 for a parent that does not exist', async () => {
        repository.findParent.mockResolvedValue(null);

        await expect(
          service.create(AUTHOR_ID, {
            ...businessComment,
            parentId: PARENT_ID,
          }),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });

  describe('the queue and its notices', () => {
    const businessComment = {
      target: CommentTarget.BUSINESS,
      targetId: BUSINESS_ID,
      body: 'O prato veio assim.',
    };

    const moderationRow = (overrides: Record<string, unknown> = {}) => ({
      ...(row() as object),
      parentId: null,
      postId: null,
      businessId: BUSINESS_ID,
      eventId: null,
      itineraryId: null,
      post: null,
      business: {
        userId: OWNER_ID,
        name: 'Tasca do Bairro',
        businessType: 'RESTAURANT',
        businessPage: { slug: 'tasca-do-bairro', status: 'APPROVED' },
      },
      event: null,
      itinerary: null,
      _count: { reports: 0 },
      ...overrides,
    });

    /*
     * A queue nobody knows about is a queue nobody empties — and this one only
     * fills with photos, so the e-mail stays rare enough to be worth opening.
     */
    it('tells the owner, in the bell and by e-mail, that a photo is waiting', async () => {
      await service.create(AUTHOR_ID, businessComment, photo());

      expect(notifications.notify).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: OWNER_ID,
          type: 'comment_received',
          email: { subject: 's', html: 'h' },
          payload: expect.objectContaining({
            target: 'business',
            targetId: BUSINESS_ID,
            targetTitle: 'Tasca do Bairro',
            authorName: 'Ana Costa',
          }),
        }),
      );
    });

    it('says nothing to anybody when the comment is text only', async () => {
      await service.create(AUTHOR_ID, businessComment);

      expect(notifications.notify).not.toHaveBeenCalled();
    });

    /*
     * A photo posted by the person who would have to release it has nobody
     * left to wait for. Queueing it would be asking them to approve themselves.
     */
    it('publishes the owner’s own photo without a queue', async () => {
      const comment = await service.create(OWNER_ID, businessComment, photo());

      expect(comment.status).toBe('APPROVED');
      expect(notifications.notify).not.toHaveBeenCalled();
    });

    it('lists what is waiting, with the total that is waiting', async () => {
      repository.listInbox.mockResolvedValue({
        data: [moderationRow({ status: 'PENDING' })],
        total: 1,
      });
      repository.countPending.mockResolvedValue(3);

      const page = await service.inbox(OWNER_ID, {});

      expect(page.total).toBe(1);
      expect(page.pendingCount).toBe(3);
      expect(page.data[0]).toMatchObject({
        target: 'business',
        targetId: BUSINESS_ID,
        targetTitle: 'Tasca do Bairro',
        isReply: false,
      });
    });

    /*
     * The badge counts every page the owner has, while the list carries only
     * the twenty rows of this page. Deriving one from the other would make the
     * badge lie from the second page onwards.
     */
    /*
     * The queue lives inside the business, so it has to be answerable about
     * one. Narrowing is a filter on top of ownership and never instead of it —
     * a targetId somebody else owns still answers with nothing.
     */
    it('narrows the queue and the badge to one page when asked', async () => {
      repository.listInbox.mockResolvedValue({ data: [], total: 0 });
      repository.countPending.mockResolvedValue(2);

      await service.inbox(OWNER_ID, {
        target: CommentTarget.BUSINESS,
        targetId: BUSINESS_ID,
      });

      expect(repository.listInbox).toHaveBeenCalledWith(
        OWNER_ID,
        expect.objectContaining({
          target: CommentTarget.BUSINESS,
          targetId: BUSINESS_ID,
        }),
      );
      expect(repository.countPending).toHaveBeenCalledWith(OWNER_ID, {
        target: CommentTarget.BUSINESS,
        targetId: BUSINESS_ID,
      });
    });

    it('counts across everything the person owns when not narrowed', async () => {
      repository.listInbox.mockResolvedValue({ data: [], total: 0 });
      repository.countPending.mockResolvedValue(5);

      await service.inbox(OWNER_ID, {});

      expect(repository.countPending).toHaveBeenCalledWith(OWNER_ID, undefined);
    });

    it('counts what is pending apart from the page it returns', async () => {
      repository.listInbox.mockResolvedValue({ data: [], total: 0 });
      repository.countPending.mockResolvedValue(7);

      const page = await service.inbox(OWNER_ID, { page: 2, limit: 10 });

      expect(page.pendingCount).toBe(7);
      expect(repository.listInbox).toHaveBeenCalledWith(OWNER_ID, {
        skip: 10,
        take: 10,
        status: undefined,
      });
    });

    describe('approve', () => {
      beforeEach(() => {
        repository.findForModeration.mockResolvedValue(
          moderationRow({ status: 'PENDING' }),
        );
        repository.setStatus.mockResolvedValue(row({ status: 'APPROVED' }));
      });

      it('releases the comment and tells whoever wrote it', async () => {
        const comment = await service.approve(COMMENT_ID, OWNER_ID, false);

        expect(repository.setStatus).toHaveBeenCalledWith(
          COMMENT_ID,
          'APPROVED',
          OWNER_ID,
          null,
        );
        expect(comment.status).toBe('APPROVED');
        expect(notifications.notify).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: AUTHOR_ID,
            type: 'comment_approved',
            payload: expect.objectContaining({
              commentId: COMMENT_ID,
              targetPath: '/my-city/pg/restaurant/tasca-do-bairro',
            }),
          }),
        );
      });

      /*
       * A reply held back for its photo still owes the person it answers a
       * notice — and only owes it once it is actually public.
       */
      it('tells the person answered, once a held-back reply goes public', async () => {
        repository.findForModeration.mockResolvedValue(
          moderationRow({ status: 'PENDING', parentId: PARENT_ID }),
        );
        repository.findRootAuthor.mockResolvedValue({
          id: PARENT_ID,
          authorId: OWNER_ID,
          deletedAt: null,
        });

        await service.approve(COMMENT_ID, OWNER_ID, false);

        expect(notifications.notify).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: OWNER_ID,
            type: 'comment_replied',
            payload: expect.objectContaining({ parentId: PARENT_ID }),
          }),
        );
      });

      /*
       * 403 and not 404: the id came from somebody's own queue, so denying its
       * existence would be a lie they can already disprove.
       */
      it('refuses somebody else’s comment', async () => {
        await expect(
          service.approve(COMMENT_ID, 'a-stranger', false),
        ).rejects.toThrow(ForbiddenException);
        expect(repository.setStatus).not.toHaveBeenCalled();
      });

      it('lets an admin decide about any of them', async () => {
        await service.approve(COMMENT_ID, 'an-admin', true);

        expect(repository.setStatus).toHaveBeenCalledWith(
          COMMENT_ID,
          'APPROVED',
          'an-admin',
          null,
        );
      });

      it('answers 404 for a comment that does not exist', async () => {
        repository.findForModeration.mockResolvedValue(null);

        await expect(
          service.approve(COMMENT_ID, OWNER_ID, false),
        ).rejects.toThrow(NotFoundException);
      });
    });

    /*
     * Taking down what is already published is the same operation as refusing
     * what is waiting, and deliberately so. `REJECTED` keeps the row, the
     * reason and who decided, and approving again puts it back — which is what
     * a separate `hiddenAt` column would have bought, at the price of two
     * mechanisms for one act and two states a reader has to reason about.
     *
     * Nothing in the moderation path looks at the current status, so this is
     * true by construction rather than by a branch. These tests are what stops
     * somebody adding that branch.
     */
    describe('taking down what is already published', () => {
      beforeEach(() => {
        repository.findForModeration.mockResolvedValue(
          moderationRow({ status: 'APPROVED' }),
        );
        repository.setStatus.mockResolvedValue(row({ status: 'REJECTED' }));
      });

      it('takes down an approved comment, with the reason', async () => {
        const comment = await service.reject(
          COMMENT_ID,
          OWNER_ID,
          false,
          'Ofensivo.',
        );

        expect(comment.status).toBe('REJECTED');
        expect(repository.setStatus).toHaveBeenCalledWith(
          COMMENT_ID,
          'REJECTED',
          OWNER_ID,
          'Ofensivo.',
        );
      });

      it('keeps who decided and why on the row', async () => {
        await service.reject(COMMENT_ID, OWNER_ID, false, 'Ofensivo.');

        const [, , moderatedBy, reason] = repository.setStatus.mock.calls[0];
        expect(moderatedBy).toBe(OWNER_ID);
        expect(reason).toBe('Ofensivo.');
      });

      it('tells the author it came down, and why', async () => {
        await service.reject(COMMENT_ID, OWNER_ID, false, 'Ofensivo.');

        expect(notifications.notify).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: AUTHOR_ID,
            type: 'comment_rejected',
            payload: expect.objectContaining({ reason: 'Ofensivo.' }),
          }),
        );
      });

      it('puts it back when approved again', async () => {
        repository.findForModeration.mockResolvedValue(
          moderationRow({ status: 'REJECTED' }),
        );
        repository.setStatus.mockResolvedValue(row({ status: 'APPROVED' }));

        const comment = await service.approve(COMMENT_ID, OWNER_ID, false);

        expect(comment.status).toBe('APPROVED');
        expect(repository.setStatus).toHaveBeenCalledWith(
          COMMENT_ID,
          'APPROVED',
          OWNER_ID,
          null,
        );
      });

      it('is still refused to somebody who does not own the page', async () => {
        await expect(
          service.reject(COMMENT_ID, 'a-stranger', false, 'Porque sim.'),
        ).rejects.toThrow(ForbiddenException);
      });
    });

    describe('reject', () => {
      beforeEach(() => {
        repository.findForModeration.mockResolvedValue(
          moderationRow({ status: 'PENDING' }),
        );
        repository.setStatus.mockResolvedValue(row({ status: 'REJECTED' }));
      });

      it('keeps it hidden and carries the reason to its author', async () => {
        await service.reject(
          COMMENT_ID,
          OWNER_ID,
          false,
          'A foto não é do restaurante.',
        );

        expect(repository.setStatus).toHaveBeenCalledWith(
          COMMENT_ID,
          'REJECTED',
          OWNER_ID,
          'A foto não é do restaurante.',
        );
        expect(notifications.notify).toHaveBeenCalledWith(
          expect.objectContaining({
            userId: AUTHOR_ID,
            type: 'comment_rejected',
            payload: expect.objectContaining({
              reason: 'A foto não é do restaurante.',
            }),
          }),
        );
      });

      it('accepts a refusal with no reason given', async () => {
        await service.reject(COMMENT_ID, OWNER_ID, false, null);

        expect(notifications.notify).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({ reason: null }),
          }),
        );
      });

      it('refuses somebody else’s comment', async () => {
        await expect(
          service.reject(COMMENT_ID, 'a-stranger', false, null),
        ).rejects.toThrow(ForbiddenException);
      });
    });
  });

  describe('remove', () => {
    it('takes the row out when nothing hangs off it', async () => {
      repository.findOwnedById.mockResolvedValue({
        id: COMMENT_ID,
        imageUrl: null,
        parentId: null,
        deletedAt: null,
        _count: { replies: 0 },
      });

      await service.remove(COMMENT_ID, AUTHOR_ID);

      expect(repository.deleteById).toHaveBeenCalledWith(COMMENT_ID);
      expect(repository.anonymise).not.toHaveBeenCalled();
    });

    /*
     * The replies underneath belong to other people. They should not vanish
     * because the text that prompted them did.
     */
    it('leaves an anchor when replies hang off it', async () => {
      repository.findOwnedById.mockResolvedValue({
        id: COMMENT_ID,
        imageUrl: null,
        parentId: null,
        deletedAt: null,
        _count: { replies: 2 },
      });

      await service.remove(COMMENT_ID, AUTHOR_ID);

      expect(repository.anonymise).toHaveBeenCalledWith(COMMENT_ID);
      expect(repository.deleteById).not.toHaveBeenCalled();
    });

    it('deletes the photo along with the comment', async () => {
      repository.findOwnedById.mockResolvedValue({
        id: COMMENT_ID,
        imageUrl: `https://cdn.test/comments/${COMMENT_ID}/photo.jpg`,
        parentId: null,
        deletedAt: null,
        _count: { replies: 0 },
      });

      await service.remove(COMMENT_ID, AUTHOR_ID);

      expect(storage.deleteFile).toHaveBeenCalledWith(
        `comments/${COMMENT_ID}/photo.jpg`,
      );
    });

    /*
     * The key is rebuilt from the comment's own folder. Losing an object is a
     * stray file; deleting the wrong one is somebody else's photo.
     */
    it('deletes nothing when the stored url points outside the comment folder', async () => {
      repository.findOwnedById.mockResolvedValue({
        id: COMMENT_ID,
        imageUrl: 'https://cdn.test/business/other/cover.jpg',
        parentId: null,
        deletedAt: null,
        _count: { replies: 0 },
      });

      await service.remove(COMMENT_ID, AUTHOR_ID);

      expect(storage.deleteFile).not.toHaveBeenCalled();
      expect(repository.deleteById).toHaveBeenCalledWith(COMMENT_ID);
    });

    it('still removes the comment when the storage delete fails', async () => {
      repository.findOwnedById.mockResolvedValue({
        id: COMMENT_ID,
        imageUrl: `https://cdn.test/comments/${COMMENT_ID}/photo.jpg`,
        parentId: null,
        deletedAt: null,
        _count: { replies: 0 },
      });
      storage.deleteFile.mockRejectedValue(new Error('R2 is down'));

      await service.remove(COMMENT_ID, AUTHOR_ID);

      expect(repository.deleteById).toHaveBeenCalledWith(COMMENT_ID);
    });

    it('answers 404 for a comment somebody else wrote', async () => {
      repository.findOwnedById.mockResolvedValue(null);

      await expect(service.remove(COMMENT_ID, AUTHOR_ID)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.deleteById).not.toHaveBeenCalled();
      expect(repository.anonymise).not.toHaveBeenCalled();
    });
  });

  describe('report', () => {
    beforeEach(() => {
      repository.findReportableById.mockResolvedValue({ id: COMMENT_ID });
    });

    it('records a real report against the comment', async () => {
      const answer = await service.report(COMMENT_ID, {
        reason: 'A fotografia é de outro restaurante.',
      });

      expect(answer).toEqual({ received: true });
      expect(repository.createReport).toHaveBeenCalledWith(
        COMMENT_ID,
        'A fotografia é de outro restaurante.',
      );
    });

    /*
     * Telling a bot it was caught is telling it how to try again, so a filled
     * honeypot answers exactly like a real report — and never reaches the read
     * that would confirm the comment exists.
     */
    it('drops a honeypot submission without saying so', async () => {
      const answer = await service.report(COMMENT_ID, {
        reason: 'qualquer coisa suficientemente longa',
        website: 'http://spam.example',
      });

      expect(answer).toEqual({ received: true });
      expect(repository.createReport).not.toHaveBeenCalled();
      expect(repository.findReportableById).not.toHaveBeenCalled();
    });

    /*
     * Reporting a comment nobody can read is nothing, and answering
     * differently would say whether a hidden one exists.
     */
    it('does not admit that an unpublished comment exists', async () => {
      repository.findReportableById.mockResolvedValue(null);

      await expect(
        service.report(COMMENT_ID, { reason: 'dez caracteres pelo menos' }),
      ).rejects.toThrow(NotFoundException);
      expect(repository.createReport).not.toHaveBeenCalled();
    });
  });

  describe('the admin list', () => {
    beforeEach(() => {
      repository.listForAdmin.mockResolvedValue({ data: [], total: 0 });
    });

    it('narrows to what was reported when asked', async () => {
      await service.adminList({ reported: true });

      expect(repository.listForAdmin).toHaveBeenCalledWith(
        expect.objectContaining({ reported: true }),
      );
    });

    /*
     * `reported=false` is not "everything" — it is what nobody has flagged.
     * Collapsing the two would make one parameter mean two things.
     */
    it('keeps false meaning "nobody flagged it", not "no filter"', async () => {
      await service.adminList({ reported: false });

      expect(repository.listForAdmin).toHaveBeenCalledWith(
        expect.objectContaining({ reported: false }),
      );
    });

    it('asks for everything when the filter is absent', async () => {
      await service.adminList({});

      expect(repository.listForAdmin).toHaveBeenCalledWith(
        expect.objectContaining({ reported: undefined }),
      );
    });
  });

  describe('list', () => {
    beforeEach(() => {
      repository.listRoots.mockResolvedValue({
        data: [
          {
            ...(row() as object),
            replies: [
              {
                ...(row({
                  id: 'reply-1',
                  parentId: COMMENT_ID,
                  author: { id: OWNER_ID, name: 'Dono', image: null },
                }) as object),
              },
            ],
          },
        ],
        total: 1,
      });
    });

    it('nests the replies under their root', async () => {
      const page = await service.list({
        target: CommentTarget.BUSINESS,
        targetId: BUSINESS_ID,
      });

      expect(page.data).toHaveLength(1);
      expect(page.data[0].replies).toHaveLength(1);
      expect(page.total).toBe(1);
    });

    it('marks the reader’s own comments', async () => {
      const page = await service.list(
        { target: CommentTarget.BUSINESS, targetId: BUSINESS_ID },
        AUTHOR_ID,
      );

      expect(page.data[0].isMine).toBe(true);
      expect(page.data[0].replies?.[0].isMine).toBe(false);
    });

    it('marks nothing as the reader’s when nobody is signed in', async () => {
      const page = await service.list({
        target: CommentTarget.BUSINESS,
        targetId: BUSINESS_ID,
      });

      expect(page.data[0].isMine).toBe(false);
    });

    it('passes the reader through so their pending comments come back', async () => {
      await service.list(
        {
          target: CommentTarget.BUSINESS,
          targetId: BUSINESS_ID,
          page: 2,
          limit: 10,
        },
        AUTHOR_ID,
      );

      expect(repository.listRoots).toHaveBeenCalledWith(
        CommentTarget.BUSINESS,
        BUSINESS_ID,
        { skip: 10, take: 10, viewerId: AUTHOR_ID },
      );
    });

    it('reports an anchor as deleted, with its body gone', async () => {
      repository.listRoots.mockResolvedValue({
        data: [
          {
            ...(row({ body: '', deletedAt: new Date() }) as object),
            replies: [],
          },
        ],
        total: 1,
      });

      const page = await service.list({
        target: CommentTarget.BUSINESS,
        targetId: BUSINESS_ID,
      });

      expect(page.data[0].isDeleted).toBe(true);
      expect(page.data[0].body).toBe('');
    });
  });
});

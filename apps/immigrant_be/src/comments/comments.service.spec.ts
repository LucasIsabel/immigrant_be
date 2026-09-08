jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StorageService } from '@app/storage';
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
};

const storage = {
  uploadFileAtKey: jest.fn(),
  deleteFile: jest.fn(),
};

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    repository.findVisibleTarget.mockResolvedValue({ ownerId: OWNER_ID });
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

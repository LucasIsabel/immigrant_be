jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { RoleRepository } from './role.repository';

const mockPrismaService = {
  roles: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  userRoles: {
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

describe('RoleRepository', () => {
  let repository: RoleRepository;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<RoleRepository>(RoleRepository);
    prisma = module.get(PrismaService);

    jest.clearAllMocks();
  });

  // ── Role CRUD ──────────────────────────────────────────────

  describe('create', () => {
    it('should call prisma.roles.create with correct data', async () => {
      const data = { name: 'editor', description: 'Can edit' };
      prisma.roles.create.mockResolvedValue({ id: '1', ...data });

      await repository.create(data);

      expect(prisma.roles.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('findAll', () => {
    it('should call prisma.roles.findMany ordered by name', async () => {
      prisma.roles.findMany.mockResolvedValue([]);

      await repository.findAll();

      expect(prisma.roles.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('findById', () => {
    it('should call prisma.roles.findUnique with id', async () => {
      prisma.roles.findUnique.mockResolvedValue(null);

      await repository.findById('role-id');

      expect(prisma.roles.findUnique).toHaveBeenCalledWith({
        where: { id: 'role-id' },
      });
    });
  });

  describe('findByName', () => {
    it('should call prisma.roles.findUnique with name', async () => {
      prisma.roles.findUnique.mockResolvedValue(null);

      await repository.findByName('admin');

      expect(prisma.roles.findUnique).toHaveBeenCalledWith({
        where: { name: 'admin' },
      });
    });
  });

  describe('update', () => {
    it('should call prisma.roles.update with id and data', async () => {
      const data = { name: 'new-name' };
      prisma.roles.update.mockResolvedValue({ id: 'role-id', ...data });

      await repository.update('role-id', data);

      expect(prisma.roles.update).toHaveBeenCalledWith({
        where: { id: 'role-id' },
        data,
      });
    });
  });

  describe('delete', () => {
    it('should call prisma.roles.delete with id', async () => {
      prisma.roles.delete.mockResolvedValue({ id: 'role-id' });

      await repository.delete('role-id');

      expect(prisma.roles.delete).toHaveBeenCalledWith({
        where: { id: 'role-id' },
      });
    });
  });

  // ── User-Role Assignment ───────────────────────────────────

  describe('assignRole', () => {
    it('should call prisma.userRoles.create with userId, roleId and include role', async () => {
      prisma.userRoles.create.mockResolvedValue({});

      await repository.assignRole('user-id', 'role-id');

      expect(prisma.userRoles.create).toHaveBeenCalledWith({
        data: { userId: 'user-id', roleId: 'role-id' },
        include: { role: true },
      });
    });
  });

  describe('revokeRole', () => {
    it('should call prisma.userRoles.delete with compound unique key', async () => {
      prisma.userRoles.delete.mockResolvedValue({});

      await repository.revokeRole('user-id', 'role-id');

      expect(prisma.userRoles.delete).toHaveBeenCalledWith({
        where: { userId_roleId: { userId: 'user-id', roleId: 'role-id' } },
      });
    });
  });

  describe('findUserRoles', () => {
    it('should call prisma.userRoles.findMany with userId and include role', async () => {
      prisma.userRoles.findMany.mockResolvedValue([]);

      await repository.findUserRoles('user-id');

      expect(prisma.userRoles.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-id' },
        include: { role: true },
      });
    });
  });

  describe('countUserRoles', () => {
    it('should call prisma.userRoles.count with userId', async () => {
      prisma.userRoles.count.mockResolvedValue(2);

      const result = await repository.countUserRoles('user-id');

      expect(result).toBe(2);
      expect(prisma.userRoles.count).toHaveBeenCalledWith({
        where: { userId: 'user-id' },
      });
    });
  });
});

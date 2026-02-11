jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';

const mockRole = {
  id: 'role-id-1',
  name: 'editor',
  description: 'Can edit content',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProtectedRole = {
  id: 'role-id-2',
  name: 'admin',
  description: 'Administrator role',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUserRole = {
  id: 'user-role-id-1',
  userId: 'user-id-1',
  roleId: 'role-id-1',
  assignedAt: new Date(),
  role: mockRole,
};

const mockRoleRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  assignRole: jest.fn(),
  revokeRole: jest.fn(),
  findUserRoles: jest.fn(),
  countUserRoles: jest.fn(),
};

describe('RoleService', () => {
  let service: RoleService;
  let repository: typeof mockRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: RoleRepository, useValue: mockRoleRepository },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get(RoleRepository);

    jest.clearAllMocks();
  });

  // ── create ─────────────────────────────────────────────────

  describe('create', () => {
    it('should create a role successfully', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockRole);

      const result = await service.create({
        name: 'editor',
        description: 'Can edit content',
      });

      expect(result).toEqual(mockRole);
      expect(repository.findByName).toHaveBeenCalledWith('editor');
      expect(repository.create).toHaveBeenCalledWith({
        name: 'editor',
        description: 'Can edit content',
      });
    });

    it('should throw ConflictException if name already exists', async () => {
      repository.findByName.mockResolvedValue(mockRole);

      await expect(service.create({ name: 'editor' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  // ── findAll ────────────────────────────────────────────────

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      repository.findAll.mockResolvedValue([mockRole]);

      const result = await service.findAll();

      expect(result).toEqual([mockRole]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  // ── findById ───────────────────────────────────────────────

  describe('findById', () => {
    it('should return a role by id', async () => {
      repository.findById.mockResolvedValue(mockRole);

      const result = await service.findById('role-id-1');

      expect(result).toEqual(mockRole);
      expect(repository.findById).toHaveBeenCalledWith('role-id-1');
    });

    it('should throw NotFoundException if role not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── update ─────────────────────────────────────────────────

  describe('update', () => {
    it('should update a role successfully', async () => {
      const updated = { ...mockRole, name: 'new-name' };
      repository.findById.mockResolvedValue(mockRole);
      repository.findByName.mockResolvedValue(null);
      repository.update.mockResolvedValue(updated);

      const result = await service.update('role-id-1', { name: 'new-name' });

      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalledWith('role-id-1', {
        name: 'new-name',
      });
    });

    it('should throw NotFoundException if role not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update('non-existent', { name: 'x' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if new name already exists', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.findByName.mockResolvedValue({
        ...mockRole,
        id: 'other-id',
        name: 'taken-name',
      });

      await expect(
        service.update('role-id-1', { name: 'taken-name' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  // ── delete ─────────────────────────────────────────────────

  describe('delete', () => {
    it('should delete a role successfully', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.delete.mockResolvedValue(mockRole);

      const result = await service.delete('role-id-1');

      expect(result).toEqual(mockRole);
      expect(repository.delete).toHaveBeenCalledWith('role-id-1');
    });

    it('should throw NotFoundException if role not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException for protected role', async () => {
      repository.findById.mockResolvedValue(mockProtectedRole);

      await expect(service.delete('role-id-2')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ── assignRole ─────────────────────────────────────────────

  describe('assignRole', () => {
    it('should assign a role successfully', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.assignRole.mockResolvedValue(mockUserRole);

      const result = await service.assignRole('user-id-1', 'role-id-1');

      expect(result).toEqual(mockUserRole);
      expect(repository.assignRole).toHaveBeenCalledWith(
        'user-id-1',
        'role-id-1',
      );
    });

    it('should throw NotFoundException if role not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.assignRole('user-id-1', 'non-existent'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException on duplicate assignment', async () => {
      repository.findById.mockResolvedValue(mockRole);
      const prismaError = new Error('Unique constraint');
      (prismaError as Error & { code: string }).code = 'P2002';
      repository.assignRole.mockRejectedValue(prismaError);

      await expect(
        service.assignRole('user-id-1', 'role-id-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if user not found (FK violation)', async () => {
      repository.findById.mockResolvedValue(mockRole);
      const prismaError = new Error('Foreign key constraint');
      (prismaError as Error & { code: string }).code = 'P2003';
      repository.assignRole.mockRejectedValue(prismaError);

      await expect(
        service.assignRole('non-existent', 'role-id-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── revokeRole ─────────────────────────────────────────────

  describe('revokeRole', () => {
    it('should revoke a role successfully', async () => {
      repository.countUserRoles.mockResolvedValue(2);
      repository.revokeRole.mockResolvedValue(mockUserRole);

      const result = await service.revokeRole('user-id-1', 'role-id-1');

      expect(result).toEqual(mockUserRole);
      expect(repository.revokeRole).toHaveBeenCalledWith(
        'user-id-1',
        'role-id-1',
      );
    });

    it('should throw BadRequestException when revoking the last role', async () => {
      repository.countUserRoles.mockResolvedValue(1);

      await expect(
        service.revokeRole('user-id-1', 'role-id-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if assignment not found', async () => {
      repository.countUserRoles.mockResolvedValue(2);
      const prismaError = new Error('Record not found');
      (prismaError as Error & { code: string }).code = 'P2025';
      repository.revokeRole.mockRejectedValue(prismaError);

      await expect(
        service.revokeRole('user-id-1', 'role-id-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── findUserRoles ──────────────────────────────────────────

  describe('findUserRoles', () => {
    it('should return user roles with role details', async () => {
      repository.findUserRoles.mockResolvedValue([mockUserRole]);

      const result = await service.findUserRoles('user-id-1');

      expect(result).toEqual([mockUserRole]);
      expect(repository.findUserRoles).toHaveBeenCalledWith('user-id-1');
    });
  });
});

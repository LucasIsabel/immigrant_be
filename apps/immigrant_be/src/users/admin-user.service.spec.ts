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
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CountryService } from '../countries/country.service';

const mockUser = {
  id: 'user-id-1',
  name: 'John Doe',
  email: 'john@example.com',
  emailVerified: true,
  image: null,
  isActive: true,
  banned: false,
  banReason: null,
  banExpires: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  userRoles: [
    {
      id: 'ur-1',
      assignedAt: new Date(),
      role: {
        id: 'r-1',
        name: 'user',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ],
};

const mockInactiveUser = {
  ...mockUser,
  id: 'user-id-2',
  isActive: false,
};

const mockBannedUser = {
  ...mockUser,
  id: 'user-id-3',
  banned: true,
  banReason: 'Spamming',
};

const mockUserRepository = {
  findAllPaginated: jest.fn(),
  findByIdWithRoles: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  setActiveStatus: jest.fn(),
  banUser: jest.fn(),
  unbanUser: jest.fn(),
  findByEmail: jest.fn(),
  createUser: jest.fn(),
  setEmailVerified: jest.fn(),
  findSessionsByUserId: jest.fn(),
  deleteSessionsByUserId: jest.fn(),
  findMeWithRoles: jest.fn(),
  updateMyProfile: jest.fn(),
  // Existing methods (needed for module creation)
  createUserPlan: jest.fn(),
  getAllUserPlans: jest.fn(),
  getUserPlan: jest.fn(),
  selectVisaType: jest.fn(),
  getVisaStepsByRecommendation: jest.fn(),
  updatePlanStepsRemaining: jest.fn(),
  getUserById: jest.fn(),
};

const mockCountryService = {
  findOne: jest.fn(),
};

describe('UserService - Admin Methods', () => {
  let service: UserService;
  let repository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: CountryService, useValue: mockCountryService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);

    jest.clearAllMocks();
  });

  // ── findAllUsers ──────────────────────────────────────────

  describe('findAllUsers', () => {
    it('should return paginated users', async () => {
      repository.findAllPaginated.mockResolvedValue({
        data: [mockUser],
        total: 1,
        page: 1,
        limit: 20,
      });

      const result = await service.findAllUsers({ page: 1, limit: 20 });

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('should calculate totalPages correctly', async () => {
      repository.findAllPaginated.mockResolvedValue({
        data: [],
        total: 45,
        page: 1,
        limit: 20,
      });

      const result = await service.findAllUsers({ page: 1, limit: 20 });

      expect(result.totalPages).toBe(3);
    });
  });

  // ── findUserByIdAdmin ─────────────────────────────────────

  describe('findUserByIdAdmin', () => {
    it('should return user with roles', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);

      const result = await service.findUserByIdAdmin('user-id-1');

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.findUserByIdAdmin('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── updateUser ────────────────────────────────────────────

  describe('updateUser', () => {
    it('should update user name', async () => {
      const updated = { ...mockUser, name: 'Jane Doe' };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.updateUser.mockResolvedValue(updated);

      const result = await service.updateUser('user-id-1', {
        name: 'Jane Doe',
      });

      expect(result.name).toBe('Jane Doe');
      expect(repository.updateUser).toHaveBeenCalledWith('user-id-1', {
        name: 'Jane Doe',
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(
        service.updateUser('nonexistent', { name: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when email already in use', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.findByEmail.mockResolvedValue({ id: 'other-user' });

      await expect(
        service.updateUser('user-id-1', { email: 'taken@example.com' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should allow updating to the same email', async () => {
      const updated = { ...mockUser };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.updateUser.mockResolvedValue(updated);

      await service.updateUser('user-id-1', { email: 'john@example.com' });

      expect(repository.findByEmail).not.toHaveBeenCalled();
    });
  });

  // ── deleteUser ────────────────────────────────────────────

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.deleteUser.mockResolvedValue(undefined);

      await service.deleteUser('user-id-1', 'admin-id');

      expect(repository.deleteUser).toHaveBeenCalledWith('user-id-1');
    });

    it('should throw BadRequestException when admin tries to delete themselves', async () => {
      await expect(service.deleteUser('admin-id', 'admin-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(
        service.deleteUser('nonexistent', 'admin-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── activateUser ──────────────────────────────────────────

  describe('activateUser', () => {
    it('should activate an inactive user', async () => {
      const activated = { ...mockInactiveUser, isActive: true };
      repository.findByIdWithRoles.mockResolvedValue(mockInactiveUser);
      repository.setActiveStatus.mockResolvedValue(activated);

      const result = await service.activateUser('user-id-2');

      expect(result.isActive).toBe(true);
      expect(repository.setActiveStatus).toHaveBeenCalledWith(
        'user-id-2',
        true,
      );
    });

    it('should throw ConflictException when user is already active', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);

      await expect(service.activateUser('user-id-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.activateUser('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── deactivateUser ────────────────────────────────────────

  describe('deactivateUser', () => {
    it('should deactivate an active user and revoke their sessions', async () => {
      const deactivated = { ...mockUser, isActive: false };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.setActiveStatus.mockResolvedValue(deactivated);
      repository.deleteSessionsByUserId.mockResolvedValue({ count: 1 });

      const result = await service.deactivateUser('user-id-1');

      expect(result.isActive).toBe(false);
      expect(repository.setActiveStatus).toHaveBeenCalledWith(
        'user-id-1',
        false,
      );
      expect(repository.deleteSessionsByUserId).toHaveBeenCalledWith(
        'user-id-1',
      );
    });

    it('should throw ConflictException when user is already inactive', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockInactiveUser);

      await expect(service.deactivateUser('user-id-2')).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.deactivateUser('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── banUser ───────────────────────────────────────────────

  describe('banUser', () => {
    it('should ban a user with reason and revoke their sessions', async () => {
      const banned = { ...mockUser, banned: true, banReason: 'Spamming' };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.banUser.mockResolvedValue(banned);
      repository.deleteSessionsByUserId.mockResolvedValue({ count: 2 });

      const result = await service.banUser(
        'user-id-1',
        { banReason: 'Spamming' },
        'admin-id',
      );

      expect(result.banned).toBe(true);
      expect(result.banReason).toBe('Spamming');
      expect(repository.deleteSessionsByUserId).toHaveBeenCalledWith(
        'user-id-1',
      );
    });

    it('should ban a user with expiry', async () => {
      const banned = { ...mockUser, banned: true };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.banUser.mockResolvedValue(banned);
      repository.deleteSessionsByUserId.mockResolvedValue({ count: 0 });

      await service.banUser(
        'user-id-1',
        { banExpiresInSeconds: 3600 },
        'admin-id',
      );

      expect(repository.banUser).toHaveBeenCalledWith(
        'user-id-1',
        undefined,
        expect.any(Date),
      );
    });

    it('should throw BadRequestException when admin tries to ban themselves', async () => {
      await expect(service.banUser('admin-id', {}, 'admin-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw ConflictException when user is already banned', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockBannedUser);

      await expect(
        service.banUser('user-id-3', {}, 'admin-id'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(
        service.banUser('nonexistent', {}, 'admin-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── unbanUser ─────────────────────────────────────────────

  describe('unbanUser', () => {
    it('should unban a banned user', async () => {
      const unbanned = { ...mockBannedUser, banned: false, banReason: null };
      repository.findByIdWithRoles.mockResolvedValue(mockBannedUser);
      repository.unbanUser.mockResolvedValue(unbanned);

      const result = await service.unbanUser('user-id-3');

      expect(result.banned).toBe(false);
      expect(repository.unbanUser).toHaveBeenCalledWith('user-id-3');
    });

    it('should throw ConflictException when user is not banned', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);

      await expect(service.unbanUser('user-id-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.unbanUser('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── createAdminUser ───────────────────────────────────────

  describe('createAdminUser', () => {
    const createDto = {
      name: 'New User',
      email: 'new@example.com',
      password: 'Str0ngPass!',
    };

    it('should create a user successfully', async () => {
      const created = { ...mockUser, ...createDto };
      repository.findByEmail.mockResolvedValue(null);
      repository.createUser.mockResolvedValue(created);

      const result = await service.createAdminUser(createDto);

      expect(repository.findByEmail).toHaveBeenCalledWith(createDto.email);
      expect(repository.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          name: createDto.name,
          email: createDto.email,
          password: createDto.password,
        }),
      );
      expect(result).toEqual(created);
    });

    it('should throw ConflictException when email already in use', async () => {
      repository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.createAdminUser(createDto)).rejects.toThrow(
        ConflictException,
      );
      expect(repository.createUser).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when default role "user" is not found', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.createUser.mockResolvedValue(null);

      await expect(service.createAdminUser(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── verifyUserEmail ───────────────────────────────────────

  describe('verifyUserEmail', () => {
    it('should verify email successfully', async () => {
      const verified = { ...mockUser, emailVerified: true };
      repository.findByIdWithRoles.mockResolvedValue({
        ...mockUser,
        emailVerified: false,
      });
      repository.setEmailVerified.mockResolvedValue(verified);

      const result = await service.verifyUserEmail('user-id-1', true);

      expect(result.emailVerified).toBe(true);
      expect(repository.setEmailVerified).toHaveBeenCalledWith(
        'user-id-1',
        true,
      );
    });

    it('should unverify email successfully', async () => {
      const unverified = { ...mockUser, emailVerified: false };
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.setEmailVerified.mockResolvedValue(unverified);

      const result = await service.verifyUserEmail('user-id-1', false);

      expect(result.emailVerified).toBe(false);
      expect(repository.setEmailVerified).toHaveBeenCalledWith(
        'user-id-1',
        false,
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(
        service.verifyUserEmail('nonexistent', true),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when email is already in the desired state', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser); // emailVerified: true

      await expect(service.verifyUserEmail('user-id-1', true)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  // ── getUserSessions ───────────────────────────────────────

  describe('getUserSessions', () => {
    it('should return sessions for a user', async () => {
      const sessions = [
        {
          id: 'session-1',
          userId: 'user-id-1',
          expiresAt: new Date(),
          createdAt: new Date(),
        },
      ];
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.findSessionsByUserId.mockResolvedValue(sessions);

      const result = await service.getUserSessions('user-id-1');

      expect(result).toEqual(sessions);
      expect(repository.findSessionsByUserId).toHaveBeenCalledWith('user-id-1');
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.getUserSessions('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── revokeUserSessions ────────────────────────────────────

  describe('revokeUserSessions', () => {
    it('should revoke all sessions for a user', async () => {
      repository.findByIdWithRoles.mockResolvedValue(mockUser);
      repository.deleteSessionsByUserId.mockResolvedValue({ count: 3 });

      await service.revokeUserSessions('user-id-1');

      expect(repository.deleteSessionsByUserId).toHaveBeenCalledWith(
        'user-id-1',
      );
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repository.findByIdWithRoles.mockResolvedValue(null);

      await expect(service.revokeUserSessions('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

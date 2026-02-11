const mockGetSession = jest.fn();

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/config/auth', () => ({
  auth: {
    api: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
    },
  },
}));

jest.mock('better-auth/node', () => ({
  fromNodeHeaders: jest.fn((headers) => headers),
}));

import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@app/database';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../enums/user-role.enum';

const mockReflector = {
  get: jest.fn(),
};

const mockPrismaService = {
  users: {
    findUnique: jest.fn(),
  },
};

function createMockContext(session?: {
  user?: { id?: string };
}): ExecutionContext {
  return {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ session, headers: {} }),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    }),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  } as unknown as ExecutionContext;
}

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: typeof mockReflector;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        { provide: Reflector, useValue: mockReflector },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get(Reflector);
    prisma = module.get(PrismaService);

    jest.clearAllMocks();
  });

  it('should allow when no @Roles() decorator is present', async () => {
    reflector.get.mockReturnValue(undefined);

    const context = createMockContext();
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(prisma.users.findUnique).not.toHaveBeenCalled();
  });

  it('should allow when @Roles() has empty array', async () => {
    reflector.get.mockReturnValue([]);

    const context = createMockContext();
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException when no session', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN]);
    mockGetSession.mockResolvedValue(null);

    const context = createMockContext(undefined);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when session has no user id', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN]);
    mockGetSession.mockResolvedValue(null);

    const context = createMockContext({ user: {} });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when user not found in database', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN]);
    prisma.users.findUnique.mockResolvedValue(null);

    const context = createMockContext({ user: { id: 'user-id' } });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should allow when user has the required role', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN]);
    prisma.users.findUnique.mockResolvedValue({
      userRoles: [{ role: { name: 'admin' } }],
    });

    const context = createMockContext({ user: { id: 'user-id' } });
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      select: { userRoles: { select: { role: { select: { name: true } } } } },
    });
  });

  it('should allow when user has one of multiple required roles', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN, UserRole.USER]);
    prisma.users.findUnique.mockResolvedValue({
      userRoles: [{ role: { name: 'user' } }],
    });

    const context = createMockContext({ user: { id: 'user-id' } });
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw ForbiddenException when user lacks the required role', async () => {
    reflector.get.mockReturnValue([UserRole.ADMIN]);
    prisma.users.findUnique.mockResolvedValue({
      userRoles: [{ role: { name: 'user' } }],
    });

    const context = createMockContext({ user: { id: 'user-id' } });

    await expect(guard.canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });
});

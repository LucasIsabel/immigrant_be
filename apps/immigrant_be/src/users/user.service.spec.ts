jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MarkStepDto } from './dto/mark-step.dto';

const mockSession = {
  user: { id: 'user-id-1' },
} as any;

const makePlan = (overrides: object = {}) => ({
  id: 'plan-id-1',
  user_id: 'user-id-1',
  steps_remaining: {
    core_documents: [
      {
        name: 'Valid passport',
        required: true,
        priority: 1,
        notes: '',
        checked: false,
      },
      {
        name: 'Birth certificate',
        required: true,
        priority: 2,
        notes: '',
        checked: false,
      },
    ],
    health_and_character: [
      {
        name: 'Police check',
        required: true,
        priority: 1,
        notes: '',
        checked: false,
      },
    ],
  },
  steps_completed: {},
  progress: 0,
  ...overrides,
});

const mockUserRepository = {
  getUserPlanRaw: jest.fn(),
  updatePlanStepProgress: jest.fn(),
  // other methods needed for module wiring
  createUserPlan: jest.fn(),
  getAllUserPlans: jest.fn(),
  getUserPlan: jest.fn(),
  selectVisaType: jest.fn(),
  getVisaStepsByRecommendation: jest.fn(),
  updatePlanStepsRemaining: jest.fn(),
  getUserById: jest.fn(),
  findAllPaginated: jest.fn(),
  findByIdWithRoles: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  setActiveStatus: jest.fn(),
  banUser: jest.fn(),
  unbanUser: jest.fn(),
  findByEmail: jest.fn(),
};

describe('UserService - markStep', () => {
  let service: UserService;
  let repository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);

    jest.clearAllMocks();
  });

  // ── Plan not found ────────────────────────────────────────

  it('should throw NotFoundException when plan does not belong to the user', async () => {
    repository.getUserPlanRaw.mockResolvedValue(null);

    const dto: MarkStepDto = {
      steps_remaining: {
        core_documents: [{ name: 'Birth certificate', checked: false }],
      },
      steps_completed: {},
    };

    await expect(
      service.markStep(mockSession, 'plan-id-1', dto),
    ).rejects.toThrow(NotFoundException);

    expect(repository.updatePlanStepProgress).not.toHaveBeenCalled();
  });

  // ── State passthrough ─────────────────────────────────────

  it('should persist the client-provided state directly to the repository', async () => {
    const plan = makePlan();
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      steps_remaining: {
        core_documents: [
          {
            name: 'Birth certificate',
            required: true,
            priority: 2,
            notes: '',
            checked: false,
          },
        ],
      },
      steps_completed: {
        core_documents: [
          {
            name: 'Valid passport',
            required: true,
            priority: 1,
            notes: '',
            checked: true,
          },
        ],
      },
    };

    const result = await service.markStep(mockSession, 'plan-id-1', dto);

    expect(result).toEqual({ id: 'plan-id-1' });

    const [planId, remaining, completedSteps] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(planId).toBe('plan-id-1');
    expect(remaining).toEqual(dto.steps_remaining);
    expect(completedSteps).toEqual(dto.steps_completed);
  });

  // ── Progress calculation ──────────────────────────────────

  it('should calculate progress as 0 when steps_completed is empty', async () => {
    repository.getUserPlanRaw.mockResolvedValue(makePlan());
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      steps_remaining: {
        core_documents: [{ name: 'Valid passport', checked: false }],
      },
      steps_completed: {},
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(0);
  });

  it('should calculate progress as 1 when steps_remaining is empty', async () => {
    repository.getUserPlanRaw.mockResolvedValue(makePlan());
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      steps_remaining: {},
      steps_completed: {
        core_documents: [{ name: 'Valid passport', checked: true }],
      },
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(1);
  });

  it('should calculate progress as 0 when both steps_remaining and steps_completed are empty', async () => {
    repository.getUserPlanRaw.mockResolvedValue(makePlan());
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      steps_remaining: {},
      steps_completed: {},
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(0);
  });

  it('should calculate partial progress correctly across multiple categories', async () => {
    // 1 remaining + 2 completed = 3 total → progress = 2/3
    repository.getUserPlanRaw.mockResolvedValue(makePlan());
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      steps_remaining: {
        core_documents: [{ name: 'Birth certificate', checked: false }],
      },
      steps_completed: {
        core_documents: [{ name: 'Valid passport', checked: true }],
        health_and_character: [{ name: 'Police check', checked: true }],
      },
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBeCloseTo(2 / 3);
  });
});

describe('UserService - completeAllSteps', () => {
  let service: UserService;
  let repository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);

    jest.clearAllMocks();
  });

  it('should throw NotFoundException when plan is not found', async () => {
    repository.getUserPlanRaw.mockResolvedValue(null);

    await expect(
      service.completeAllSteps(mockSession, 'plan-id-1'),
    ).rejects.toThrow(NotFoundException);

    expect(repository.updatePlanStepProgress).not.toHaveBeenCalled();
  });

  it('should move all remaining steps to completed with checked=true and progress=1', async () => {
    const plan = makePlan();
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const result = await service.completeAllSteps(mockSession, 'plan-id-1');

    expect(result).toEqual({ id: 'plan-id-1' });

    const [planId, remaining, completedSteps, progress] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(planId).toBe('plan-id-1');
    expect(remaining).toEqual({});
    expect(progress).toBe(1);

    // All steps from core_documents should be in completedSteps with checked=true
    expect(completedSteps.core_documents).toHaveLength(2);
    expect(completedSteps.core_documents[0]).toMatchObject({
      name: 'Valid passport',
      checked: true,
    });
    expect(completedSteps.core_documents[1]).toMatchObject({
      name: 'Birth certificate',
      checked: true,
    });

    // All steps from health_and_character should be in completedSteps with checked=true
    expect(completedSteps.health_and_character).toHaveLength(1);
    expect(completedSteps.health_and_character[0]).toMatchObject({
      name: 'Police check',
      checked: true,
    });
  });

  it('should be idempotent when steps_remaining is already empty', async () => {
    const plan = makePlan({
      steps_remaining: {},
      steps_completed: {
        core_documents: [
          {
            name: 'Valid passport',
            required: true,
            priority: 1,
            notes: '',
            checked: true,
          },
        ],
      },
      progress: 1,
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const result = await service.completeAllSteps(mockSession, 'plan-id-1');

    expect(result).toEqual({ id: 'plan-id-1' });

    const [planId, remaining, completedSteps, progress] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(planId).toBe('plan-id-1');
    expect(remaining).toEqual({});
    expect(progress).toBe(1);
    // Existing completed steps should remain unchanged
    expect(completedSteps.core_documents).toHaveLength(1);
    expect(completedSteps.core_documents[0]).toMatchObject({
      name: 'Valid passport',
      checked: true,
    });
  });

  it('should migrate steps from multiple categories correctly', async () => {
    const plan = makePlan({
      steps_remaining: {
        cat_a: [
          { name: 'Step A1', checked: false },
          { name: 'Step A2', checked: false },
        ],
        cat_b: [{ name: 'Step B1', checked: false }],
      },
      steps_completed: {
        cat_a: [{ name: 'Step A0', checked: true }],
      },
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    await service.completeAllSteps(mockSession, 'plan-id-1');

    const [, remaining, completedSteps, progress] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(remaining).toEqual({});
    expect(progress).toBe(1);

    // cat_a: existing completed step + 2 migrated steps
    expect(completedSteps.cat_a).toHaveLength(3);
    expect(completedSteps.cat_a[0]).toMatchObject({
      name: 'Step A0',
      checked: true,
    });
    expect(completedSteps.cat_a[1]).toMatchObject({
      name: 'Step A1',
      checked: true,
    });
    expect(completedSteps.cat_a[2]).toMatchObject({
      name: 'Step A2',
      checked: true,
    });

    // cat_b: 1 migrated step
    expect(completedSteps.cat_b).toHaveLength(1);
    expect(completedSteps.cat_b[0]).toMatchObject({
      name: 'Step B1',
      checked: true,
    });
  });
});

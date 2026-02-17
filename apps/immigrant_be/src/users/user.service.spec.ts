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
      { name: 'Valid passport', required: true, priority: 1, notes: '', checked: false },
      { name: 'Birth certificate', required: true, priority: 2, notes: '', checked: false },
    ],
    health_and_character: [
      { name: 'Police check', required: true, priority: 1, notes: '', checked: false },
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
      category: 'core_documents',
      step_name: 'Valid passport',
      completed: true,
    };

    await expect(
      service.markStep(mockSession, 'plan-id-1', dto),
    ).rejects.toThrow(NotFoundException);

    expect(repository.updatePlanStepProgress).not.toHaveBeenCalled();
  });

  // ── Mark as completed ─────────────────────────────────────

  it('should move a step from remaining to completed and set checked=true', async () => {
    const plan = makePlan();
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Valid passport',
      completed: true,
    };

    const result = await service.markStep(mockSession, 'plan-id-1', dto);

    expect(result).toEqual({ id: 'plan-id-1' });

    const [planId, remaining, completedSteps] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(planId).toBe('plan-id-1');
    // Step should have been removed from remaining
    expect(
      (remaining.core_documents as any[]).find((s) => s.name === 'Valid passport'),
    ).toBeUndefined();
    // Step should appear in completedSteps with checked=true
    const movedStep = (completedSteps.core_documents as any[]).find(
      (s) => s.name === 'Valid passport',
    );
    expect(movedStep).toBeDefined();
    expect(movedStep.checked).toBe(true);
  });

  it('should throw NotFoundException when step is not found in remaining', async () => {
    const plan = makePlan();
    repository.getUserPlanRaw.mockResolvedValue(plan);

    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Nonexistent step',
      completed: true,
    };

    await expect(
      service.markStep(mockSession, 'plan-id-1', dto),
    ).rejects.toThrow(NotFoundException);

    expect(repository.updatePlanStepProgress).not.toHaveBeenCalled();
  });

  // ── Mark as remaining ─────────────────────────────────────

  it('should move a step from completed to remaining and set checked=false', async () => {
    const plan = makePlan({
      steps_remaining: {
        core_documents: [
          { name: 'Birth certificate', required: true, priority: 2, notes: '', checked: false },
        ],
      },
      steps_completed: {
        core_documents: [
          { name: 'Valid passport', required: true, priority: 1, notes: '', checked: true },
        ],
      },
      progress: 0.5,
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Valid passport',
      completed: false,
    };

    const result = await service.markStep(mockSession, 'plan-id-1', dto);

    expect(result).toEqual({ id: 'plan-id-1' });

    const [planId, remaining, completedSteps] =
      repository.updatePlanStepProgress.mock.calls[0];

    expect(planId).toBe('plan-id-1');
    // Step should appear in remaining with checked=false
    const movedStep = (remaining.core_documents as any[]).find(
      (s) => s.name === 'Valid passport',
    );
    expect(movedStep).toBeDefined();
    expect(movedStep.checked).toBe(false);
    // Step should have been removed from completed
    expect(
      (completedSteps.core_documents as any[]).find((s) => s.name === 'Valid passport'),
    ).toBeUndefined();
  });

  it('should throw NotFoundException when step is not found in completed', async () => {
    const plan = makePlan({
      steps_remaining: {},
      steps_completed: {
        core_documents: [
          { name: 'Birth certificate', required: true, priority: 2, notes: '', checked: true },
        ],
      },
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);

    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Nonexistent step',
      completed: false,
    };

    await expect(
      service.markStep(mockSession, 'plan-id-1', dto),
    ).rejects.toThrow(NotFoundException);

    expect(repository.updatePlanStepProgress).not.toHaveBeenCalled();
  });

  // ── Progress calculation ──────────────────────────────────

  it('should calculate progress as 0 when no steps exist', async () => {
    const plan = makePlan({
      steps_remaining: {},
      steps_completed: {
        core_documents: [
          { name: 'Valid passport', required: true, priority: 1, notes: '', checked: true },
        ],
      },
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    // Move the only completed step back to remaining → total stays 1, completed=0
    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Valid passport',
      completed: false,
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(0);
  });

  it('should calculate progress as 1.0 when all steps are completed', async () => {
    const plan = makePlan({
      steps_remaining: {
        core_documents: [
          { name: 'Valid passport', required: true, priority: 1, notes: '', checked: false },
        ],
      },
      steps_completed: {},
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      category: 'core_documents',
      step_name: 'Valid passport',
      completed: true,
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(1);
  });

  it('should calculate partial progress correctly', async () => {
    // 1 remaining (Birth certificate) + 1 remaining (Police check) = 2 total, 0 completed
    // After completing Police check: 1 remaining + 1 completed = 2 total → progress = 1/2
    const plan = makePlan({
      steps_remaining: {
        core_documents: [
          { name: 'Birth certificate', required: true, priority: 2, notes: '', checked: false },
        ],
        health_and_character: [
          { name: 'Police check', required: true, priority: 1, notes: '', checked: false },
        ],
      },
      steps_completed: {},
    });
    repository.getUserPlanRaw.mockResolvedValue(plan);
    repository.updatePlanStepProgress.mockResolvedValue(undefined);

    const dto: MarkStepDto = {
      category: 'health_and_character',
      step_name: 'Police check',
      completed: true,
    };

    await service.markStep(mockSession, 'plan-id-1', dto);

    const progress = repository.updatePlanStepProgress.mock.calls[0][3];
    expect(progress).toBe(0.5);
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
    expect(completedSteps.core_documents[0]).toMatchObject({ name: 'Valid passport', checked: true });
    expect(completedSteps.core_documents[1]).toMatchObject({ name: 'Birth certificate', checked: true });

    // All steps from health_and_character should be in completedSteps with checked=true
    expect(completedSteps.health_and_character).toHaveLength(1);
    expect(completedSteps.health_and_character[0]).toMatchObject({ name: 'Police check', checked: true });
  });

  it('should be idempotent when steps_remaining is already empty', async () => {
    const plan = makePlan({
      steps_remaining: {},
      steps_completed: {
        core_documents: [
          { name: 'Valid passport', required: true, priority: 1, notes: '', checked: true },
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
    expect(completedSteps.core_documents[0]).toMatchObject({ name: 'Valid passport', checked: true });
  });

  it('should migrate steps from multiple categories correctly', async () => {
    const plan = makePlan({
      steps_remaining: {
        cat_a: [
          { name: 'Step A1', checked: false },
          { name: 'Step A2', checked: false },
        ],
        cat_b: [
          { name: 'Step B1', checked: false },
        ],
      },
      steps_completed: {
        cat_a: [
          { name: 'Step A0', checked: true },
        ],
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
    expect(completedSteps.cat_a[0]).toMatchObject({ name: 'Step A0', checked: true });
    expect(completedSteps.cat_a[1]).toMatchObject({ name: 'Step A1', checked: true });
    expect(completedSteps.cat_a[2]).toMatchObject({ name: 'Step A2', checked: true });

    // cat_b: 1 migrated step
    expect(completedSteps.cat_b).toHaveLength(1);
    expect(completedSteps.cat_b[0]).toMatchObject({ name: 'Step B1', checked: true });
  });
});

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CountryService } from '../countries/country.service';

const mockCountryService = {
  findOne: jest.fn(),
};

const mockSession = {
  user: { id: 'user-id-1' },
} as any;

const PLAN_ID = '123e4567-e89b-12d3-a456-426614174000';
const VISA_TYPE_ID = 'visa-type-id-1';

const step = (key: string, name: string, required = true) => ({
  key,
  name,
  notes: `Notes for ${key}`,
  checked: false,
  priority: '1',
  required,
});

/** Same keys in every language — that is the invariant the seed guarantees. */
const templateIn = (language: 'en' | 'pt') => ({
  core_documents:
    language === 'en'
      ? [
          step('valid-passport', 'Valid passport'),
          step('birth-certificate', 'Birth certificate'),
        ]
      : [
          step('valid-passport', 'Passaporte válido'),
          step('birth-certificate', 'Certidão de nascimento'),
        ],
});

const makePlan = (overrides: object = {}) => ({
  id: PLAN_ID,
  user_id: 'user-id-1',
  selected_visa_type_id: VISA_TYPE_ID,
  completed_step_keys: [],
  progress: 0,
  ...overrides,
});

const mockUserRepository = {
  getUserPlanRaw: jest.fn(),
  getUserPlanWithRelations: jest.fn(),
  updateCompletedStepKeys: jest.fn(),
  updatePlan: jest.fn(),
  resetPlanSteps: jest.fn(),
  createUserPlan: jest.fn(),
  getAllUserPlans: jest.fn(),
  selectVisaType: jest.fn(),
  getVisaStepsByRecommendation: jest.fn(),
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

describe('UserService — plan steps', () => {
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

  describe('updateSteps', () => {
    it('throws when the plan does not belong to the user', async () => {
      repository.getUserPlanRaw.mockResolvedValue(null);

      await expect(
        service.updateSteps(mockSession, PLAN_ID, {
          completed_step_keys: [],
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('rejects a plan with no visa type — there is nothing to complete', async () => {
      repository.getUserPlanRaw.mockResolvedValue(
        makePlan({ selected_visa_type_id: null }),
      );

      await expect(
        service.updateSteps(mockSession, PLAN_ID, {
          completed_step_keys: ['valid-passport'],
        }),
      ).rejects.toThrow(BadRequestException);
      expect(repository.updateCompletedStepKeys).not.toHaveBeenCalled();
    });

    it('persists the keys and the progress over required steps', async () => {
      repository.getUserPlanRaw.mockResolvedValue(makePlan());
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      const result = await service.updateSteps(mockSession, PLAN_ID, {
        completed_step_keys: ['valid-passport'],
      });

      expect(repository.updateCompletedStepKeys).toHaveBeenCalledWith(
        PLAN_ID,
        ['valid-passport'],
        0.5,
      );
      expect(result).toEqual({ id: PLAN_ID, progress: 0.5 });
    });

    it('discards a key the visa type does not declare', async () => {
      repository.getUserPlanRaw.mockResolvedValue(makePlan());
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      await service.updateSteps(mockSession, PLAN_ID, {
        completed_step_keys: ['valid-passport', 'key-from-another-visa-type'],
      });

      expect(repository.updateCompletedStepKeys).toHaveBeenCalledWith(
        PLAN_ID,
        ['valid-passport'],
        0.5,
      );
    });
  });

  describe('completeAllSteps', () => {
    it('ticks every key of the template and lands on 1', async () => {
      repository.getUserPlanRaw.mockResolvedValue(makePlan());
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      const result = await service.completeAllSteps(mockSession, PLAN_ID);

      expect(repository.updateCompletedStepKeys).toHaveBeenCalledWith(
        PLAN_ID,
        ['valid-passport', 'birth-certificate'],
        1,
      );
      expect(result.progress).toBe(1);
    });
  });

  describe('updatePlan', () => {
    it('renames a plan the user owns', async () => {
      repository.getUserPlanRaw.mockResolvedValue(makePlan());
      repository.updatePlan.mockResolvedValue(
        makePlan({ name: 'Mudança para Portugal' }),
      );

      const result = await service.updatePlan(mockSession, PLAN_ID, {
        name: 'Mudança para Portugal',
      });

      expect(repository.updatePlan).toHaveBeenCalledWith(PLAN_ID, {
        name: 'Mudança para Portugal',
      });
      expect(result).toMatchObject({ name: 'Mudança para Portugal' });
    });

    it('refuses a plan that belongs to someone else', async () => {
      // getUserPlanRaw filters by user_id, so "not found" and "not yours" are
      // the same answer here — and they must be, or the 404 would leak which
      // UUIDs exist. The repository update is keyed by id alone, so skipping
      // this check would let a guessed UUID rename a stranger's plan.
      repository.getUserPlanRaw.mockResolvedValue(null);

      await expect(
        service.updatePlan(mockSession, PLAN_ID, { name: 'Sequestrado' }),
      ).rejects.toThrow(NotFoundException);
      expect(repository.updatePlan).not.toHaveBeenCalled();
    });
  });

  describe('selectVisaType', () => {
    it('clears the progress — the previous keys belong to another step list', async () => {
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      await service.selectVisaType(mockSession, PLAN_ID, VISA_TYPE_ID);

      expect(repository.selectVisaType).toHaveBeenCalledWith(
        mockSession,
        PLAN_ID,
        VISA_TYPE_ID,
      );
      expect(repository.resetPlanSteps).toHaveBeenCalledWith(PLAN_ID);
    });

    it('throws when the visa type has no steps at all', async () => {
      repository.getVisaStepsByRecommendation.mockResolvedValue(null);

      await expect(
        service.selectVisaType(mockSession, PLAN_ID, VISA_TYPE_ID),
      ).rejects.toThrow(NotFoundException);
      expect(repository.selectVisaType).not.toHaveBeenCalled();
    });
  });

  describe('getUserPlan', () => {
    const relations = (plan: object) => ({
      data: {
        ...makePlan(plan),
        suggestion: null,
        country: null,
        user: null,
        selected_visa_type: null,
        documents: [],
        selected_suggestion: null,
        status: 'draft',
        name: null,
        notes: null,
        description: null,
        suggestion_id: null,
        country_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      visaTypes: [],
    });

    it('resolves the step text into the requested language', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(
        relations({ completed_step_keys: ['valid-passport'] }),
      );
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('pt'),
      });

      const plan = await service.getUserPlan(mockSession, PLAN_ID, 'pt');

      expect(plan.language).toBe('pt');
      expect(plan.steps.core_documents[0]).toMatchObject({
        key: 'valid-passport',
        name: 'Passaporte válido',
        completed: true,
      });
    });

    it('keeps the same keys completed whatever the language', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(
        relations({ completed_step_keys: ['birth-certificate'] }),
      );
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      const plan = await service.getUserPlan(mockSession, PLAN_ID, 'en');

      expect(
        plan.steps.core_documents.filter((s) => s.completed).map((s) => s.key),
      ).toEqual(['birth-certificate']);
    });

    it('falls back to en — never to pt — when the language has no row', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(relations({}));
      repository.getVisaStepsByRecommendation
        .mockResolvedValueOnce(null) // es
        .mockResolvedValueOnce({ steps: templateIn('en') }); // en fallback

      const plan = await service.getUserPlan(mockSession, PLAN_ID, 'es');

      expect(plan.language).toBe('en');
      expect(plan.steps.core_documents[0].name).toBe('Valid passport');
      expect(repository.getVisaStepsByRecommendation).toHaveBeenLastCalledWith(
        VISA_TYPE_ID,
        'en',
      );
    });

    it('treats an unsupported locale as the fallback instead of failing', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(relations({}));
      repository.getVisaStepsByRecommendation.mockResolvedValue({
        steps: templateIn('en'),
      });

      const plan = await service.getUserPlan(mockSession, PLAN_ID, 'klingon');

      expect(plan.language).toBe('en');
      expect(repository.getVisaStepsByRecommendation).toHaveBeenCalledWith(
        VISA_TYPE_ID,
        'en',
      );
    });

    it('returns no steps when no visa type has been picked yet', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(
        relations({ selected_visa_type_id: null }),
      );

      const plan = await service.getUserPlan(mockSession, PLAN_ID, 'pt');

      expect(plan.steps).toEqual({});
      expect(repository.getVisaStepsByRecommendation).not.toHaveBeenCalled();
    });

    it('throws when the plan does not belong to the user', async () => {
      repository.getUserPlanWithRelations.mockResolvedValue(null);

      await expect(
        service.getUserPlan(mockSession, PLAN_ID, 'pt'),
      ).rejects.toThrow(NotFoundException);
    });

    it('rejects a malformed plan id before touching the database', async () => {
      await expect(
        service.getUserPlan(mockSession, 'not-a-uuid', 'pt'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.getUserPlanWithRelations).not.toHaveBeenCalled();
    });
  });

  /**
   * Feeds the dashboard's "active plans" section. See docs/DATA_SOURCES.md —
   * every value shown there comes from this call, so both the happy path and
   * the behaviour when the database is unreachable are pinned down here.
   */
  describe('getAllUserPlans', () => {
    it('returns the plans of the session user', async () => {
      const plans = [makePlan(), makePlan({ id: 'another-plan' })];
      repository.getAllUserPlans.mockResolvedValue(plans);

      await expect(service.getAllUserPlans(mockSession)).resolves.toBe(plans);
      expect(repository.getAllUserPlans).toHaveBeenCalledWith(mockSession);
    });

    it('returns an empty list for a user with no plans', async () => {
      repository.getAllUserPlans.mockResolvedValue([]);

      await expect(service.getAllUserPlans(mockSession)).resolves.toEqual([]);
    });

    /**
     * The failure has to propagate. Swallowing it would hand the dashboard an
     * empty list, which renders as "you have no plans" — indistinguishable from
     * the truth, and wrong.
     */
    it('propagates a failure of the source instead of returning empty', async () => {
      repository.getAllUserPlans.mockRejectedValue(
        new Error('connection refused'),
      );

      await expect(service.getAllUserPlans(mockSession)).rejects.toThrow(
        'connection refused',
      );
    });
  });
});

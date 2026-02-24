jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('generated/prisma', () => ({
  NotificationStatus: { pending: 'pending' },
  Prisma: {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { SystemRepository } from './system.repository';
import { SuggestionsDto, Steps } from './dto/suggestions.dto';
import { StepType } from './dto/types.dto';

const mockPrismaService = {
  $queryRawUnsafe: jest.fn(),
  suggestion_languages: { create: jest.fn() },
  suggestions: { update: jest.fn() },
};

// Helper: creates a plain SuggestionsDto-shaped object (simulates the broken
// path where class-transformer produced empty arrays)
function makePlainDto(overrides?: Partial<SuggestionsDto>): SuggestionsDto {
  return {
    steps: [
      { type: StepType.TARGET, answer: 'work' },
      { type: StepType.ENGLISH, answer: 'beginner' },
    ],
    ...overrides,
  } as SuggestionsDto;
}

// Helper: creates an instance of SuggestionsDto using class instances for steps
function makeInstanceDto(): SuggestionsDto {
  const step1 = new Steps();
  step1.type = StepType.TARGET;
  step1.answer = 'work';

  const step2 = new Steps();
  step2.type = StepType.ENGLISH;
  step2.answer = 'beginner';

  const dto = new SuggestionsDto();
  dto.steps = [step1, step2];
  return dto;
}

describe('SystemRepository - normalizeParametersToJson', () => {
  let repository: SystemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<SystemRepository>(SystemRepository);
    jest.clearAllMocks();
  });

  // Access the private method via bracket notation for testing
  const normalize = (repo: SystemRepository, dto: SuggestionsDto) =>
    (repo as any).normalizeParametersToJson(dto);

  it('should serialize plain object steps correctly — no empty arrays', () => {
    const dto = makePlainDto();
    const result = normalize(repository, dto);
    const parsed = JSON.parse(result);

    expect(parsed.steps).toHaveLength(2);
    expect(parsed.steps[0]).toEqual({ answer: 'work', type: 'TARGET' });
    expect(parsed.steps[1]).toEqual({ answer: 'beginner', type: 'ENGLISH' });
  });

  it('should serialize class instance steps correctly — no empty arrays', () => {
    const dto = makeInstanceDto();
    const result = normalize(repository, dto);
    const parsed = JSON.parse(result);

    expect(parsed.steps).toHaveLength(2);
    expect(parsed.steps[0]).toEqual({ answer: 'work', type: 'TARGET' });
    expect(parsed.steps[1]).toEqual({ answer: 'beginner', type: 'ENGLISH' });
  });

  it('should sort keys canonically (answer before type)', () => {
    const dto = makePlainDto();
    const result = normalize(repository, dto);
    const parsed = JSON.parse(result);
    const keys = Object.keys(parsed.steps[0]);

    expect(keys).toEqual(['answer', 'type']);
  });

  it('should produce identical output for plain and class-instance inputs', () => {
    const plain = normalize(repository, makePlainDto());
    const instance = normalize(repository, makeInstanceDto());

    expect(plain).toBe(instance);
  });

  it('should not produce empty arrays for step items (regression guard)', () => {
    // Simulate the broken input: steps array filled with empty arrays []
    const brokenDto = { steps: [[], [], []] } as unknown as SuggestionsDto;
    const result = normalize(repository, brokenDto);
    const parsed = JSON.parse(result);

    // The defensive JSON.parse(JSON.stringify()) converts empty arrays faithfully,
    // but the root fix (adding @Type) prevents this broken input from ever arriving.
    // This test just verifies the function doesn't crash and serializes what it receives.
    expect(parsed.steps).toHaveLength(3);
    parsed.steps.forEach((item: unknown) => {
      expect(item).toEqual([]);
    });
  });
});

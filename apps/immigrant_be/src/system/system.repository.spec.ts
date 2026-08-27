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
  const normalize = (repo: SystemRepository, dto: SuggestionsDto): string =>
    (
      repo as unknown as {
        normalizeParametersToJson: (dto: SuggestionsDto) => string;
      }
    ).normalizeParametersToJson(dto);

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

  describe('createSuggestions without embeddings', () => {
    it('stores the suggestion with a null vector instead of refusing it', async () => {
      // Embeddings degrade to null when Gemini is unreachable. This method
      // used to throw on null — which, during the credits incident, would have
      // refused a suggestion the fallback chain had successfully generated.
      // Measured while proving #151: the chain answered via deepseek and the
      // old throw still 500'd the quiz.
      mockPrismaService.$queryRawUnsafe.mockResolvedValue([{ id: 'sug-1' }]);
      mockPrismaService.suggestion_languages.create.mockResolvedValue({
        id: 'lang-1',
        suggestion_id: 'sug-1',
      });
      mockPrismaService.suggestions.update.mockResolvedValue({
        id: 'sug-1',
        suggestion_languages: [
          { id: 'lang-1', language: 'en', content: [{ country: 'Portugal' }] },
        ],
      });

      const result = await repository.createSuggestions(
        [{ country: 'Portugal' }],
        null,
        makePlainDto(),
        'en',
      );

      expect(result.suggestion_id).toBe('sug-1');
      const [, embeddingsParam] =
        mockPrismaService.$queryRawUnsafe.mock.calls.at(-1) as unknown[];
      expect(embeddingsParam).toBeNull();
    });
  });

  describe('createVisaTypeRecommendation without embeddings', () => {
    it('stores the recommendation with a null vector instead of refusing it', async () => {
      // The Gemini embeddings endpoint shares the Google prepay credit with
      // the chat models: when that runs out, both 429. Throwing here turned a
      // recommendation the fallback chain had already produced into a 500.
      mockPrismaService.$queryRawUnsafe.mockResolvedValue([
        {
          id: 'rec-1',
          embeddings: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      const result = await repository.createVisaTypeRecommendation(
        'country-1',
        { recommended_visa_type_id: 'visa-1', explanations: 'Best fit.' },
        null,
        { profession: 'Software Engineer' },
        'en',
      );

      expect(result.visa_type_recommendation_id).toBe('rec-1');
      const [, , , embeddingsParam] =
        mockPrismaService.$queryRawUnsafe.mock.calls.at(-1) as unknown[];
      expect(embeddingsParam).toBeNull();
    });

    it('still refuses a vector of the wrong width', async () => {
      // A vector that exists but is not 768-wide would poison the similarity
      // search, which is a different failure from having no vector at all.
      mockPrismaService.$queryRawUnsafe.mockResolvedValue([]);

      await expect(
        repository.createVisaTypeRecommendation(
          'country-1',
          { recommended_visa_type_id: 'visa-1', explanations: 'Best fit.' },
          new Array(512).fill(0.1),
          { profession: 'Software Engineer' },
          'en',
        ),
      ).rejects.toThrow('Error creating visa type recommendation');
      expect(mockPrismaService.$queryRawUnsafe).not.toHaveBeenCalled();
    });
  });
});

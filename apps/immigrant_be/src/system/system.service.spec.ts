jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('generated/prisma', () => ({
  Prisma: {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { SystemService } from './system.service';
import { GeminiService } from './gemini.service';
import { CountryService } from '../countries/country.service';
import { SystemRepository } from './system.repository';
import { SuggestionsDto } from './dto/suggestions.dto';
import { StepType } from './dto/types.dto';

const mockGeminiService = {
  generateSuggestions: jest.fn(),
  generateEmbeddings: jest.fn(),
  generateVisaSuggestion: jest.fn(),
};

const mockCountryService = {
  findAll: jest.fn(),
  findAllNames: jest.fn(),
  findOneByName: jest.fn(),
  getCountryById: jest.fn(),
};

const mockSystemRepository = {
  createSuggestions: jest.fn(),
  createSuggestionLanguages: jest.fn(),
  getRawSuggestionsWithParameters: jest.fn(),
  getRawSuggestionsWithEmbeddings: jest.fn(),
  getSuggestionAccordingToLanguage: jest.fn(),
  createVisaTypeRecommendation: jest.fn(),
  getBestVisaTypeRecommendation: jest.fn(),
};

const makeSteps = () => [
  { type: StepType.TARGET, answer: 'work' },
  { type: StepType.ENGLISH, answer: 'beginner' },
  { type: StepType.BUDGET, answer: '10000' },
];

const makeParameters = (): SuggestionsDto => ({
  steps: makeSteps() as any,
});

const geminiSuggestions = {
  suggestions: [
    {
      country: 'Canada',
      compatibility: 85,
      reasons: ['Strong job market'],
      cities: ['Toronto'],
      visa_options: ['Express Entry'],
      country_background: '',
      country_flag: '',
      country_id: '',
      investment_required: '',
      average_visa_processing_time: '6 months',
      job_market: 'High',
      education_quality: 'High',
      difficulty: 'Medium',
      health_care: 'High',
      languages: ['English', 'French'],
    },
  ],
};

describe('SystemService - createSuggestions', () => {
  let service: SystemService;
  let repository: typeof mockSystemRepository;
  let gemini: typeof mockGeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemService,
        { provide: GeminiService, useValue: mockGeminiService },
        { provide: CountryService, useValue: mockCountryService },
        { provide: SystemRepository, useValue: mockSystemRepository },
      ],
    }).compile();

    service = module.get<SystemService>(SystemService);
    repository = module.get(SystemRepository);
    gemini = module.get(GeminiService);

    jest.clearAllMocks();
    // O casamento tolerante varre a lista de nomes; sem isto os testes que
    // simulam "país não encontrado" quebrariam ao chegar na segunda tentativa.
    mockCountryService.findAllNames.mockResolvedValue([]);
  });

  // ── Casamento do nome do país ───────────────────────────────

  describe('getCountryDetails', () => {
    const germany = { id: 'de', name: 'Germany', flag: '🇩🇪' };

    it('acha pelo nome exato sem varrer a lista', async () => {
      mockCountryService.findOneByName.mockResolvedValue(germany);

      await expect(service.getCountryDetails('Germany')).resolves.toBe(germany);
      expect(mockCountryService.findAllNames).not.toHaveBeenCalled();
    });

    it('acha apesar de caixa e acento diferentes', async () => {
      // Primeira tentativa (exata) falha; a normalizada encontra.
      mockCountryService.findOneByName
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(germany);
      mockCountryService.findAllNames.mockResolvedValue([
        { name: 'Germany' },
        { name: 'France' },
      ]);

      await expect(service.getCountryDetails('  gErmany ')).resolves.toBe(
        germany,
      );
    });

    /**
     * O caso que o usuário viu: quiz em português devolve "Nova Zelândia", o
     * cadastro só tem "New Zealand", e antes isso falhava em silêncio — sem
     * log, o resultado chegava sem foto, sem bandeira e sem country_id, e o
     * plano criado a partir dele nascia sem tipos de visto.
     */
    it('devolve null e registra erro quando o nome vem traduzido', async () => {
      mockCountryService.findOneByName.mockResolvedValue(null);
      mockCountryService.findAllNames.mockResolvedValue([
        { name: 'New Zealand' },
      ]);
      const erro = jest
        .spyOn(service['logger'], 'error')
        .mockImplementation(() => undefined);

      await expect(service.getCountryDetails('Nova Zelândia')).resolves.toBeNull();
      expect(erro).toHaveBeenCalledWith(
        expect.stringContaining('Nova Zelândia'),
      );
    });
  });

  // ── Cache miss: new record ──────────────────────────────────

  it('should call createSuggestions with steps as proper objects (not empty arrays)', async () => {
    const parameters = makeParameters();

    repository.getRawSuggestionsWithParameters.mockResolvedValue(null);
    gemini.generateSuggestions.mockResolvedValue(geminiSuggestions);
    gemini.generateEmbeddings.mockResolvedValue(new Array(768).fill(0.1));
    mockCountryService.findOneByName.mockResolvedValue(null);
    repository.createSuggestions.mockResolvedValue({ suggestion_id: 'new-id' });

    const dto = { steps: makeSteps() as any, parameters, language: 'en' };
    await service.createSuggestions(dto);

    expect(repository.createSuggestions).toHaveBeenCalledTimes(1);

    const [, , savedParameters] = repository.createSuggestions.mock.calls[0];

    // steps must be an array of objects with type + answer — never empty arrays
    expect(savedParameters.steps).toHaveLength(3);
    savedParameters.steps.forEach((step: Record<string, unknown>) => {
      expect(step).toHaveProperty('type');
      expect(step).toHaveProperty('answer');
      expect(typeof step.type).toBe('string');
      expect(typeof step.answer).toBe('string');
    });

    expect(savedParameters.steps[0]).toMatchObject({
      type: 'TARGET',
      answer: 'work',
    });
    expect(savedParameters.steps[1]).toMatchObject({
      type: 'ENGLISH',
      answer: 'beginner',
    });
    expect(savedParameters.steps[2]).toMatchObject({
      type: 'BUDGET',
      answer: '10000',
    });
  });

  it('should return cached suggestions and skip Gemini when parameters match', async () => {
    const parameters = makeParameters();
    const cachedSuggestion = { id: 'cached-id', parameters: {} };
    const cachedResponse = {
      suggestion_id: 'cached-id',
      suggestions: geminiSuggestions.suggestions,
    };

    repository.getRawSuggestionsWithParameters.mockResolvedValue(
      cachedSuggestion,
    );
    repository.getSuggestionAccordingToLanguage.mockResolvedValue(
      cachedResponse,
    );

    const dto = { steps: makeSteps() as any, parameters, language: 'en' };
    const result = await service.createSuggestions(dto);

    expect(gemini.generateSuggestions).not.toHaveBeenCalled();
    expect(gemini.generateEmbeddings).not.toHaveBeenCalled();
    expect(repository.createSuggestions).not.toHaveBeenCalled();
    expect(result).toEqual(cachedResponse);
  });

  it('should call Gemini and create suggestions when no cache exists', async () => {
    const parameters = makeParameters();

    repository.getRawSuggestionsWithParameters.mockResolvedValue(null);
    gemini.generateSuggestions.mockResolvedValue(geminiSuggestions);
    gemini.generateEmbeddings.mockResolvedValue(new Array(768).fill(0.1));
    mockCountryService.findOneByName.mockResolvedValue(null);
    repository.createSuggestions.mockResolvedValue({ suggestion_id: 'new-id' });

    const dto = { steps: makeSteps() as any, parameters, language: 'en' };
    const result = await service.createSuggestions(dto);

    expect(gemini.generateSuggestions).toHaveBeenCalledTimes(1);
    expect(gemini.generateEmbeddings).toHaveBeenCalledTimes(1);
    expect(repository.createSuggestions).toHaveBeenCalledTimes(1);
    expect(result.suggestion_id).toBe('new-id');
  });
});

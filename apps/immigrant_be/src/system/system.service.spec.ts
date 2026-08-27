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
  findOne: jest.fn(),
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

  // ── Montagem do prompt a partir dos passos ──────────────────

  describe('getUserAnswerBasedOnStepType', () => {
    it('traduz cada passo do quiz para uma frase do prompt', () => {
      const frases = Object.values(StepType).map((type) =>
        service.getUserAnswerBasedOnStepType({ type, answer: 'X' } as never),
      );

      // Nenhum passo pode cair no vazio: um tipo sem template sai como string
      // vazia e some do prompt em silêncio.
      expect(frases.filter((f) => f === '')).toEqual([]);
    });

    /**
     * O passo que motivou esta issue. O prompt de match já manda a IA
     * considerar "vistos ou oportunidades de residência", o que é impossível
     * sem saber o passaporte: elegibilidade, acordos e tempo de processamento
     * são todos função dele.
     */
    it('leva a nacionalidade para o prompt pedindo avaliação de elegibilidade', () => {
      const frase = service.getUserAnswerBasedOnStepType({
        type: StepType.NATIONALITY,
        answer: 'Brazilian',
      } as never);

      expect(frase).toContain('Brazilian');
      expect(frase).toMatch(/visa eligibility/i);
    });

    it('devolve string vazia para um tipo fora do enum', () => {
      const frase = service.getUserAnswerBasedOnStepType({
        type: 'INVENTADO',
        answer: 'X',
      } as never);

      expect(frase).toBe('');
    });
  });

  // ── Reidratação do snapshot do país ─────────────────────────

  describe('getSuggestionAccordingToLanguage', () => {
    const armazenada = (extras = {}) => ({
      suggestion_id: 's1',
      suggestions: [
        {
          country: 'Malta',
          country_label: 'Malta',
          country_id: 'mt',
          country_flag: '🇲🇹',
          // Vazio porque na geração o país ainda não tinha imagem.
          country_background: '',
          investment_required: 'valor antigo',
          compatibility: 80,
          reasons: ['motivo da IA'],
          cities: ['Valletta'],
          ...extras,
        },
      ],
    });

    const malta = {
      id: 'mt',
      name: 'Malta',
      flag: '🇲🇹',
      background_image: 'https://cdn/malta.jpg',
      translations: [{ language: 'pt', investment_required: 'valor atual' }],
    };

    /**
     * O caso de produção: `country_id` e bandeira preenchidos, foto vazia,
     * porque o cadastro ganhou a imagem depois da geração.
     */
    it('preenche a foto que ficou vazia no snapshot', async () => {
      repository.getSuggestionAccordingToLanguage.mockResolvedValue(
        armazenada(),
      );
      mockCountryService.findOne.mockResolvedValue(malta);

      const r = await service.getSuggestionAccordingToLanguage('s1', 'pt');

      expect(r?.suggestions[0].country_background).toBe(
        'https://cdn/malta.jpg',
      );
      expect(r?.suggestions[0].investment_required).toBe('valor atual');
    });

    it('não toca no que foi escrito pela IA', async () => {
      repository.getSuggestionAccordingToLanguage.mockResolvedValue(
        armazenada(),
      );
      mockCountryService.findOne.mockResolvedValue(malta);

      const r = await service.getSuggestionAccordingToLanguage('s1', 'pt');

      // Motivos, cidades, compatibilidade e o rótulo localizado são do modelo,
      // não do cadastro — reidratar não pode reescrevê-los.
      expect(r?.suggestions[0].reasons).toEqual(['motivo da IA']);
      expect(r?.suggestions[0].cities).toEqual(['Valletta']);
      expect(r?.suggestions[0].compatibility).toBe(80);
      expect(r?.suggestions[0].country_label).toBe('Malta');
    });

    it('devolve o snapshot intacto quando o país não é mais encontrado', async () => {
      repository.getSuggestionAccordingToLanguage.mockResolvedValue(
        armazenada(),
      );
      mockCountryService.findOne.mockResolvedValue(null);

      const r = await service.getSuggestionAccordingToLanguage('s1', 'pt');

      expect(r?.suggestions[0].country_flag).toBe('🇲🇹');
      expect(r?.suggestions[0].investment_required).toBe('valor antigo');
    });

    it('não consulta o cadastro quando não há country_id', async () => {
      repository.getSuggestionAccordingToLanguage.mockResolvedValue(
        armazenada({ country_id: '' }),
      );

      await service.getSuggestionAccordingToLanguage('s1', 'pt');

      expect(mockCountryService.findOne).not.toHaveBeenCalled();
    });

    it('não quebra quando não existe sugestão gravada', async () => {
      repository.getSuggestionAccordingToLanguage.mockResolvedValue(null);

      await expect(
        service.getSuggestionAccordingToLanguage('s1', 'pt'),
      ).resolves.toBeNull();
    });
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

      await expect(
        service.getCountryDetails('Nova Zelândia'),
      ).resolves.toBeNull();
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
    // `freedom_of_movement` is recomputed on read rather than served from the
    // snapshot, so a row written before the field existed comes back with it.
    expect(result).toEqual({
      ...cachedResponse,
      suggestions: cachedResponse.suggestions.map((suggestion) => ({
        ...suggestion,
        freedom_of_movement: false,
      })),
    });
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

  describe('getSelectedBestVisaType without embeddings', () => {
    // The embeddings endpoint runs on the same Google prepay credit as the
    // chat models, so it 429s in exactly the incident the fallback chain
    // exists to survive. A recommendation the chain already produced must
    // reach the user even when the vector for it does not exist.
    it('returns and persists the recommendation when embeddings are null', async () => {
      const visaRecommendation = {
        recommended_visa_type_id: 'visa-type-1',
        explanations: 'Best fit for a software engineer moving for work.',
      };

      mockCountryService.getCountryById.mockResolvedValue({
        id: 'country-1',
        immigration_visa_types: [{ id: 'visa-type-1', category: 'Work' }],
      });
      gemini.generateEmbeddings.mockResolvedValue(null);
      repository.getBestVisaTypeRecommendation.mockResolvedValue(null);
      gemini.generateVisaSuggestion.mockResolvedValue(visaRecommendation);
      repository.createVisaTypeRecommendation.mockResolvedValue({
        visa_type_recommendation_id: 'rec-1',
      });

      const result = await service.getSelectedBestVisaType(
        { profession: 'Software Engineer' },
        'country-1',
        'en',
      );

      expect(result).toEqual({
        id: 'visa-type-1',
        explanations: 'Best fit for a software engineer moving for work.',
        freedom_of_movement: false,
      });
      expect(repository.createVisaTypeRecommendation).toHaveBeenCalledWith(
        'country-1',
        visaRecommendation,
        null,
        { profession: 'Software Engineer' },
        'en',
      );
    });
  });

  // ── Livre circulação UE/EEE/Suíça ───────────────────────────

  describe('freedom of movement', () => {
    const spain = {
      id: 'es',
      name: 'Spain',
      iso2: 'ES',
      flag: '🇪🇸',
      background_image: '',
      immigration_visa_types: [{ id: 'visa-type-1', category: 'Work Visa' }],
    };
    const brazil = {
      id: 'br',
      name: 'Brazil',
      iso2: 'BR',
      flag: '🇧🇷',
      background_image: '',
    };

    const recommendation = {
      recommended_visa_type_id: 'visa-type-1',
      explanations: 'No visa is required; you register your residence.',
    };

    const arrangeRecommendation = () => {
      mockCountryService.getCountryById.mockResolvedValue(spain);
      gemini.generateEmbeddings.mockResolvedValue(null);
      repository.getBestVisaTypeRecommendation.mockResolvedValue(null);
      gemini.generateVisaSuggestion.mockResolvedValue(recommendation);
      repository.createVisaTypeRecommendation.mockResolvedValue({
        visa_type_recommendation_id: 'rec-1',
      });
    };

    /**
     * O bug: um português mudando para a Espanha recebia "Residence Visa
     * (Type D)". Não existe visto a pedir — a livre circulação dispensa, e o
     * que resta é registro.
     */
    it('marks the recommendation and instructs the prompt for PT to ES', async () => {
      arrangeRecommendation();

      const result = await service.getSelectedBestVisaType(
        { nationality: 'PT' },
        'es',
        'en',
      );

      expect(result?.freedom_of_movement).toBe(true);
      // A prosa não pode contradizer o booleano: a mesma decisão vai para o
      // prompt como instrução.
      expect(gemini.generateVisaSuggestion).toHaveBeenCalledWith(
        { nationality: 'PT' },
        spain.immigration_visa_types,
        'en',
        { freedomOfMovement: true },
      );
    });

    it('does not mark it for BR to ES', async () => {
      arrangeRecommendation();

      const result = await service.getSelectedBestVisaType(
        { nationality: 'BR' },
        'es',
        'en',
      );

      expect(result?.freedom_of_movement).toBe(false);
      expect(gemini.generateVisaSuggestion).toHaveBeenCalledWith(
        { nationality: 'BR' },
        spain.immigration_visa_types,
        'en',
        { freedomOfMovement: false },
      );
    });

    /**
     * O cache é chaveado por (country_id, parameters, language), e
     * `parameters` é o DTO inteiro — nacionalidade incluída. Uma linha
     * gravada para um passaporte não pode ser servida para outro; o que este
     * teste garante é que a resposta em cache também traz o campo, mesmo
     * tendo sido gravada antes de ele existir.
     */
    it('carries the flag on a cache hit too', async () => {
      mockCountryService.getCountryById.mockResolvedValue(spain);
      gemini.generateEmbeddings.mockResolvedValue(null);
      repository.getBestVisaTypeRecommendation.mockResolvedValue({
        gemini_response: recommendation,
      });

      const result = await service.getSelectedBestVisaType(
        { nationality: 'PT' },
        'es',
        'en',
      );

      expect(result?.freedom_of_movement).toBe(true);
      expect(gemini.generateVisaSuggestion).not.toHaveBeenCalled();
    });

    it('marks only the EU suggestions of an EU passport in the quiz', async () => {
      repository.getRawSuggestionsWithParameters.mockResolvedValue(null);
      gemini.generateSuggestions.mockResolvedValue({
        suggestions: [
          { ...geminiSuggestions.suggestions[0], country: 'Spain' },
          { ...geminiSuggestions.suggestions[0], country: 'Brazil' },
        ],
      });
      gemini.generateEmbeddings.mockResolvedValue(new Array(768).fill(0.1));
      mockCountryService.findOneByName.mockImplementation((name: string) =>
        Promise.resolve(name === 'Spain' ? spain : brazil),
      );
      repository.createSuggestions.mockResolvedValue({
        suggestion_id: 'new-id',
      });

      const steps = [
        ...makeSteps(),
        { type: StepType.NATIONALITY, answer: 'PT' },
      ];
      const result = await service.createSuggestions({
        steps: steps as any,
        parameters: { steps } as any,
        language: 'en',
      });

      expect(
        result.suggestions.map((s) => [s.country, s.freedom_of_movement]),
      ).toEqual([
        ['Spain', true],
        ['Brazil', false],
      ]);
    });

    it('marks nothing when the quiz carried no nationality step', async () => {
      repository.getRawSuggestionsWithParameters.mockResolvedValue(null);
      gemini.generateSuggestions.mockResolvedValue({
        suggestions: [
          { ...geminiSuggestions.suggestions[0], country: 'Spain' },
        ],
      });
      gemini.generateEmbeddings.mockResolvedValue(new Array(768).fill(0.1));
      mockCountryService.findOneByName.mockResolvedValue(spain);
      repository.createSuggestions.mockResolvedValue({
        suggestion_id: 'new-id',
      });

      const result = await service.createSuggestions({
        steps: makeSteps() as any,
        parameters: makeParameters(),
        language: 'en',
      });

      expect(result.suggestions[0].freedom_of_movement).toBe(false);
    });
  });
});

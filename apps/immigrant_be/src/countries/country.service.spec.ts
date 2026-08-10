jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryRepository } from './country.repository';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpsertCountryTranslationDto } from './dto/upsert-country-translation.dto';

const mockTranslation = (language: string) => ({
  language,
  description: `Description in ${language}`,
  benefits: ['Universal healthcare'],
  challenges: ['Cold weather'],
  processing_time: '6-12 months',
  investment_required: 'CAD 13,000 in proof of funds',
  language_requirement: 'English or French (CLB 7+)',
});

const buildCreateDto = (
  languages: string[] = ['en', 'pt', 'es'],
): CreateCountryDto => ({
  name: 'Canada',
  flag: 'https://example.com/canada-flag.png',
  region: 'North America',
  difficulty: 'Medium',
  difficulty_score: 6,
  visa_options: ['Express Entry'],
  job_market: 'Strong in tech and healthcare',
  popular_cities: ['Toronto'],
  background_image: 'https://example.com/canada-background.png',
  translations: languages.map(mockTranslation),
});

const mockCountry = { id: 'country-id-1', name: 'Canada' };

const mockCountryRepository = {
  create: jest.fn(),
  findAllNames: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findOneByName: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  upsertTranslation: jest.fn(),
  getVisaTypes: jest.fn(),
  getById: jest.fn(),
};

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: CountryRepository, useValue: mockCountryRepository },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  describe('create', () => {
    it('creates the country when the fallback language is present', async () => {
      const dto = buildCreateDto();
      mockCountryRepository.create.mockResolvedValue(mockCountry);

      await expect(service.create(dto)).resolves.toEqual(mockCountry);
      expect(mockCountryRepository.create).toHaveBeenCalledWith(dto);
    });

    it('accepts a country translated only into the fallback language', async () => {
      mockCountryRepository.create.mockResolvedValue(mockCountry);

      await expect(service.create(buildCreateDto(['en']))).resolves.toEqual(
        mockCountry,
      );
    });

    it('rejects a country without the fallback language', async () => {
      await expect(
        service.create(buildCreateDto(['pt', 'es'])),
      ).rejects.toThrow(BadRequestException);
      expect(mockCountryRepository.create).not.toHaveBeenCalled();
    });

    it('rejects duplicate languages before Prisma hits the unique constraint', async () => {
      await expect(
        service.create(buildCreateDto(['en', 'en'])),
      ).rejects.toThrow(BadRequestException);
      expect(mockCountryRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('upsertTranslation', () => {
    const dto: UpsertCountryTranslationDto = {
      description: 'Descrição em português',
      benefits: ['Saúde universal'],
      challenges: ['Frio intenso'],
      processing_time: '6-12 meses',
      investment_required: 'CAD 13.000 em comprovação de fundos',
      language_requirement: 'Inglês ou francês (CLB 7+)',
    };

    it('upserts the translation for a supported language', async () => {
      const saved = { id: 'translation-id-1', language: 'pt', ...dto };
      mockCountryRepository.findOne.mockResolvedValue(mockCountry);
      mockCountryRepository.upsertTranslation.mockResolvedValue(saved);

      await expect(
        service.upsertTranslation('country-id-1', 'pt', dto),
      ).resolves.toEqual(saved);
      expect(mockCountryRepository.upsertTranslation).toHaveBeenCalledWith(
        'country-id-1',
        'pt',
        dto,
      );
    });

    it('rejects an unsupported language without touching the database', async () => {
      await expect(
        service.upsertTranslation('country-id-1', 'fr', dto),
      ).rejects.toThrow(BadRequestException);
      expect(mockCountryRepository.findOne).not.toHaveBeenCalled();
      expect(mockCountryRepository.upsertTranslation).not.toHaveBeenCalled();
    });

    it('throws when the country does not exist', async () => {
      mockCountryRepository.findOne.mockResolvedValue(null);

      await expect(
        service.upsertTranslation('missing-id', 'pt', dto),
      ).rejects.toThrow(NotFoundException);
      expect(mockCountryRepository.upsertTranslation).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('throws when the country does not exist', async () => {
      mockCountryRepository.findOne.mockResolvedValue(null);

      await expect(service.update('missing-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('throws when the country does not exist', async () => {
      mockCountryRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('missing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  /**
   * Feeds the dashboard's curated destinations. See docs/DATA_SOURCES.md — the
   * ordering and the values shown come straight from this record, so an empty
   * list must mean "no countries", never "the query failed".
   */
  describe('findAll', () => {
    it('returns the countries with their translations', async () => {
      const countries = [
        {
          ...mockCountry,
          flag: 'https://example.com/canada-flag.png',
          region: 'North America',
          difficulty: 'Medium',
          difficulty_score: 6,
          translations: [mockTranslation('en')],
        },
      ];
      mockCountryRepository.findAll.mockResolvedValue(countries);

      await expect(service.findAll()).resolves.toBe(countries);
      expect(mockCountryRepository.findAll).toHaveBeenCalled();
    });

    it('returns an empty list when there is no country registered', async () => {
      mockCountryRepository.findAll.mockResolvedValue([]);

      await expect(service.findAll()).resolves.toEqual([]);
    });

    it('propagates a failure of the source instead of returning empty', async () => {
      mockCountryRepository.findAll.mockRejectedValue(
        new Error('connection refused'),
      );

      await expect(service.findAll()).rejects.toThrow('connection refused');
    });
  });
});

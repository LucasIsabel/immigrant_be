jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AiRouterService } from '@app/ai';
import { VisaStepsService } from './visa-steps.service';
import { VisaStepsRepository } from './visa-steps.repository';

const step = (key: string, name: string) => ({
  key,
  name,
  notes: '',
  checked: false,
  priority: '1',
  required: true,
});

const ROW_ID = 'row-pt';
const VISA_TYPE_ID = 'visa-type-1';

const ptRow = {
  id: ROW_ID,
  visa_type_id: VISA_TYPE_ID,
  language: 'pt',
  steps: { core_documents: [step('valid-passport', 'Passaporte válido')] },
};

const enRow = {
  id: 'row-en',
  visa_type_id: VISA_TYPE_ID,
  language: 'en',
  steps: { core_documents: [step('valid-passport', 'Valid passport')] },
};

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockAiRouter = {
  generateJson: jest.fn(),
};

describe('VisaStepsService — key parity on update', () => {
  let service: VisaStepsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisaStepsService,
        { provide: VisaStepsRepository, useValue: mockRepository },
        { provide: AiRouterService, useValue: mockAiRouter },
      ],
    }).compile();

    service = module.get<VisaStepsService>(VisaStepsService);
  });

  it('accepts an edit that only changes the text', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);
    mockRepository.findAll.mockResolvedValue([ptRow, enRow]);

    await service.update(ROW_ID, {
      steps: {
        core_documents: [step('valid-passport', 'Passaporte em validade')],
      },
    } as any);

    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('rejects a step with no key — progress is stored against it', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);

    await expect(
      service.update(ROW_ID, {
        steps: { core_documents: [{ name: 'Passaporte', notes: '' }] },
      } as any),
    ).rejects.toThrow(BadRequestException);
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('rejects a renamed key — the other languages would drift', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);
    mockRepository.findAll.mockResolvedValue([ptRow, enRow]);

    await expect(
      service.update(ROW_ID, {
        steps: { core_documents: [step('passaporte-valido', 'Passaporte')] },
      } as any),
    ).rejects.toThrow(BadRequestException);
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('rejects a dropped key', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);
    mockRepository.findAll.mockResolvedValue([
      ptRow,
      {
        ...enRow,
        steps: {
          core_documents: [
            step('valid-passport', 'Valid passport'),
            step('birth-certificate', 'Birth certificate'),
          ],
        },
      },
    ]);

    await expect(
      service.update(ROW_ID, {
        steps: { core_documents: [step('valid-passport', 'Passaporte')] },
      } as any),
    ).rejects.toThrow(/Missing: birth-certificate/);
  });

  it('allows the edit when this is the only language on the visa type', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);
    mockRepository.findAll.mockResolvedValue([ptRow]);

    await service.update(ROW_ID, {
      steps: { core_documents: [step('a-new-step', 'Passo novo')] },
    } as any);

    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('skips the check when the payload does not touch steps', async () => {
    mockRepository.findById.mockResolvedValue(ptRow);

    await service.update(ROW_ID, { language: 'pt' } as any);

    expect(mockRepository.findAll).not.toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('still 404s when the row does not exist', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.update('ghost', { steps: {} } as any)).rejects.toThrow(
      NotFoundException,
    );
  });

  describe('translate', () => {
    it('goes through the router under the visa_steps_translation scenario', async () => {
      // The scenario name is the contract with the model-config table and the
      // admin screen; a typo here would silently fall back to nothing.
      mockAiRouter.generateJson.mockResolvedValue({
        data: { '1': { title: 'Passo' } },
        result: { model: 'gemini-2.5-flash-lite' },
      });

      const result = await service.translate({
        steps: { '1': { title: 'Step' } },
        sourceLanguage: 'en',
        targetLanguage: 'pt',
      } as any);

      expect(mockAiRouter.generateJson).toHaveBeenCalledWith(
        'visa_steps_translation',
        expect.any(String),
        expect.anything(),
        { entityType: 'visa_steps' },
      );
      expect(result).toEqual({ '1': { title: 'Passo' } });
    });

    it('throws when the chain returns nothing usable', async () => {
      mockAiRouter.generateJson.mockResolvedValue({ data: null, result: {} });

      await expect(
        service.translate({
          steps: {},
          sourceLanguage: 'en',
          targetLanguage: 'pt',
        } as any),
      ).rejects.toThrow('Failed to parse translation response');
    });
  });
});

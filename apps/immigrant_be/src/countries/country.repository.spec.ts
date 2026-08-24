// Sem isto, importar o repositório puxa @app/database -> config -> better-auth,
// que não sobe no ambiente de teste. É o mesmo mock que country.service.spec usa.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { CountryRepository } from './country.repository';

const prisma = {
  country: { findUnique: jest.fn() },
  $queryRaw: jest.fn(),
};

const visaType = (id: string, category: string) => ({
  id,
  category,
  description: '',
  source: '',
  country_id: 'c1',
});

const country = (visas: ReturnType<typeof visaType>[]) => ({
  id: 'c1',
  name: 'Portugal',
  translations: [],
  immigration_visa_types: visas,
});

describe('CountryRepository.findOne — contagem de etapas', () => {
  let repository: CountryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CountryRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get(CountryRepository);
    jest.clearAllMocks();
  });

  it('anexa a contagem a cada tipo de visto', async () => {
    prisma.country.findUnique.mockResolvedValue(
      country([visaType('v1', 'Residence Visa'), visaType('v2', 'Short-Stay')]),
    );
    prisma.$queryRaw.mockResolvedValue([
      { visa_type_id: 'v1', steps_count: BigInt(22) },
      { visa_type_id: 'v2', steps_count: BigInt(7) },
    ]);

    const result = await repository.findOne('c1');

    expect(result?.immigration_visa_types.map((v) => v.steps_count)).toEqual([
      22, 7,
    ]);
  });

  /**
   * `visa_steps` tem uma linha por idioma, e as etapas moram num JSON agrupado
   * por categoria. Contar as linhas devolveria 3 — o número de traduções — em
   * vez do número de tarefas. A soma acontece em SQL justamente por isso.
   */
  it('converte o bigint do SQL para número', async () => {
    prisma.country.findUnique.mockResolvedValue(
      country([visaType('v1', 'Residence Visa')]),
    );
    prisma.$queryRaw.mockResolvedValue([
      { visa_type_id: 'v1', steps_count: BigInt(22) },
    ]);

    const result = await repository.findOne('c1');
    const count = result?.immigration_visa_types[0].steps_count;

    expect(typeof count).toBe('number');
    expect(count).toBe(22);
  });

  it('devolve zero para visto sem etapas configuradas', async () => {
    prisma.country.findUnique.mockResolvedValue(
      country([visaType('v1', 'Sem etapas')]),
    );
    // O visto não aparece no resultado do SQL: não há linha em visa_steps.
    prisma.$queryRaw.mockResolvedValue([]);

    const result = await repository.findOne('c1');

    expect(result?.immigration_visa_types[0].steps_count).toBe(0);
  });

  it('não consulta as etapas quando o país não tem vistos', async () => {
    prisma.country.findUnique.mockResolvedValue(country([]));

    const result = await repository.findOne('c1');

    expect(prisma.$queryRaw).not.toHaveBeenCalled();
    expect(result?.immigration_visa_types).toEqual([]);
  });

  it('devolve null quando o país não existe', async () => {
    prisma.country.findUnique.mockResolvedValue(null);

    await expect(repository.findOne('inexistente')).resolves.toBeNull();
    expect(prisma.$queryRaw).not.toHaveBeenCalled();
  });
});

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

// O decorador é tudo o que este teste precisa da biblioteca de auth, e importá-la
// a sério traz o ESM de criptografia do better-auth, que o jest não consegue ler.
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
}));

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { BusinessPublicController } from './business-public.controller';
import { BusinessService } from './business.service';

/**
 * O que uma rota pública responde a um id que não é um id.
 *
 * Um `:id` sem validação chega ao Prisma, que o recusa, e a resposta sai 500 —
 * o servidor a assumir a culpa por um erro de quem chamou, e um alarme a
 * disparar por um pedido malformado. Isto é alcançável por qualquer pessoa, o
 * que é o que o torna uma questão e não uma arrumação.
 */

const service = {
  getPublicBusinessById: jest.fn(),
  findPublic: jest.fn(),
  findPublicCities: jest.fn(),
};

describe('BusinessPublicController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPublicController],
      providers: [{ provide: BusinessService, useValue: service }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('refuses an id that is not a uuid, without reaching the service', async () => {
    await request(app.getHttpServer())
      .get('/business/public/nao-uuid')
      .expect(400);

    expect(service.getPublicBusinessById).not.toHaveBeenCalled();
  });

  it('lets a well-formed id through', async () => {
    const id = '8c1d84a5-2523-451f-9ad2-e819862ef7c0';
    service.getPublicBusinessById.mockResolvedValue({ id });

    await request(app.getHttpServer())
      .get(`/business/public/${id}`)
      .expect(200);

    expect(service.getPublicBusinessById).toHaveBeenCalledWith(id);
  });
});

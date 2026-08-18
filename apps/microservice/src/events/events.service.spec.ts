jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { PrismaService } from '@app/database';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

const mockRepo = { createEvent: jest.fn(), getEvents: jest.fn() };
const mockPrisma = { userRoles: { findMany: jest.fn() } };

const aviso = {
  type: 'ai_credits_exhausted',
  title: 'Crédito esgotado',
  message: 'A geração caiu para o fallback.',
};

describe('EventsService.emitToAdmins', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepo.createEvent.mockResolvedValue({});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventsRepository, useValue: mockRepo },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(EventsService);
  });

  const admins = (...ids: string[]) =>
    mockPrisma.userRoles.findMany.mockResolvedValue(
      ids.map((userId) => ({ userId })),
    );

  it('grava uma linha por admin, não uma compartilhada', async () => {
    // A entrega marca o evento como `delivered`, então um único registro
    // chegaria a UM admin — o primeiro cujo polling o pegasse — e sumiria para
    // os outros. Justamente num alarme, que todos precisam ver.
    admins('admin-1', 'admin-2');

    await service.emitToAdmins(aviso);

    expect(mockRepo.createEvent).toHaveBeenCalledTimes(2);
    const destinos = mockRepo.createEvent.mock.calls.map(
      (call) => (call[0] as { userId: string }).userId,
    );
    expect(destinos.sort()).toEqual(['admin-1', 'admin-2']);
  });

  it('não duplica quando o mesmo usuário tem o papel duas vezes', async () => {
    admins('admin-1', 'admin-1');

    await service.emitToAdmins(aviso);

    expect(mockRepo.createEvent).toHaveBeenCalledTimes(1);
  });

  it('preserva o conteúdo do aviso em cada cópia', async () => {
    admins('admin-1');

    await service.emitToAdmins(aviso);

    expect(mockRepo.createEvent).toHaveBeenCalledWith({
      userId: 'admin-1',
      ...aviso,
    });
  });

  it('sem admin cadastrado, não explode', async () => {
    // Não há para onde mandar. Registrar no log é melhor que derrubar o job que
    // estava só tentando avisar.
    admins();

    await expect(service.emitToAdmins(aviso)).resolves.toBeUndefined();
    expect(mockRepo.createEvent).not.toHaveBeenCalled();
  });

  it('um admin que falha não impede os outros de saber', async () => {
    admins('admin-1', 'admin-2');
    mockRepo.createEvent
      .mockRejectedValueOnce(new Error('linha rejeitada'))
      .mockResolvedValueOnce({});

    await expect(service.emitToAdmins(aviso)).resolves.toBeUndefined();
    expect(mockRepo.createEvent).toHaveBeenCalledTimes(2);
  });
});

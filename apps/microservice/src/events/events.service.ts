import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { EventsRepository, type CreateEventInput } from './events.repository';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getEvents(userId: string): Promise<EventDto | null> {
    return await this.eventsRepository.getEvents(userId);
  }

  /**
   * Emits an event to be delivered via SSE to the user.
   * Called by queue consumers when a task completes.
   */
  async emit(input: CreateEventInput): Promise<void> {
    await this.eventsRepository.createEvent(input);
  }

  /**
   * Emite um aviso que não tem dono: falha de job de cron, crédito esgotado.
   *
   * Grava uma linha por admin em vez de uma linha sem `userId`. Parece
   * desperdício e não é: a entrega marca o evento como `delivered`, então um
   * único registro compartilhado chegaria **a um** admin — o primeiro cujo
   * polling o pegasse — e sumiria para os outros. Justamente num alarme, que
   * todos precisam ver.
   *
   * De brinde, dispensa migration: `Events.userId` continua obrigatório e o
   * consumo do SSE segue exatamente como está.
   */
  async emitToAdmins(input: Omit<CreateEventInput, 'userId'>): Promise<void> {
    const admins = await this.prisma.userRoles.findMany({
      where: { role: { name: 'admin' } },
      select: { userId: true },
    });

    const ids = [...new Set(admins.map((a) => a.userId))];

    if (ids.length === 0) {
      // Sem admin cadastrado o aviso não tem para onde ir. Fica no log, que é
      // melhor que desaparecer sem deixar rastro.
      this.logger.warn(
        `Nenhum admin para receber "${input.type}": ${input.message ?? input.title ?? ''}`,
      );
      return;
    }

    await Promise.all(
      ids.map((userId) =>
        this.eventsRepository
          .createEvent({ ...input, userId })
          .catch((error: unknown) => {
            // Um admin que falhe não pode impedir os outros de saber.
            this.logger.warn(
              `Não foi possível avisar o admin ${userId} sobre "${input.type}": ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }),
      ),
    );
  }
}

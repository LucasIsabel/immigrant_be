import { Injectable } from '@nestjs/common';
import type { AiAlertSink } from '@app/ai';
import { EventsService } from './events.service';
import { EVENT_TYPES } from './event-types';

/**
 * Liga o roteador de IA ao canal de avisos do produto.
 *
 * O `libs/ai` publica a porta e não sabe o que existe do outro lado; esta classe
 * é o outro lado no microservice, que é onde a geração acontece.
 */
@Injectable()
export class EventsAiAlertSink implements AiAlertSink {
  constructor(private readonly events: EventsService) {}

  async creditsExhausted({ blockedUntil }: { blockedUntil: Date }) {
    const minutos = Math.max(
      1,
      Math.round((blockedUntil.getTime() - Date.now()) / 60_000),
    );

    // Vai para todos os admins: crédito é da conta, não de quem disparou o job —
    // e quem disparou pode nem existir, se veio do cron.
    await this.events.emitToAdmins({
      type: EVENT_TYPES.AI_CREDITS_EXHAUSTED,
      title: 'Crédito do OpenRouter esgotado',
      message: `As gerações estão saindo pela cadeia de fallback pelos próximos ${minutos} min. O conteúdo continua saindo, com outro modelo e outro custo.`,
      payload: { blockedUntil: blockedUntil.toISOString() },
    });
  }
}

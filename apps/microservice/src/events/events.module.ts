import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { AI_ALERT_SINK } from '@app/ai';
import { EventsAiAlertSink } from './ai-alert.sink';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

/**
 * Global porque o `AI_ALERT_SINK` precisa ser resolvível de dentro do
 * `AiModule`, que vive em `libs/ai` e não pode importar nada do microservice —
 * seria inverter a dependência.
 *
 * Na API este módulo não existe, então lá a injeção opcional do sink fica
 * indefinida e o roteador segue sem alarme. É o comportamento desejado: quem
 * gera conteúdo é o worker.
 */
@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    EventsRepository,
    EventsService,
    // A implementação da porta que o `libs/ai` publica: é assim que o roteador
    // avisa sobre crédito esgotado sem conhecer o canal.
    { provide: AI_ALERT_SINK, useClass: EventsAiAlertSink },
  ],
  exports: [EventsService, AI_ALERT_SINK],
})
export class EventsModule {}

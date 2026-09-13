# BE#347 — não retentar P2025 no worker de ingestão de lugares

Branch: `fix/no-retry-on-missing-ingestion`
Issue: [#347](https://github.com/LucasIsabel/immigrant_be/issues/347)

## Feito

- [x] 1. Adicionar reconhecimento de P2025 (`isPrismaP2025`) e tratamento em `process` e `handleFailure` (`apps/microservice/src/place-ingestion/place-ingestion.consumer.ts`)
- [x] 2. Testes unitários cobrindo descarte imediato de P2025 vs retentativa de erro comum em `process` e `onFailed` (`apps/microservice/src/place-ingestion/place-ingestion.consumer.spec.ts`)
- [x] 3. Rodar suíte de testes unitários (12/12 no consumer, 102/102 em place-ingestion)
- [x] 4. Portões de qualidade: `pnpm lint:ci` limpo (--max-warnings=0), `nest build microservice` e `nest build immigrant_be` OK
- [x] 5. Teste isolado simulando ambiente CI sem `.env` (via `/private/tmp`)

## Resultados da Revisão

- **Comportamento no descarte:** Quando uma linha de ingestão é apagada a meio da corrida, a chamada Prisma que falha com P2025 agora aciona `job.discard()`. O BullMQ move o trabalho para falhado na primeira tentativa, em vez de retentar 3 vezes com backoff (~4,4h economizadas por varredura).
- **Tratamento da notificação:** `handleFailure` reconhece P2025 como permanente, garantindo que mesmo na tentativa 1 a falha é registada via `recordFailure` (`step: null`) e o alerta `CITY_INGESTION_FAILED` é emitido aos administradores.
- **Isolamento de CI:** O teste foi verificado fora da árvore do repositório em `/private/tmp` com `env -u OPEN_ROUTER`, garantindo que não há dependência acidental de variáveis locais.

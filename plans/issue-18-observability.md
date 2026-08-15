# Issue #18 — Analytics & Observabilidade (parte backend)

> Plano gerado em 2026-08-10. Issue: <https://github.com/LucasIsabel/immigrant_be/issues/18>
> Branch: `feat/observability-be` · Worktree: `.claude/worktrees/observability`

## Critérios de aceite

- Sentry configurado no BE.
- Logging estruturado (pino) com correlation ID propagado nas requisições.
- `/health` real com checks de Prisma e Redis.
- Bull Board disponível.

## Definition of Done

- Erro proposital aparecendo no Sentry.
- `/health` respondendo degradado quando Prisma/Redis caem.
- Correlation ID visível ponta a ponta num log de requisição.

## Abordagem

Quatro entregas independentes com pontos de contato deliberados:

1. **Logging estruturado** — `nestjs-pino` nos dois apps (`immigrant_be` HTTP e
   `microservice` worker), com configuração compartilhada em `libs/config`.
2. **Correlation ID** — `AsyncLocalStorage` próprio em
   `libs/config/src/request-context.ts` como fonte única, alimentado por
   middleware Express no app HTTP, propagado para o BullMQ via campo
   `correlationId` no job data e reidratado nos consumers com
   `runWithCorrelationId()`. O pino lê o ALS via `mixin`; o Sentry lê via tag no
   momento do capture.
3. **`/health` real** — novo `RedisHealthIndicator` (ioredis dedicado, lazy,
   timeout curto) e `GET /health` passa a checar Prisma e Redis. Inclui correção
   do `AllExceptionsFilter` para não achatar o payload de diagnóstico do
   Terminus (dívida já documentada em `health.e2e-spec.ts`, linhas 106–110).
4. **Sentry + Bull Board** — `@sentry/nestjs` com capture explícito no filter e
   nos consumers (sem depender da auto-instrumentação, ver risco 2);
   `@bull-board/nestjs` montado em `/admin/queues` com basic auth por env.

### Escopo do `apps/microservice`

Entra Sentry (jobs falham silenciosamente hoje — é exatamente o "saber de erros
antes dos usuários") e logging pino com correlation ID vindo do job. O Bull
Board fica no app HTTP, que é quem tem servidor Express; o board só precisa do
Redis, não do worker.

## Arquivos a criar

| Arquivo | Conteúdo |
| --- | --- |
| `libs/config/src/request-context.ts` | `AsyncLocalStorage<{ correlationId: string }>`, `getCorrelationId()`, `runWithCorrelationId(id, fn)`, constante `CORRELATION_ID_HEADER = 'x-request-id'`. Sem dependência de Nest — usável pelos dois apps e pelos producers. |
| `libs/config/src/request-context.spec.ts` | Unit: nesting, isolamento entre execuções, `undefined` fora de contexto. |
| `libs/config/src/logger.ts` | `buildPinoOptions(appName)`: `level: env.LOG_LEVEL`, `mixin` injetando `correlationId`, `base: { app: appName }`, `redact` de `authorization`/`cookie`, `genReqId` reaproveitando `req.id`, transporte `pino-pretty` só em `development`. |
| `libs/config/src/sentry.ts` | `initSentry(appName)` com `enabled: !!env.SENTRY_DSN`, `environment`, `tracesSampleRate`, `initialScope.tags.app`. |
| `apps/immigrant_be/src/instrument.ts` | `initSentry('immigrant_be')` — precisa ser o primeiro import de `main.ts`. |
| `apps/microservice/src/instrument.ts` | `initSentry('microservice')`. |
| `apps/immigrant_be/src/common/middleware/correlation-id.middleware.ts` | Lê `x-request-id` (ou `randomUUID()`), seta `req.id`, ecoa no header de resposta e chama `next()` dentro de `runWithCorrelationId`. |
| `apps/immigrant_be/src/health/redis-health.indicator.ts` | Mesmo padrão do `PrismaHealthIndicator`. Cliente ioredis por token `REDIS_HEALTH_CLIENT` (`lazyConnect`, `maxRetriesPerRequest: 0`, `enableOfflineQueue: false`, `connectTimeout: 2000`). `PING` com `Promise.race` de ~1.5s. `OnModuleDestroy` → `quit()`. |
| `apps/immigrant_be/src/health/redis-health.indicator.spec.ts` | up / down / timeout. |
| `apps/immigrant_be/src/bull-board/bull-board.module.ts` | `registerQueue` das 4 filas de `@app/config/constants` + `BullBoardModule.forRoot({ route: '/admin/queues', adapter: ExpressAdapter, middleware })`. |
| `apps/immigrant_be/src/bull-board/basic-auth.middleware.ts` | Basic auth contra `BULL_BOARD_USER`/`BULL_BOARD_PASSWORD` com `timingSafeEqual`. Sem creds: passa em `development`, 401 caso contrário. |
| `apps/immigrant_be/src/bull-board/basic-auth.middleware.spec.ts` | 4 casos. |
| `apps/immigrant_be/src/common/filters/all-exceptions.filter.spec.ts` | 5xx captura no Sentry com tag de correlation; 4xx não; payload Terminus passa intacto. |
| `apps/microservice/src/common/report-job-failure.ts` | Captura só em `isFinalAttempt(job)` (lição de 2026-08-03), com tags `queue`, `job_id`, `job_name`, `correlation_id`. |
| `apps/immigrant_be/test/correlation-id.e2e-spec.ts` | Propagação ponta a ponta no HTTP. |

## Arquivos a alterar

| Arquivo | Mudança |
| --- | --- |
| `package.json` | Dependências (ver abaixo). |
| `libs/config/src/env.ts` | 5 vars novas, todas opcionais ou com default. |
| `apps/immigrant_be/src/main.ts` | `import './instrument'` na primeira linha; `bufferLogs: true`; `app.useLogger(app.get(Logger))`; `app.use(correlationIdMiddleware)`; CORS com `exposedHeaders: ['x-request-id']` e `x-request-id` em `allowedHeaders`. |
| `apps/immigrant_be/src/app.module.ts` | `LoggerModule.forRoot(buildPinoOptions('immigrant_be'))` e Bull Board condicional. |
| `apps/immigrant_be/src/common/filters/all-exceptions.filter.ts` | Passthrough do payload Terminus (objeto com `status` **e** `details`); capture no Sentry para `status >= 500` que não seja health check. |
| `apps/immigrant_be/src/health/health.controller.ts` | `GET /health` → `check([prisma, redis])`; `/health/ready` idem; novo `GET /health/live` → `check([])`. |
| `apps/immigrant_be/src/health/health.module.ts` | Providers do `RedisHealthIndicator` e do `REDIS_HEALTH_CLIENT`. |
| `apps/immigrant_be/src/ai-blog/ai-blog.service.ts` | Os 3 `.add(` incluem `correlationId: getCorrelationId()`. |
| `apps/immigrant_be/src/ai-image/ai-image.service.ts` | Idem no `.add(`. |
| `apps/microservice/src/main.ts` | `import './instrument'`; `bufferLogs` + `useLogger`; no `catch` do bootstrap, `captureException` + `flush(2000)` + log antes do `process.exit(1)`. |
| `apps/microservice/src/microservice.module.ts` | `LoggerModule.forRoot(buildPinoOptions('microservice'))`. |
| 4 consumers do microservice | `process()` dentro de `runWithCorrelationId(job.data.correlationId ?? String(job.id), ...)`; `onFailed` chama `reportJobFailure`. Job data ganha `correlationId?: string` **opcional** (jobs antigos na fila não têm). |
| `apps/microservice/src/ai-blog/ai-blog.service.ts` | O `.add(` encadeado repassa o `correlationId` de origem. |
| `apps/immigrant_be/test/health.e2e-spec.ts` | Novos casos + remoção do comentário de dívida das linhas 106–110. |
| `docs/ARCHITECTURE.md` | Seções 1, 2, 8, 9, 10 e 13; checklist da seção 14 no mesmo PR. |

## Dependências

| Pacote | Versão | Nota de compatibilidade |
| --- | --- | --- |
| `nestjs-pino` | `4.6.1` | peers `@nestjs/common ^11`, `pino ^10`, `pino-http ^11` |
| `pino` | `10.3.1` | — |
| `pino-http` | `11.0.0` | agnóstico de framework, ok com Express 5 |
| `@sentry/nestjs` | `10.70.0` | peers `@nestjs/core ^11`, `@nestjs/common ^11` |
| `@bull-board/api` | `8.6.0` | — |
| `@bull-board/express` | `8.6.0` | depende de `express ^5.2.1` — nativo Express 5 |
| `@bull-board/nestjs` | `8.6.0` | peers `@nestjs/common/core ^11`, `@nestjs/bull-shared` |
| `pino-pretty` | `13.1.3` (dev) | só transporte de desenvolvimento |

`bodyParser: false` **não** é problema: o `ExpressAdapter` do bull-board monta um
`Router` próprio com `express.json()` interno, então retry/promote funcionam.

## Decisões de design

1. **Correlation ID nasce no middleware e aceita `x-request-id` de entrada** —
   permite rastrear FE→BE; sem header, `crypto.randomUUID()`. Sempre ecoado na
   resposta, com `exposedHeaders` no CORS para o browser conseguir ler.
2. **ALS próprio em `libs/config`, não o do nestjs-pino** — o nestjs-pino guarda
   o *logger* no ALS e não expõe API estável para extrair o request id de dentro
   de um service (necessário nos producers de fila). ~15 linhas viram a fonte
   única consumida pelo pino (`mixin`), pelo Sentry (tag) e pelos producers.
3. **Propagação para o BullMQ via campo no job data** — explícito, sobrevive à
   serialização no Redis, visível no Bull Board. Fallback para `job.id` cobre
   jobs de cron e jobs antigos.
4. **Capture explícito no Sentry, não auto-instrumentação** — o build usa webpack
   (`nest-cli.json` com `"webpack": true`) e os hooks de `require-in-the-middle`
   não são confiáveis em bundle. `tracesSampleRate` default 0.
5. **Worker captura só na tentativa final** (`isFinalAttempt`), seguindo a lição
   de 2026-08-03 sobre `@OnWorkerEvent('failed')` disparar 3x.
6. **Bull Board com basic auth, não RolesGuard** — o board é middleware Express
   montado fora do pipeline de guards do Nest, onde o `RolesGuard` não roda.
   Basic auth não depende de Postgres nem de sessão better-auth, então o board
   continua acessível durante o tipo de incidente em que ele é mais necessário.
   Em produção sem creds, o módulo nem é montado.
7. **Filter preserva o payload do Terminus** com detecção estrita (objeto com
   `status` **e** `details`), para não vazar corpo de outras exceções 503.

## Contrato do `/health`

`GET /api/v1/health` e `/health/ready` — sucesso, **HTTP 200**:

```json
{
  "status": "ok",
  "info": { "database": { "status": "up" }, "redis": { "status": "up" } },
  "error": {},
  "details": { "database": { "status": "up" }, "redis": { "status": "up" } }
}
```

Degradado (Redis fora) — **HTTP 503**, com diagnóstico preservado pelo filter:

```json
{
  "status": "error",
  "info": { "database": { "status": "up" } },
  "error": { "redis": { "status": "down" } },
  "details": { "database": { "status": "up" }, "redis": { "status": "down" } }
}
```

`GET /api/v1/health/live` — sempre **200**, não toca dependência. Alvo do
healthcheck de container.

### Impacto no frontend

`components/dashboard/admin/health-dashboard.tsx` já consome o shape do Terminus
via hooks kubb e itera `Object.entries(details)`, então as chaves novas
`database`/`redis` não quebram nada. No 503 o react-query rejeita, `data` fica
`undefined` e o dashboard já mostra "Unhealthy" — comportamento atual preservado.
Follow-up opcional no FE (fora deste escopo): ler o body do 503 para exibir o
diagnóstico por serviço.

## Novas variáveis de ambiente

Todas opcionais ou com default. `envSchema.parse(process.env)` roda no import em
todo processo (app, worker, seeds); uma var obrigatória nova quebraria dev, CI e
o deploy de quem não setou.

| Var | Zod | Default | Obrigatória |
| --- | --- | --- | --- |
| `SENTRY_DSN` | `zod.string().url().optional()` | — (Sentry desabilitado sem ela) | Não |
| `SENTRY_TRACES_SAMPLE_RATE` | `zod.coerce.number().min(0).max(1).default(0)` | `0` | Não |
| `LOG_LEVEL` | `zod.enum([...]).default('info')` | `info` | Não |
| `BULL_BOARD_USER` | `zod.string().optional()` | — | Não |
| `BULL_BOARD_PASSWORD` | `zod.string().optional()` | — | Não (em prod o board só monta com o par) |

## Estratégia de testes

Todo spec que sobe módulo real mocka `@thallesp/nestjs-better-auth` e
`@app/database` **no topo do arquivo** (armadilha ESM registrada em
`tasks/lessons.md`). Specs que tocam o filter também mockam `@sentry/nestjs`.

| Spec | O que prova | Como simula a queda |
| --- | --- | --- |
| `test/health.e2e-spec.ts` | 200 com `database`+`redis` up; 503 com `error.database.status === 'down'`; 503 com `error.redis.status === 'down'`; diagnóstico atravessa o filter; `/health/live` sempre 200 | Prisma: `queryRaw.mockRejectedValue`. Redis: override do `REDIS_HEALTH_CLIENT` com `ping` que resolve/rejeita/pendura |
| `test/correlation-id.e2e-spec.ts` | Request com `x-request-id: abc` ecoa `abc` e o log JSON contém `correlationId: "abc"`; sem header, UUID gerado presente em resposta e log | stream de log em memória |
| `redis-health.indicator.spec.ts` | up / down / timeout | mock do client |
| `basic-auth.middleware.spec.ts` | dev sem creds passa; prod sem creds 401; creds erradas 401 + `WWW-Authenticate`; creds certas `next()` | env fake |
| `all-exceptions.filter.spec.ts` | 5xx captura com tag `correlation_id`; 4xx não; Terminus passthrough sem capture | `jest.mock('@sentry/nestjs')` |
| `request-context.spec.ts` | nesting, isolamento, `undefined` fora de contexto | — |

Verificação manual da DoD: `docker compose stop redis` → `curl -i .../health`
deve dar 503 com `error.redis`; religar e repetir → 200. Sentry: com `SENTRY_DSN`
setado, provocar um throw e conferir o evento com a tag `correlation_id` igual ao
header retornado (sem commitar endpoint de debug).

## Ordem de execução

1. **Dependências** — `pnpm add ...`. Prova: `pnpm build` e `pnpm test` seguem
   como no baseline (medir o baseline antes, lição de 2026-08-03).
2. **`env.ts` + `request-context.ts` + spec.** Prova:
   `pnpm jest libs/config/src/request-context.spec.ts` e `pnpm build`.
3. **Logging pino no app HTTP.** Prova: `curl -i -H 'x-request-id: teste-123'
   .../health/live` → header ecoado e linha JSON com `"correlationId":"teste-123"`.
4. **Health real.** Prova: `pnpm test:e2e`; manual com `docker compose stop redis`.
5. **Sentry.** Prova: `pnpm jest all-exceptions.filter.spec.ts`; manual com DSN.
6. **Pino + Sentry no worker.** Prova: disparar geração de post AI e ver no
   stdout do worker o **mesmo** `correlationId` do request que enfileirou.
7. **Correlation → filas.** Prova: campo visível no job data pelo Bull Board.
8. **Bull Board.** Prova: `curl -i .../admin/queues` (401 com creds, 200 em dev),
   `curl -u user:pass` → HTML. Testar também `/api/v1/admin/queues` para
   confirmar onde o prefixo global colocou a rota (risco 1).
9. **`docs/ARCHITECTURE.md`** + gate final:
   `pnpm lint:ci && pnpm test && pnpm test:e2e && pnpm build`.

## Riscos

1. ~~**Rota do Bull Board vs. prefixo global**~~ — **resolvido na verificação de
   runtime**: o prefixo global se aplica, a rota final é
   `GET /api/v1/admin/queues` (`/admin/queues` devolve 404). Registrado no
   `ARCHITECTURE.md`.
2. **Webpack no build** — (a) a auto-instrumentação OTel do Sentry pode não
   funcionar em bundle, mitigada pelo capture explícito; (b) o transporte
   `pino-pretty` usa worker thread com resolução de módulo por string, que quebra
   em bundle, mitigado por habilitá-lo só em `development`. Fallback: remover o
   transport e usar pipe (`nest start | pino-pretty`).
3. **Loop de restart no Coolify** — se o healthcheck do container apontar para
   `/health` (agora 503 com DB fora), uma queda de Postgres viraria restart em
   loop. Mitigação: nota de deploy no PR — container usa `/health/live`.
4. **Ruído no Sentry via health** — o FE faz poll a cada 30s. Mitigado pela
   exclusão do payload Terminus no capture.
5. **Jobs antigos na fila** sem `correlationId` — campo opcional + fallback
   `job.id` em todos os consumers.
6. **Jest e os pacotes novos** — se algum sub-dep ESM travar o runtime CJS do
   Jest (mesmo padrão do better-auth), mockar no topo dos specs afetados.
7. **`allowedHeaders` do CORS** — hoje só `Content-Type, Authorization`. Sem a
   adição prevista, o preflight bloqueia o `x-request-id` vindo do FE.
8. **Conexão extra no Redis** — 1 por instância (lazy). Aceitável; reusar a
   conexão do BullMQ acoplaria o health à registração de filas.


## Verificação de runtime (2026-08-10)

Executada com Postgres 16 e Redis 7 locais, com o `SENTRY_DSN` apontado para um
coletor HTTP local que grava os envelopes recebidos.

| Item da DoD | Resultado |
| --- | --- |
| Bull Board disponível | `GET /api/v1/admin/queues` → 200 com creds (`<title>Bull Dashboard</title>`); 401 sem creds, com senha errada, com usuário errado e com prefixo de senha; `WWW-Authenticate: Basic realm="Bull Board"` presente |
| `/health` saudável | 200 com `info.database.status = up` e `info.redis.status = up` |
| `/health` degradado | Redis derrubado → 503 com `error.redis.status = down` e `details.database.status = up` |
| Recuperação | Redis religado → 200 sem reiniciar o processo |
| `/health/live` | 200 durante todo o outage |
| Correlation ID ponta a ponta | `x-request-id: lucas-teste-999` ecoado na resposta e presente como `correlationId` em todas as linhas de log da requisição; sem header, UUID gerado e ecoado |
| Erro no Sentry | Envelope recebido com `tags: {"app": "immigrant_be", "correlation_id": "erro-proposital-42"}` |

### Dois bugs encontrados só na subida (invisíveis no unit test)

1. `lazyConnect: true` combinado com `enableOfflineQueue: false` fazia o
   indicador reportar `redis: down` com o Redis no ar — o primeiro comando é
   rejeitado antes de a conexão existir. A fila offline voltou a ser padrão; o
   fail-fast ficou por conta de `maxRetriesPerRequest: 0` e do timeout do
   próprio indicador.
2. O client sem listener de `error` emitia `Unhandled error event` a cada
   tentativa de reconexão durante o outage. Passou a ter handler no-op — quem
   reporta a queda é o `isHealthy`.

Ambos estão registrados em `tasks/lessons.md`.

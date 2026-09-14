# BE#331 — fix(observability): reportJobFailure produces none of the errors we see

Branch: `fix/bullmq-job-failure-observability`
Issue: [#331](https://github.com/LucasIsabel/immigrant_be/issues/331)
Plano: [`plans/2026-09-15-be-331-fix-job-failure-observability.md`](../plans/2026-09-15-be-331-fix-job-failure-observability.md)

## Tarefas

- [x] 1. Atualizar `libs/config/src/sentry.ts` desabilitando a integração `Nest` no `microservice`
- [x] 2. Atualizar `apps/microservice/src/common/report-job-failure.ts` com fingerprint, limpeza de flag e comentários atualizados
- [x] 3. Criar testes unitários em `apps/microservice/src/common/report-job-failure.spec.ts`
- [x] 4. Criar testes unitários em `libs/config/src/sentry.spec.ts`
- [x] 5. Atualizar `docs/ARCHITECTURE.md` (§9 Observabilidade)
- [x] 6. Rodar suíte de testes unitários (todos os specs dos consumers, report-job-failure e sentry passando)
- [x] 7. Portões de qualidade: `pnpm lint:ci` (--max-warnings=0) e builds (`nest build microservice` e `nest build immigrant_be`)

## Resultados da Revisão

- **Isolamento de auto-instrumentação:** No `microservice`, o Sentry registrava automaticamente a cada tentativa de execução do BullMQ uma exceção sem tags de identificação (`job_id`, `job_name`, `correlation_id` vazios). Além de poluir o Sentry com erros transitórios que poderiam ser recuperados em retries, essa captura prematura marcava o objeto de erro com `__sentry_captured__ = true` e atualizava o `dedupeIntegration`, fazendo com que a captura intencional no handler de falha final (`reportJobFailure`) fosse descartada silenciosamente.
- **Exclusão cirúrgica no `initSentry`:** `initSentry('microservice')` agora filtra a integração `Nest`. Como o microservice não possui rotas HTTP nem agendamento `@Cron`, a integração `Nest` apenas ativava a auto-captura do `@Processor`.
- **Robustez no `reportJobFailure`:** O helper agora limpa defensivamente a propriedade `__sentry_captured__` e atribui o fingerprint `['bullmq-job-failure', queue, job.name, '{{ default }}']`, assegurando que falhas exaustas sejam registradas com suas tags completas e sem deduplicação indevida.
- **Garantia de CI:** Testes unitários novos executados em ambiente simulado fora da árvore do repositório (`/private/tmp` com `env -u OPEN_ROUTER`), sem depender do `.env` local.

# Plano — BE#331: fix(observability): reportJobFailure produces none of the errors we see

Data: 2026-09-15
Branch: `fix/bullmq-job-failure-observability`
Issue: [#331](https://github.com/LucasIsabel/immigrant_be/issues/331)

## Contexto e Causa Raiz

Os 31 eventos de `IMMIGRANT-BE-1` no Sentry continham `mechanism: auto.queue.nestjs.bullmq` com tags `job_id`, `job_name` e `correlation_id` vazias. Eles vinham da auto-instrumentação de BullMQ do pacote `@sentry/nestjs`, que intercepta `@Processor` e captura erros em todas as tentativas de execução (`process()`).

O helper `apps/microservice/src/common/report-job-failure.ts` foi projetado para reportar uma única vez, na tentativa final (`isFinalAttempt(job)`), preenchendo as tags `queue`, `job_name`, `job_id` e `correlation_id`. No entanto, como a auto-instrumentação capturava o erro prematuramente na primeira tentativa (ou em cada retry), o Sentry marcava o objeto de erro com `__sentry_captured__ = true` e o `dedupeIntegration` do Sentry descartava a chamada do `reportJobFailure`. O resultado era que o helper virava código morto, e o Sentry registrava até 3 erros anônimos por falha em vez de um único erro correlacionado.

## Decisão de Arquitetura

1. **Desativar a auto-instrumentação do Nest no microservice**:
   - Em `libs/config/src/sentry.ts`, configurar `integrations` em `Sentry.init` para filtrar a integração `Nest` quando `appName === 'microservice'`.
   - No `microservice`, a integração `Nest` apenas executava a auto-instrumentação do `@Processor` (BullMQ) e `@Injectable`. O microservice não expõe controllers HTTP nem usa `@nestjs/schedule` / `@nestjs/event-emitter`.
   - Com isso, o `@Processor` não é embrulhado pelo Sentry, erros intermediários não são capturados antes da hora e jobs temporariamente falhos que se recuperam no retry não sujam o Sentry.

2. **Reforçar o `reportJobFailure`**:
   - Limpar defensivamente qualquer flag `__sentry_captured__` do objeto `error`.
   - Definir fingerprint explícito: `['bullmq-job-failure', queue, job.name, '{{ default }}']`.
   - Atualizar a documentação e comentários do arquivo para descrever a mecânica real.

3. **Atualizar a documentação de arquitetura**:
   - Atualizar `docs/ARCHITECTURE.md` (§9 Observabilidade) documentando a desativação da auto-instrumentação do BullMQ no worker e o papel exclusivo do `reportJobFailure`.

4. **Garantia de Qualidade e Testes**:
   - Criar `apps/microservice/src/common/report-job-failure.spec.ts` cobrindo todas as ramificações (`isFinalAttempt`, tags, fallback de correlationId, remoção de `__sentry_captured__`, fingerprint).
   - Criar `libs/config/src/sentry.spec.ts` testando o comportamento de `initSentry` para `microservice` vs `immigrant_be`.
   - Executar `pnpm test microservice`, `pnpm lint:ci` e `nest build microservice` + `nest build immigrant_be`.

## Passos de Execução

- [ ] 1. Atualizar `libs/config/src/sentry.ts` desabilitando a integração `Nest` no `microservice`
- [ ] 2. Atualizar `apps/microservice/src/common/report-job-failure.ts` com fingerprint, limpeza de flag e comentários atualizados
- [ ] 3. Criar testes unitários em `apps/microservice/src/common/report-job-failure.spec.ts`
- [ ] 4. Criar testes unitários em `libs/config/src/sentry.spec.ts`
- [ ] 5. Atualizar `docs/ARCHITECTURE.md`
- [ ] 6. Rodar testes unitários, lint e build dos dois apps
- [ ] 7. Registrar resultados em `tasks/todo.md`

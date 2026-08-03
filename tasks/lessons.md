# Lições

Padrões aprendidos trabalhando neste repositório. Cada entrada existe para
evitar que o mesmo erro se repita.

## 2026-08-03 — Rastreamento de tasks saiu do ClickUp e foi para o GitHub Projects

O Lucas decidiu que, a partir do PR das tasks desta rodada, o ClickUp deixa de ser usado nos
dois repos do Aloravia. Board do backend: https://github.com/users/LucasIsabel/projects/3
(Aloravia BE); frontend: https://github.com/users/LucasIsabel/projects/2 (Aloravia FE).

**Regra:** nenhuma operação de task no ClickUp para este projeto. Use o skill `/github-board`
(nunca `gh project` direto) e, assim que o PR for aberto, mova o card para `In review` com o
link do PR no item. Se a task não existe no board, crie o item antes de abrir o PR.

## 2026-08-03 — Verificar o baseline antes de culpar a própria mudança

Ao rodar `pnpm test` depois de uma refatoração, 48 de 223 testes falharam.
A reação natural seria assumir que a mudança quebrou algo. Rodar a mesma
suíte em `main` (via `git worktree`, sem mexer no working tree) mostrou as
mesmas 48 falhas — eram pré-existentes.

**Regra:** antes de investigar uma falha de teste, confirme se ela já existia
no baseline. `git worktree add <tmp> main` + symlink de `node_modules` dá o
resultado em segundos e sem risco de perder trabalho.

## 2026-08-03 — CI que nunca foi verde não é rede de segurança

O workflow existia desde o início, mas `pnpm lint` (job 1) falhava com 12
erros não-autocorrigíveis, então `test` e `build` nunca chegavam a rodar.
Um pipeline vermelho há muito tempo é indistinguível de não ter pipeline.

**Regra:** ao herdar um CI, rode cada job localmente antes de confiar nele.
E prefira um gate menor que passa a um gate ambicioso que ninguém olha —
`lint` só entra como bloqueante quando estiver em zero.

## 2026-08-03 — `--fix` no lint do CI mascara problemas

O script `lint` usa `eslint --fix`, que reescreve arquivos. Em CI isso faz o
job "passar" corrigindo silenciosamente, sem que a correção chegue ao commit.
Foi criado o `lint:ci`, sem `--fix` e com `--max-warnings=0`.

**Regra:** script de desenvolvimento pode corrigir; script de CI só verifica.

## 2026-08-03 — Fila sem producer é código morto que parece infraestrutura

A `plan_queue` tinha consumer, módulo, service e prompts — tudo aparentemente
vivo. Faltava só o producer, e `system.module.ts` registrava uma fila com
nome diferente (`'plan'` vs `'plan_queue'`), o que escondia o problema.

**Regra:** ao auditar uma fila, procure primeiro pelo `.add(`. Sem producer,
o resto é decoração — e nomes de fila devem vir sempre das constantes em
`libs/config/src/constants.ts`, nunca de literais.

## 2026-08-03 — `@OnWorkerEvent('failed')` dispara a cada tentativa

Com `attempts: 3`, notificar o usuário dentro do handler de falha gera três
toasts de erro para uma única falha. É preciso checar
`job.attemptsMade >= job.opts.attempts` (helper `isFinalAttempt` em
`apps/microservice/src/events/event-types.ts`).

**Regra:** efeito colateral visível ao usuário dentro de `failed` só na
tentativa final. O mesmo vale para persistir status `failed` no banco.

## 2026-08-03 — Retornar sem lançar marca o job como sucesso

Vários workers faziam `logger.warn(...)` + `return` em caminhos de falha. Para
o BullMQ isso é conclusão bem-sucedida: sem retry, sem registro em `failed`,
e o usuário esperando um toast que nunca chega.

**Regra:** em consumer, falha se comunica com `throw`. Log sozinho não
propaga nada.

## 2026-08-03 — better-auth é ESM e trava o Jest

`@thallesp/nestjs-better-auth` puxa `@noble/ciphers`, que é ESM puro e não
carrega no runtime CommonJS do Jest. Como `libs/database` importa o barrel
`@app/config`, qualquer teste que toque o banco herda esse problema —
inclusive testes E2E, já que todo controller usa `@AllowAnonymous()`.

**Regra:** em spec que precise de módulo real, mocke
`@thallesp/nestjs-better-auth` e `@app/database` no topo do arquivo (antes
dos imports, por causa do hoisting), como fazem `roles.guard.spec.ts` e
`health.e2e-spec.ts`. Desacoplar `libs/database` de `@app/config` resolveria
a causa raiz e permitiria subir o `AppModule` inteiro em E2E.

# Lições

Padrões aprendidos trabalhando neste repositório. Cada entrada existe para
evitar que o mesmo erro se repita.

## 2026-08-15 — DTO escrito à mão é onde o contrato diverge do schema

`UpdateCountryDto` era o único `Update*Dto` do repo declarado campo a campo; todos os
outros derivam do `Create*Dto` com `PartialType`. Quatro campos dele estavam em camelCase
contra colunas snake_case do Prisma. Como o repository espalha o DTO direto em
`prisma.country.update`, toda edição que tocasse um deles morria em
`PrismaClientValidationError` — 500 opaco para o cliente. Ficou meses assim.

**Regra:** `Update*Dto` deriva do `Create*Dto` (`PartialType`, com `OmitType` para
relações). Duplicar a declaração é criar dois lugares onde o nome do campo pode divergir,
e só um deles é conferido contra o banco.

## 2026-08-15 — Teste com repository mockado não cobre nome de campo

O `country.service.spec.ts` passava com o bug vivo em produção: ele mocka o repository,
então um campo com nome errado atravessa o serviço sem reclamação. Quem rejeita é o Prisma,
duas camadas abaixo.

**Regra:** quando o bug é de *nome* de campo e o repository espalha o DTO em `data`, o teste
tem que comparar os campos do DTO com as colunas do `schema.prisma` — não exercitar o
serviço. E vale ler o schema em vez de importar `generated/prisma`: o teste deixa de
depender de um `prisma generate` recente.

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

## 2026-08-04 — Deploy é automático no merge, mas não roda migration

O Coolify redeploya BE e FE a cada commit no `main`. Ele **não** executa
`prisma migrate deploy`. Ao mergear a PR que criou `country_translations`, o
código novo subiu em 2 minutos pedindo uma tabela que não existia:

```
GET https://api.aloravia.com/api/v1/countries → HTTP 500
The table `public.country_translations` does not exist in the current database.
```

Produção ficou fora do ar até rodar a migration à mão dentro do container.

**Regra:** PR que contém migration não é "mergear e depois aplicar". A janela
entre o deploy e a migration é downtime. Ou a migration entra no pipeline
(`prisma migrate deploy` antes de subir o app), ou o merge é coordenado com a
aplicação imediata da migration.

**Corolário:** migration e seed são coisas diferentes. A migration restaurou o
schema mas manteve o conteúdo antigo — os 12 países novos e a normalização só
apareceram depois de rodar o seed separadamente.

## 2026-08-04 — PR empilhada só re-aponta a base se o branch for deletado

Três PRs empilhadas (`localize` → `normalize` → `p0-p1` → `main`) foram
mergeadas na ordem `#21 → #22 → #24`, que é a ordem que eu mesmo documentei.
Todas apareceram como MERGED. Só o conteúdo da `#21` chegou ao `main`:

| Merge | Onde entrou de fato |
| --- | --- |
| `#21` → `main` | ✅ `main` |
| `#22` → `feat/seed-countries-p0-p1` | ❌ branch já integrado ao main |
| `#24` → `feat/normalize-existing-countries` | ❌ branch já integrado ao p0-p1 |

O GitHub re-aponta a base de uma PR filha para o `main` **apenas quando o
branch pai é deletado**. Sem deleção, cada merge cai num branch morto — e o
`MERGED` na interface esconde isso.

**Regra:** com pilha, mergear de cima para baixo (filha primeiro), ou deletar
o branch pai a cada merge. E sempre confirmar com
`git merge-base --is-ancestor <commit> origin/main` em vez de confiar no
status da PR.

## 2026-08-04 — Reportar um fix sem verificar que ele virou commit

Depois de um build quebrado, corrigi três DTOs e segui em frente. A correção
ficou no working tree e nunca foi commitada — o branch da PR carregava a
versão quebrada, com `CreateCountryDto` reduzido de 14 para 2 campos. Só
apareceu ao validar o `main` dias depois.

**Regra:** "corrigi" só vale depois de `git status` limpo no que foi tocado.
Fix aplicado no working tree e não commitado é fix que não existe.

## 2026-08-04 — Regex para remover campo de DTO come o vizinho

A remoção de campos por regex
(`@ApiProperty\(\{[\s\S]*?\}\)` + declaração) quebrou porque
`benefits`/`challenges` têm `example: [...]` aninhado: o `}\)` não-guloso
casou cedo e levou junto sete campos que deveriam ficar.

**Regra:** edição estrutural de TS/decorator não se faz com regex. Ou é
edição pontual com âncora exata, ou é AST. E depois de qualquer remoção em
massa, conferir a contagem de campos antes de commitar.

## 2026-08-10 — Teste com client mockado não prova que a conexão funciona

O `RedisHealthIndicator` nasceu com `lazyConnect: true` **e**
`enableOfflineQueue: false`. Os seis testes unitários passavam — todos mockam o
client e chamam `ping()` direto. Ao subir a aplicação de verdade, `/health`
reportou `redis: down` com o Redis respondendo `PONG` no `redis-cli`.

A causa: com `lazyConnect`, a conexão só é aberta pelo primeiro comando; com a
fila offline desligada, esse primeiro comando é rejeitado antes de o socket
existir. Ou seja, o indicador nunca conseguia conectar.

A mesma subida revelou um segundo problema invisível no teste: sem listener de
`error`, o client emite `Unhandled error event` a cada tentativa de reconexão
enquanto o Redis está fora.

**Regra:** integração com I/O externo não fica provada por unit test com mock.
Antes de fechar, suba o processo contra a dependência real e exercite o ciclo
completo — no ar, fora do ar, de volta ao ar. Para o Redis especificamente:
`lazyConnect` exige `enableOfflineQueue` ligado, e todo client precisa de um
handler de `error`.

## 2026-08-10 — `pkill -f` casa com o próprio shell

Ao reiniciar a API em verificação manual, `pkill -f "dist/apps/immigrant_be/main.js"`
derrubou o próprio comando (exit 144): o padrão casa também com a linha de
comando do bash que o executa.

**Regra:** em script, guarde o PID (`echo $! > app.pid`) e mate por PID. Se
precisar de `pgrep`/`pkill -f`, exclua o próprio processo.

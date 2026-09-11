# Immigrant BE — Project Conventions

## Workflow Orchestration

### 1. Plan Node Default

•⁠ ⁠Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
•⁠ ⁠If something goes sideways, STOP and re-plan immediately - don't keep pushing
•⁠ ⁠Use plan mode for verification steps, not just building
•⁠ ⁠Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

•⁠ ⁠Use subagents liberally to keep main context window clean
•⁠ ⁠Offload research, exploration, and parallel analysis to subagents
•⁠ ⁠For complex problems, throw more compute at it via subagents
•⁠ ⁠One tack per subagent for focused execution

### 3. Self-Improvement Loop

•⁠ ⁠After ANY correction from the user: update ⁠ tasks/lessons.md ⁠ with the pattern
•⁠ ⁠Write rules for yourself that prevent the same mistake
•⁠ ⁠Ruthlessly iterate on these lessons until mistake rate drops
•⁠ ⁠Review lessons at session start for relevant project

### 4. Verification Before Done

•⁠ ⁠Never mark a task complete without proving it works
•⁠ ⁠Diff behavior between main and your changes when relevant
•⁠ ⁠Ask yourself: "Would a staff engineer approve this?"
•⁠ ⁠Run tests, check logs, demonstrate correctness

### 4.1 O PR só sobe depois dos unitários **e** do E2E

- **Nenhum PR é aberto antes de os testes unitários passarem e o E2E ter sido
  corrido.** A ordem é essa: unitários verdes → E2E local → só então `gh pr
  create`. Abrir primeiro e verificar depois é o que transforma o PR num pedido
  para outra pessoa descobrir se aquilo funciona.
- **O E2E corre em ambiente local, conduzido pelo Playwright MCP.** Backend e
  frontend de pé na máquina, e o percurso feito pelas ferramentas
  `mcp__playwright__*` no browser como um utilizador o faria — navegar, clicar,
  escrever tecla a tecla, ler o ecrã e a consola — e não em mocks, não por `curl`
  só, não por dedução a partir do código.
- **Um script Playwright headless complementa, não substitui.** Serve para
  repetir um percurso longo ou medir; a garantia é a passagem pelo MCP. Foi pelo
  MCP, escrevendo como uma pessoa escreve, que o repasse da FE#324 mostrou
  cidades duplicadas por acento e um seletor que prendia o ecrã (FE#527,
  FE#528) — o script, que preenchia o campo de uma vez e lia só as primeiras
  opções, tinha passado.
- Vale para os dois repos. Uma mudança só de backend é na mesma verificada pela
  ponta que a consome; foi assim que se apanhou o campo que o better-auth
  descartava em silêncio (BE#328).
- **O resultado entra no corpo do PR**: o que foi percorrido pelo MCP, e o que se
  observou. Uma tabela de "fiz X, aconteceu Y" vale mais do que a palavra
  "testado".
- **Se o E2E não for possível** — ambiente em falta, o Playwright MCP
  indisponível, dependência externa fora do ar, percurso que exige dados de
  produção — dizê-lo **antes de abrir o PR**, e esperar pela decisão do Lucas em
  vez de abrir na mesma. Cair para o script em silêncio conta como não
  verificar. Não verificar é aceitável quando é dito e aceite; fingir que se
  verificou não é.
- Capturas e snapshots do MCP ficam fora do que se commita: no FE, em
  `.playwright-mcp/`, que o git ignora — nunca na raiz do repo.
- Montar o estado que o percurso precisa (por SQL, por seed) faz parte do E2E, e
  limpar o que ele deixou para trás — utilizadores de teste, linhas alteradas —
  também.

**Portas do ambiente local:** backend em **3000**, frontend em **3002**. A
**3001 não se usa e não se mata** — pertence ao projeto `folclore_game`. Como o
`CORS_ORIGINS` do backend não inclui a 3002, subir o BE com o override apenas
para a sessão de teste:
`CORS_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3002" npx nest start immigrant_be`.
Para não enviar e-mail real durante o E2E, subir com `RESEND_API_KEY` inválida —
o envio falha, é registado, e o resto do fluxo corre igual.

### 5. Demand Elegance (Balanced)

•⁠ ⁠For non-trivial changes: pause and ask "is there a more elegant way?"
•⁠ ⁠If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
•⁠ ⁠Skip this for simple, obvious fixes - don't over-engineer
•⁠ ⁠Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

•⁠ ⁠When given a bug report: just fix it. Don't ask for hand-holding
•⁠ ⁠Point at logs, errors, failing tests - then resolve them
•⁠ ⁠Zero context switching required from the user
•⁠ ⁠Go fix failing CI tests without being told how

## Task Management

1.⁠ ⁠*Plan First*: Write plan to ⁠ tasks/todo.md ⁠ with checkable items
2.⁠ ⁠*Verify Plan*: Check in before starting implementation
3.⁠ ⁠*Track Progress*: Mark items complete as you go
4.⁠ ⁠*Explain Changes*: High-level summary at each step
5.⁠ ⁠*Document Results*: Add review section to ⁠ tasks/todo.md ⁠
6.⁠ ⁠*Capture Lessons*: Update ⁠ tasks/lessons.md ⁠ after corrections
7.⁠ ⁠*Persist Plans*: Save every plan created in a markdown file under the `plans/` directory at the project root (one file per plan).

## Gestão de Tarefas — GitHub Projects

- O board deste repositório é **Aloravia BE**: <https://github.com/users/LucasIsabel/projects/3>
  (o frontend `immigrant_fe` usa o **Aloravia FE**: <https://github.com/users/LucasIsabel/projects/2>).
- **O ClickUp está descontinuado desde 2026-08-03.** Não crie, atualize nem consulte tasks no
  ClickUp para este projeto — o GitHub Projects é a única fonte de verdade.
- Toda operação no board (criar item, mover coluna, atualizar status/prioridade/datas, gerar
  relatório) passa pelo skill `/github-board`. Não opere o board direto via `gh` nem pelo
  navegador na sessão principal.
- Os itens do board são **issues reais** do repo (não draft issues) — foi assim que o fluxo
  ficou automático. Item novo deve nascer como issue, não como draft.
- Fluxo padrão de uma task: o card nasce em `Backlog`/`Ready` → `In progress` ao começar →
  **`In review` assim que o PR for aberto** → `Done` **automaticamente** no merge. Se a task
  ainda não existe no board, crie o item antes de abrir o PR.
- O `Done` automático depende de duas coisas: o corpo do PR citar `Closes #N` — **uma keyword
  por issue**, uma por linha (`Closes #15` / `Closes #16`; `Closes #15 #16` fecha só a
  primeira) — e o workflow nativo "Item closed → Done" do project estar ligado. Confirme os
  vínculos depois de abrir o PR com
  `gh api graphql -f query='{repository(owner:"LucasIsabel",name:"immigrant_be"){pullRequest(number:N){closingIssuesReferences(first:10){nodes{number}}}}}'`.
- `gh pr edit` está quebrado nestes repos (a query inclui `projectCards`, da API Projects
  classic descontinuada). Para editar o corpo de um PR use
  `gh api -X PATCH repos/LucasIsabel/immigrant_be/pulls/N -F body=@arquivo.md`.
- Colunas do board: `Backlog` → `Ready` → `In progress` → `In review` → `Done`.

## Language: English is the default, and it is not optional

**Every code artifact is written in English.** No exceptions, no "just this one
comment", no falling in line with the Portuguese already around it.

That means: identifiers (variables, functions, classes, types, constants),
comments and docblocks, `describe`/`it` names, commit messages, PR and issue
bodies.

**Three things stay as they are:**

1. **Text an end user reads.** Values in `messages/*.json`, screen copy, content
   seeds, e-mail bodies, and the messages the API throws that surface as a toast
   (`throw new NotFoundException('Ingestão não encontrada')`). These are product
   translations: turning them English would break the experience of anyone using
   the app in Portuguese or Spanish.
2. **Markdown files in the repo** — `docs/`, `CLAUDE.md`, `tasks/lessons.md`,
   `plans/`. They are Portuguese and stay Portuguese.
3. **The conversation in chat**, which carries on in Portuguese.

**Write it in English on the first draft.** Rewriting afterwards costs more than
getting it right, and the surrounding Portuguese is the previous convention — an
exception to convert when touched, never a pattern to copy.

## Core Principles

•⁠ ⁠*Simplicity First*: Make every change as simple as possible. Impact minimal code.
•⁠ ⁠*No Laziness*: Find root causes. No temporary fixes. Senior developer standards.
•⁠ ⁠*Minimat Impact*: Changes should only touch what's necessary. Avoid introducing bugs.

## Code Formatting (Prettier + ESLint)

- Generate TypeScript/JavaScript already valid under the project ESLint config (`eslint.config.mjs` with Prettier).
- Assume files will be autoformatted by Prettier; write code in that style (no manual alignment or unusual line breaks).
- Any snippet you propose should pass `pnpm lint` without style changes after formatting.

## Architecture Document

**REQUIRED**: Before proposing or implementing any architectural change, consult `docs/ARCHITECTURE.md`. This document describes the complete architecture, adopted patterns, and each layer’s conventions.

**Rule**: Any PR that modifies the architecture (new modules, new libraries, new models, new guards, new queues, new environment variables) **must** include a corresponding update in `docs/ARCHITECTURE.md`. See section 14 of the document for the full checklist.

## Quick Standards

- **Module structure**: Controller → Service → Repository → Prisma
- **API prefix**: `/api/v1`
- **Admin endpoints**: under `/admin/`
- **Public endpoints**: use `@AllowAnonymous()`
- **DTOs**: class-validator + class-transformer + Swagger decorators
- **Tests**: Jest — unit tests in `*.spec.ts`, E2E in `test/*.e2e-spec.ts`
- **Package manager**: pnpm
- **Path aliases**: `@app/config`, `@app/database`, `@app/ai`

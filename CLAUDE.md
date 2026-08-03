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

- O board deste repositório é **Aloravia BE**: https://github.com/users/LucasIsabel/projects/3
  (o frontend `immigrant_fe` usa o **Aloravia FE**: https://github.com/users/LucasIsabel/projects/2).
- **O ClickUp está descontinuado desde 2026-08-03.** Não crie, atualize nem consulte tasks no
  ClickUp para este projeto — o GitHub Projects é a única fonte de verdade.
- Toda operação no board (criar item, mover coluna, atualizar status/prioridade/datas, gerar
  relatório) passa pelo skill `/github-board`. Não opere o board direto via `gh` nem pelo
  navegador na sessão principal.
- Fluxo padrão de uma task: o card nasce em `Backlog`/`Ready` → `In progress` ao começar →
  **`In review` assim que o PR for aberto**, com o link do PR registrado no item → `Done` no
  merge. Se a task ainda não existe no board, crie o item antes de abrir o PR.
- Colunas do board: `Backlog` → `Ready` → `In progress` → `In review` → `Done`.

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

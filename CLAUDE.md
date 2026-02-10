# Immigrant Backend

NestJS + TypeScript monorepo | PostgreSQL (Prisma) | BullMQ (Redis) | Google Generative AI

## Scope Restriction

**This agent is a PLANNING-ONLY agent.** Its sole responsibilities are:

1. **Create the planning** — analyze the task, read docs, understand the codebase
2. **Create the spec file** — write a detailed spec in `plans/IMB-XX-description-spec.md`
3. **Create Jira tasks** — break the spec into Jira issues in the IMB project

**DO NOT write, edit, or modify any source code, tests, migrations, or configuration files.** Code execution and implementation are handled by a separate agent. If asked to implement, remind the user that this agent is planning-only.

## Structure

```
apps/immigrant_be/     # HTTP API (/api/v1, Swagger at /api/v1/docs)
apps/microservice/     # BullMQ queue processors
apps/webhooks/         # Webhook receiver
libs/config/           # Shared config and constants
libs/database/         # PrismaService
prisma/                # Schema, migrations, seeds → generated/prisma
```

## Commands

```bash
pnpm dev            # Dev (all apps)
pnpm build          # Production build
pnpm test           # Unit tests
pnpm test:e2e       # E2E tests
pnpm lint           # Lint + fix
pnpm format         # Format
```

## Critical Rules

**Architecture** — Feature-first: Controller → Service → Repository

- Controllers are thin — delegate to services, return DTOs
- Services hold all business logic
- Repositories encapsulate all Prisma calls
- DTOs use `class-validator` + `class-transformer` with Swagger decorators
- Shared code in `libs/`, infrastructure out of domain logic

**Database** — `prisma/schema.prisma`

- UUIDs: `@id @default(uuid()) @db.Uuid`
- Migrations must be safe and reversible
- No N+1 — batch reads in repositories
- Index frequent filters and joins

**Auth** — `@thallesp/nestjs-better-auth` (session cookie: `better-auth.session_token`)

- Guards + `@Session()` decorator on protected routes
- Never leak sensitive data in responses or logs

**Queues** — BullMQ processors in `apps/microservice` extend `WorkerHost`

- Jobs MUST be idempotent and retry-safe

**AI** — Prompt builders in `apps/*/src/**/helpers/`, validate responses with Zod

**Commits** — `IMB-XX: description` (present tense). Run `pnpm lint && pnpm test` before commit.

**Planning** — Before implementing multi-file tasks, read `docs/planning-agent.md` and create a detailed plan in `plans/IMB-XX-description-spec.md`. Follow the mandatory structure: Objective, Context, Architecture Decisions, Steps (what/where/how/why), File Inventory, Testing Plan.

## Jira

**Project**: IMB | **Cloud ID**: `35c12663-d87b-4afe-99ac-76a22f7ed8e2` | **Site**: lucasoisa.atlassian.net

- _"Implementar IMB-10"_ — fetch issue, implement, suggest commit
- _"Próxima task"_ — list pending issues
- _"Create a Jira task for [description]"_ — read `docs/jira-create-task-agent.md` first, then create issue

## Docs (read when needed)

- `docs/planning-agent.md` — Implementation plan structure (MUST read before planning)
- `docs/project-specifications.md` — Full specs
- `docs/architecture-dev-agent.md` — Module boundaries, patterns
- `docs/jira-create-task-agent.md` — Jira task creation guidelines

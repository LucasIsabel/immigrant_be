# Immigrant Backend

NestJS + TypeScript monorepo | PostgreSQL (Prisma) | BullMQ (Redis) | Google Generative AI

## Workflow

1. **Plan** — for multi-file tasks, read `docs/planning-agent.md` and create a spec in `plans/IMB-XX-description-spec.md`
2. **Implement** — write code following the Critical Rules below and the relevant agent docs
3. **Test** — run `pnpm lint && pnpm test` and fix all failures before proceeding
4. **Review** — read `docs/review-and-commit.md` and self-review all changes
5. **Commit** — `IMB-XX: description` (present tense), stage only related files

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

## Docs (read on trigger)

### Planning & Project Management

| Doc | Read when... |
|-----|-------------|
| `docs/planning-agent.md` | Starting any task that touches 3+ files, or adding a new feature/module/endpoint |
| `docs/jira-create-task-agent.md` | Creating or breaking down Jira issues in the IMB project |
| `docs/project-specifications.md` | Needing full context on the monorepo architecture, data layer, or tooling |

### Development

| Doc | Read when... |
|-----|-------------|
| `docs/backend-dev-agent.md` | Creating or refactoring NestJS modules, controllers, services, DTOs, or providers |
| `docs/api-dev-agent.md` | Designing REST endpoints, adding Swagger decorators, or handling pagination/status codes |
| `docs/architecture-dev-agent.md` | Making decisions about module boundaries, shared libs, or feature-first layout |
| `docs/database-dev-agent.md` | Changing Prisma schema, creating migrations, optimizing queries, or adding indexes |
| `docs/security-dev-agent.md` | Implementing auth guards, session handling, input validation, or CORS |
| `docs/prompt-engineering-agent.md` | Writing or refining AI prompts for Gemini, GPT, or Grok integrations |

### Quality & Delivery

| Doc | Read when... |
|-----|-------------|
| `docs/testing-dev-agent.md` | Writing or updating unit, integration, or E2E tests |
| `docs/performance-dev-agent.md` | Investigating slow endpoints, adding caching/Redis, optimizing queries, or tuning BullMQ |
| `docs/review-and-commit.md` | Self-reviewing code before commit, or following the commit workflow |

## Code Review & Commit Guide

This guide defines how to review code and create commits using best practices
for this NestJS monorepo (apps in `apps/`, shared libs in `libs/`, Prisma in `prisma/`).

### Review checklist
- Confirm the change matches feature scope and module boundaries.
- Verify controllers are thin and services hold business logic.
- Ensure DTOs validate inputs and responses are documented in Swagger.
- Check Prisma usage, migrations, and data integrity constraints.
- Confirm errors are handled with NestJS exceptions.
- Identify performance risks (N+1 queries, unbounded concurrency, large payloads).
- Ensure secrets are not logged or committed.
- Note any missing tests or untested paths.

### Commit workflow
1) Review changes with `git diff` and confirm scope.
2) Run relevant tests or document why they were skipped.
3) Stage only files related to the change.
4) Write a concise commit message that explains the intent.
5) Verify the working tree after commit.

### Commit message guidelines
- Use the present tense and focus on the "why".
- Keep it short and specific.
- Example:
  - "add visa checklist generation for plan creation"
  - "fix visa selection validation in user plans"

### Stack-specific checks

#### NestJS
- Controllers delegate to services and return DTOs.
- Guards/interceptors/pipes are used consistently.
- Swagger decorators describe public endpoints.

#### Prisma/Postgres
- Migrations are safe and reversible.
- Indexes exist for frequent filters and joins.
- Avoid N+1 query patterns in repositories.

#### BullMQ/Microservices
- Jobs are idempotent and safe to retry.
- Queue processors handle failures and log context.

### Documentation updates
- Update `docs/project-specifications.md` when architecture changes.
- Update README when setup or runtime changes.

### Suggested pre-commit commands
```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
```

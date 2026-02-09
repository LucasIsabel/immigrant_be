## Project Specifications

### Overview
- Backend monorepo built with NestJS and TypeScript.
- Multiple applications under `apps/` with shared libraries under `libs/`.
- PostgreSQL database managed with Prisma.
- Queue processing via BullMQ with Redis.
- AI integration via Google Generative AI.

### Monorepo Structure
- `apps/immigrant_be`: Main HTTP API application.
- `apps/microservice`: Background processing and queue consumers.
- `apps/webhooks`: Webhook receiver service.
- `libs/config`: Shared configuration and constants.
- `libs/database`: Shared Prisma module and database access.
- `prisma/`: Prisma schema, migrations, and seeds.

### Application Architecture
- NestJS modules organized by feature (e.g., `users`, `countries`, `system`, `plan`).
- Controllers define HTTP routes; services hold business logic; repositories handle persistence.
- DTOs used for request/response validation and Swagger documentation.
- Shared modules expose configuration and database access through DI.

### Data Layer
- Prisma schema in `prisma/schema.prisma`.
- Migrations in `prisma/migrations/`.
- Seeds in `prisma/seeds/`.
- Generated Prisma client in `generated/prisma`.
- Database service provided by `libs/database/src/prisma.service.ts`.

### Messaging and Background Jobs
- BullMQ used for job queues.
- Queue configuration centralized in `libs/config`.
- Microservice app hosts queue processors (e.g., plan processing).

### API Documentation
- Swagger enabled in `apps/immigrant_be/src/main.ts`.
- API docs served at `/api/v1/docs`.

### AI/ML Integration
- Google Generative AI used for suggestions and visa guidance.
- Prompt builders located in `apps/*/src/**/helpers/`.
- Zod used to validate AI responses.

### Infrastructure and Local Development
- `docker-compose.yml` provides PostgreSQL (pgvector enabled).
- Environment config handled via `@nestjs/config`.

### Tooling and Scripts
- Package manager: pnpm.
- Build: `pnpm run build`.
- Dev server: `pnpm run dev`.
- Tests: `pnpm run test`, `pnpm run test:e2e`, `pnpm run test:cov`.
- Lint/format: `pnpm run lint`, `pnpm run format`.

### Key Dependencies
- NestJS core packages, Swagger, and microservices.
- Prisma client and migrations.
- BullMQ and ioredis.
- class-validator and class-transformer for DTO validation.
- Zod for AI response validation.

### Conventions
- Feature-first module layout under each app.
- DTO-driven validation and documented responses.
- Shared config and database access via `libs/`.

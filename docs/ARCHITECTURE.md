# Arquitetura do Projeto — Immigrant BE

> **ATENÇÃO AGENTES:** Este documento é a fonte de verdade sobre a arquitetura do projeto.
> Sempre que a arquitetura for alterada (novos módulos, mudanças de padrões, novas libs, novos serviços, alteração de camadas), este documento **DEVE** ser atualizado na mesma PR/commit que introduz a mudança.
> Use este documento como referência antes de propor ou implementar qualquer alteração arquitetural.

---

## 1. Visão Geral

O **Immigrant BE** é um backend construído com **NestJS** em formato **monorepo**, composto por duas aplicações e quatro bibliotecas compartilhadas. O sistema oferece funcionalidades de imigração com sugestões alimentadas por IA, controle de acesso baseado em roles (RBAC) e processamento assíncrono de jobs.

### Stack Principal

| Camada | Tecnologia |
|---|---|
| Framework | NestJS 11 |
| Linguagem | TypeScript (ES2023, NodeNext) |
| ORM | Prisma 6 |
| Banco de dados | PostgreSQL 16 (com pgvector) |
| Cache/Fila | Redis 7 + BullMQ |
| Autenticação | better-auth (sessão via cookie) |
| IA | Google Gemini API |
| Documentação | Swagger (OpenAPI) |
| Testes | Jest |
| Runtime | Node.js 20 |
| Package Manager | pnpm |

---

## 2. Estrutura do Monorepo

```
immigrant_be/
├── apps/
│   ├── immigrant_be/           # App principal — REST API (porta 3000)
│   │   ├── src/
│   │   │   ├── main.ts         # Bootstrap da aplicação
│   │   │   ├── app.module.ts   # Módulo raiz
│   │   │   ├── common/         # Guards, filters, decorators compartilhados
│   │   │   ├── countries/      # Módulo de países
│   │   │   ├── immigration-visa-type/  # Módulo de tipos de visto
│   │   │   ├── users/          # Módulo de usuários
│   │   │   ├── roles/          # Módulo de RBAC
│   │   │   ├── system/         # Módulo de IA/Gemini e sugestões
│   │   │   ├── visa-steps/     # Módulo de etapas de visto
│   │   │   └── health/         # Health checks
│   │   └── test/               # Testes E2E
│   │
│   └── microservice/           # App secundário — processamento de jobs (porta 6000)
│       ├── src/
│       │   ├── main.ts
│       │   ├── microservice.module.ts
│       │   ├── plan/           # Processamento de planos via BullMQ
│       │   └── events/         # Tratamento de eventos
│       └── test/
│
├── libs/                       # Bibliotecas compartilhadas
│   ├── config/                 # Configuração da app + setup do better-auth
│   ├── database/               # PrismaService (módulo global)
│   ├── ai/                     # GeminiBaseService compartilhado
│   └── email/                  # Envio de emails via Resend
│
├── prisma/
│   ├── schema.prisma           # Schema do banco
│   ├── migrations/             # Migrações versionadas
│   └── seeds/                  # Dados de seed
│
├── docs/
│   └── ARCHITECTURE.md         # ← ESTE DOCUMENTO
├── CLAUDE.md                   # Convenções para agentes de IA
├── Dockerfile                  # Build multi-stage
├── docker-compose.yml          # Stack local (Postgres + Redis)
├── nest-cli.json               # Config do monorepo NestJS
└── .github/workflows/ci.yml    # Pipeline CI/CD
```

### Path Aliases (tsconfig.json)

| Alias | Caminho Real |
|---|---|
| `@app/ai/*` | `libs/ai/src/*` |
| `@app/config/*` | `libs/config/src/*` |
| `@app/database/*` | `libs/database/src/*` |
| `@app/email/*` | `libs/email/src/*` |

---

## 3. Padrão Arquitetural por Módulo

Cada feature segue a estrutura **Controller → Service → Repository → Prisma**:

```
módulo/
├── módulo.module.ts        # Declaração do módulo NestJS
├── módulo.controller.ts    # Endpoints HTTP, validação, decorators Swagger
├── módulo.service.ts       # Lógica de negócio
├── módulo.repository.ts    # Acesso ao banco via PrismaService
└── dto/                    # DTOs com class-validator + class-transformer
    ├── create-módulo.dto.ts
    ├── update-módulo.dto.ts
    └── módulo-response.dto.ts
```

### Responsabilidades de cada camada

| Camada | Responsabilidade | NÃO deve fazer |
|---|---|---|
| **Controller** | Receber HTTP, validar input via DTOs, chamar Service, retornar response | Conter lógica de negócio, acessar banco diretamente |
| **Service** | Orquestrar lógica de negócio, aplicar regras, chamar Repository | Acessar PrismaClient diretamente, tratar HTTP |
| **Repository** | Executar queries Prisma, mapear dados | Conter lógica de negócio, lançar HTTP exceptions |
| **DTO** | Validar e tipar dados de entrada/saída | Conter lógica |

---

## 4. Autenticação e Autorização

### Autenticação (better-auth)

- Base path: `/api/v1/auth`
- Mecanismo: **Cookie-based sessions** (`better-auth.session_token`)
- Duração da sessão: **7 dias**
- Cache de cookie: **5 minutos**
- Hash de senha: **bcrypt** (salt rounds: 10)
- Suporte a múltiplos providers via tabela `Accounts`
- **Verificação de email** habilitada no signup (`requireEmailVerification: true`, `sendOnSignUp: true`)
- **Auto sign-in** após verificação (`autoSignInAfterVerification: true`)
- **Reset de senha** via email (`sendResetPassword`)
- Emails enviados via **Resend** (lib `@app/email`)

### Autorização (RBAC)

- **RolesGuard** — guard global que verifica roles do usuário no banco
- **@Roles('ADMIN')** — decorator de método para exigir roles específicas
- **@AllowAnonymous()** — decorator para endpoints públicos (bypass de auth + roles)
- **@Session()** — decorator de parâmetro para injetar a sessão do usuário autenticado
- Roles protegidas do sistema: `user`, `admin` (não podem ser deletadas)
- Relação many-to-many entre User e Role via tabela `UserRoles`

### Fluxo de uma requisição autenticada

```
Request → ThrottlerGuard → RolesGuard → Controller → Service → Repository → DB
             ↓                 ↓
        Rate limit        Verifica sessão
        (100/min)         + roles no banco
```

---

## 5. Banco de Dados (Prisma + PostgreSQL)

### Modelos principais e suas relações

```
Users ─────────┬──── Sessions (1:N)
               ├──── Accounts (1:N) — providers OAuth
               ├──── UserRoles (N:M) ──── Roles
               ├──── Plans (1:N)
               └──── Events (1:N)

Countries ─────┬──── CountryDescription (1:N) — multilíngue
               ├──── ImmigrationVisaType (1:N)
               ├──── VisaTypeRecommendations (1:N)
               └──── Plans (1:N)

Plans ─────────┬──── steps (JSON)
               ├──── documents (JSON)
               └──── status: draft | active | completed

ImmigrationVisaType ── VisaSteps (1:N) — por idioma
```

### Convenções do Schema

- IDs: **UUID** com `@default(uuid())`
- Deleção em cascata para manter integridade
- Unique constraints em campos críticos (email, role name)
- Índices em campos de busca frequente
- Campos JSON para dados dinâmicos (steps, documents)
- Timestamps: `createdAt` e `updatedAt` automáticos

### Comandos úteis

```bash
pnpm prisma migrate dev      # Criar/aplicar migração
pnpm prisma generate         # Regenerar client
pnpm prisma db seed          # Popular dados iniciais
```

---

## 6. Integração com IA (Google Gemini)

### Arquitetura

```
libs/ai/                              # Biblioteca compartilhada de IA
├── gemini-base.service.ts            # Classe base: client Gemini, parseJsonResponse(),
│                                     #   generateEmbeddings(), normalizeEmbedding()
├── schemas/                          # Zod schemas centralizados
│   ├── suggestions.schema.ts         # SuggestionsType
│   ├── visa-recommendation.schema.ts # VisaRecommendationType
│   └── visa-steps.schema.ts          # VisaStepsType
└── prompts/                          # Templates de prompts centralizados
    ├── countries-match.prompt.ts
    ├── best-visa-type.prompt.ts
    └── visa-steps.prompt.ts

apps/immigrant_be/src/system/
├── gemini.service.ts          # Extends GeminiBaseService
│   ├── generateSuggestions()         # Sugestões de país
│   ├── generateVisaSuggestion()      # Recomendação de tipo de visto
│   └── (herdados) generateEmbeddings(), normalizeEmbedding()
└── system.service.ts          # Orquestração (chama Gemini + enriquece com dados)

apps/microservice/src/plan/
└── gemini.service.ts          # Extends GeminiBaseService
    └── generateVisaSteps()           # Gera checklist de etapas do visto
```

### Padrões para IA

- Modelo de geração: `gemini-2.5-flash-lite`
- Modelo de embeddings: `gemini-embedding-001`
- **Herança**: Ambos os apps estendem `GeminiBaseService` de `@app/ai` — sem código duplicado de inicialização, parsing ou embeddings
- **Validação obrigatória** das respostas via **Zod schemas** centralizados em `@app/ai`
- **Prompts centralizados** em `libs/ai/src/prompts/` — importados via `@app/ai`

---

## 6.1. Envio de Emails (Resend)

### Arquitetura

- **Localização**: `libs/email/`
- **Descrição**: Lib de envio de emails via Resend. Contém módulo NestJS (`EmailModule`, `EmailService`), função standalone `sendEmail()` para uso fora do DI, e templates HTML multilíngue (EN/PT-BR/ES) para verificação de email e reset de senha.

### Exportações

| Export | Tipo | Descrição |
|---|---|---|
| `EmailModule` | Módulo NestJS | Módulo importável que registra `EmailService` |
| `EmailService` | Service | Serviço injetável para envio de emails via Resend |
| `sendEmail` | Função standalone | Envio de emails fora do contexto de DI do NestJS |
| `buildVerificationEmail` | Função | Gera template HTML de verificação de email |
| `buildResetPasswordEmail` | Função | Gera template HTML de reset de senha |

---

## 7. Processamento Assíncrono (BullMQ)

### Arquitetura

```
App Principal (API)                    Microservice
      │                                     │
      ├── Adiciona job na fila ────────►    ├── Consome jobs
      │   via BullMQ                        │   via processors
      │                                     │
      └── SSE endpoint ◄────────────── └── Emite eventos
          /api/v1/system/sse               via Redis pub/sub
```

- **Redis** como broker de mensagens
- **Microservice** roda como app separado (porta 6000)
- Comunicação via filas nomeadas (ex: `plan-processing`)
- Eventos notificam o frontend via **Server-Sent Events (SSE)**

---

## 8. API — Rotas e Prefixos

### Prefixo global: `/api/v1`

| Prefixo | Módulo | Acesso |
|---|---|---|
| `/auth/*` | better-auth | Público |
| `/users/plan` | Users | Autenticado |
| `/admin/users` | Users (admin) | ADMIN |
| `/admin/roles` | Roles | ADMIN |
| `/countries` | Countries | Misto (CRUD admin, leitura pública) |
| `/immigration-visa-types` | ImmigrationVisaType | Misto |
| `/visa-steps` | VisaSteps | Misto |
| `/system/suggestions` | System | Público |
| `/system/visa-recommendation` | System | Autenticado |
| `/system/sse` | System | Autenticado |
| `/health` | Health | Público |
| `/health/ready` | Health | Público |

### Convenções de endpoints

- Endpoints administrativos ficam sob `/admin/`
- Endpoints públicos usam `@AllowAnonymous()`
- Documentação Swagger em `/api/v1/docs`
- Rate limiting global: **100 requests por 60 segundos**

---

## 9. Middleware Global

| Ordem | Componente | Descrição |
|---|---|---|
| 1 | **CORS** | Múltiplas origens, credentials: true |
| 2 | **ValidationPipe** | whitelist, transform, forbidNonWhitelisted |
| 3 | **ThrottlerGuard** | Rate limiting (100/60s) |
| 4 | **RolesGuard** | Verifica sessão + roles no banco |
| 5 | **AllExceptionsFilter** | Padroniza respostas de erro com timestamp |

---

## 10. Testes

### Estrutura

| Tipo | Localização | Comando |
|---|---|---|
| Unitários | `*.spec.ts` junto ao arquivo | `pnpm test` |
| E2E | `apps/*/test/*.e2e-spec.ts` | `pnpm test:e2e` |
| Coverage | - | `pnpm test:cov` |

### Padrões de teste

- Mocks de repositories nos testes de service
- Mocks de PrismaService nos testes de repository
- Testes E2E usam banco PostgreSQL separado (`test_db`)
- Framework: **Jest** com **ts-jest**

---

## 11. Docker e CI/CD

### Dockerfile (Multi-stage)

| Stage | Propósito |
|---|---|
| `deps` | Instala dependências com pnpm |
| `build` | Gera Prisma client + compila TypeScript |
| `production` | App principal — porta 3000 |
| `microservice` | Processador de jobs — porta 6000 |

### Docker Compose (desenvolvimento)

| Serviço | Porta | Imagem |
|---|---|---|
| PostgreSQL | 5434 | pgvector/pgvector:pg16 |
| Redis | 6379 | redis:7-alpine |

### CI/CD (GitHub Actions)

Pipeline sequencial: **Lint → Test → Build**
- Trigger: push/PR para `main`
- Node 20 + pnpm
- Services: PostgreSQL + Redis no runner

---

## 12. Suporte Multi-idioma

- Parâmetro `language` nas requisições
- Tabela `CountryDescription` com descrições por idioma
- `VisaSteps` armazena etapas por idioma
- Respostas de IA adaptadas ao idioma solicitado

---

## 13. Variáveis de Ambiente Requeridas

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `PRIVATE_KEY` | Chave privada (base64) para auth |
| `GEMINI_API_KEY` | API key do Google Gemini |
| `NODE_ENV` | development / production / test |
| `PORT_IMMIGRANT` | Porta da API (default: 3000) |
| `PORT_MICROSERVICE` | Porta do microservice (default: 6000) |
| `REDIS_HOST` | Host do Redis |
| `REDIS_PORT` | Porta do Redis |
| `REDIS_USER` | Usuário Redis (opcional) |
| `REDIS_PASSWORD` | Senha Redis |
| `CORS_ORIGINS` | Origens permitidas (separadas por vírgula) |
| `RESEND_API_KEY` | Chave da API do Resend para envio de emails (obrigatória) |
| `FRONTEND_URL` | URL base do frontend para links nos emails (default: `http://localhost:3001`) |
| `EMAIL_FROM` | Endereço remetente dos emails (default: `ImmigrantMatch <onboarding@resend.dev>`) |

---

## 14. Regras para Alteração da Arquitetura

> **Estas regras são obrigatórias para todos os agentes e desenvolvedores.**

1. **Novo módulo de feature**: Adicionar na seção 2 (Estrutura) e na seção 8 (Rotas). Seguir o padrão Controller → Service → Repository → Prisma da seção 3.

2. **Nova biblioteca compartilhada (`libs/`)**: Adicionar na seção 2, criar path alias na seção de aliases, e documentar propósito.

3. **Novo modelo no banco**: Atualizar seção 5 com relações. Executar `prisma migrate dev`.

4. **Nova dependência principal**: Atualizar tabela da seção 1 (Stack Principal) se for uma tecnologia de infraestrutura.

5. **Novo guard/middleware global**: Adicionar na seção 9 (Middleware Global) respeitando a ordem de execução.

6. **Alteração no fluxo de autenticação/autorização**: Atualizar seção 4.

7. **Novo serviço de IA ou modelo**: Atualizar seção 6.

8. **Nova fila ou padrão de processamento assíncrono**: Atualizar seção 7.

9. **Nova variável de ambiente**: Adicionar na seção 13.

10. **Nova app no monorepo**: Adicionar em todas as seções relevantes + Docker (seção 11).

### Checklist para PRs com mudança arquitetural

- [ ] `ARCHITECTURE.md` foi atualizado na mesma PR
- [ ] As seções afetadas refletem o estado atual pós-mudança
- [ ] Nenhuma seção ficou com informação desatualizada ou contraditória

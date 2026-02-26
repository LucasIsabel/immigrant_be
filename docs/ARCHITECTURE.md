# Arquitetura do Projeto — Immigrant BE

> **ATENÇÃO AGENTES:** Este documento é a fonte de verdade sobre a arquitetura do projeto.
> Sempre que a arquitetura for alterada (novos módulos, mudanças de padrões, novas libs, novos serviços, alteração de camadas), este documento **DEVE** ser atualizado na mesma PR/commit que introduz a mudança.
> Use este documento como referência antes de propor ou implementar qualquer alteração arquitetural.

---

## 1. Visão Geral

O **Immigrant BE** é um backend construído com **NestJS** em formato **monorepo**, composto por duas aplicações e quatro bibliotecas compartilhadas. O sistema oferece funcionalidades de imigração com sugestões alimentadas por IA, controle de acesso baseado em roles (RBAC), processamento assíncrono de jobs e armazenamento de arquivos via Cloudflare R2.

### Stack Principal

| Camada                    | Tecnologia                      |
| ------------------------- | ------------------------------- |
| Framework                 | NestJS 11                       |
| Linguagem                 | TypeScript (ES2023, NodeNext)   |
| ORM                       | Prisma 6                        |
| Banco de dados            | PostgreSQL 16 (com pgvector)    |
| Cache/Fila                | Redis 7 + BullMQ                |
| Autenticação              | better-auth (sessão via cookie) |
| IA                        | Google Gemini API               |
| Armazenamento de arquivos | Cloudflare R2 (S3-compatible)   |
| Documentação              | Swagger (OpenAPI)               |
| Testes                    | Jest                            |
| Runtime                   | Node.js 20                      |
| Package Manager           | pnpm                            |

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
│   │   │   ├── blog/           # Módulo de blog (posts, categorias, tags)
│   │   │   ├── ai-blog/        # Módulo de geração de posts com IA (AI Blog Generator)
│   │   │   ├── storage/        # Módulo de upload de arquivos para R2
│   │   │   └── health/         # Health checks
│   │   └── test/               # Testes E2E
│   │
│   └── microservice/           # App secundário — processamento de jobs (porta 6000)
│       ├── src/
│       │   ├── main.ts
│       │   ├── microservice.module.ts
│       │   ├── plan/           # Processamento de planos via BullMQ
│       │   ├── ai-blog/        # Worker de geração de posts com IA
│       │   ├── blog-translation/ # Worker de tradução multilíngue de posts
│       │   └── events/         # Tratamento de eventos
│       └── test/
│
├── libs/                       # Bibliotecas compartilhadas
│   ├── config/                 # Configuração da app + setup do better-auth
│   ├── database/               # PrismaService (módulo global)
│   ├── ai/                     # GeminiBaseService compartilhado
│   └── email/                  # Envio de emails via Resend
│   └── storage/                # StorageService (Cloudflare R2 via S3)
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

| Alias             | Caminho Real          |
| ----------------- | --------------------- |
| `@app/ai/*`       | `libs/ai/src/*`       |
| `@app/config/*`   | `libs/config/src/*`   |
| `@app/database/*` | `libs/database/src/*` |
| `@app/email/*`    | `libs/email/src/*`    |
| `@app/storage/*`  | `libs/storage/src/*`  |

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

| Camada         | Responsabilidade                                                        | NÃO deve fazer                                      |
| -------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| **Controller** | Receber HTTP, validar input via DTOs, chamar Service, retornar response | Conter lógica de negócio, acessar banco diretamente |
| **Service**    | Orquestrar lógica de negócio, aplicar regras, chamar Repository         | Acessar PrismaClient diretamente, tratar HTTP       |
| **Repository** | Executar queries Prisma, mapear dados                                   | Conter lógica de negócio, lançar HTTP exceptions    |
| **DTO**        | Validar e tipar dados de entrada/saída                                  | Conter lógica                                       |

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
               ├──── Plans (1:N)
               └──── AiBlogCronJob (1:N) — cron jobs de geração automática

Plans ─────────┬──── steps (JSON)
               ├──── documents (JSON)
               └──── status: draft | active | completed

ImmigrationVisaType ── VisaSteps (1:N) — por idioma

Users ─────────────── BlogPost (1:N) — como autor (quem publicou)

BlogAuthor ─────────── BlogPost (1:N) — display_author (autor exibido no post, opcional)
Entidade independente: name, bio, avatar_url, website, twitter, linkedin

BlogPost ──────────┬── BlogCategory (N:1)
                   ├── BlogPostTag (1:N) ──── BlogTag (N:M)
                   ├── Country (N:1, opcional) — país em destaque
                   ├── BlogAuthor (N:1, opcional) — display_author
                   └── BlogPostTranslation (1:N) — traduções por locale

BlogPost status: DRAFT | PUBLISHED | ARCHIVED
Slug e reading_time_min gerados automaticamente pelo Service
is_ai_generated: Boolean — marca posts criados pelo AI Blog Generator
original_locale: String (default "pt") — idioma original do post

BlogPostTranslation — traduções de posts do blog
  Campos: id, post_id, locale ("pt"|"en"|"es"), title, excerpt, content,
          translated_by ("AI"|"HUMAN"), created_at, updated_at
  Unique: (post_id, locale)
  Cascade delete com BlogPost

AiBlogCronJob ─── Country (N:1) — país alvo
               └── BullMQ repeatable job (bullmq_job_id)
               Armazena: cron_expr, is_active, last_run_at
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
│   ├── visa-steps.schema.ts          # VisaStepsType
│   ├── blog-post.schema.ts           # BlogPostAiResponse — geração de posts
│   └── blog-translation.schema.ts    # BlogTranslationAiResponse — tradução de posts
└── prompts/                          # Templates de prompts centralizados
    ├── countries-match.prompt.ts
    ├── best-visa-type.prompt.ts
    ├── visa-steps.prompt.ts
    ├── blog-post.prompt.ts           # buildBlogPostPrompt() — usa Google News RSS
    └── blog-translation.prompt.ts    # buildBlogTranslationPrompt() — preserva Markdown

apps/immigrant_be/src/system/
├── gemini.service.ts          # Extends GeminiBaseService
│   ├── generateSuggestions()         # Sugestões de país
│   ├── generateVisaSuggestion()      # Recomendação de tipo de visto
│   └── (herdados) generateEmbeddings(), normalizeEmbedding()
└── system.service.ts          # Orquestração (chama Gemini + enriquece com dados)

apps/microservice/src/plan/
└── gemini.service.ts          # Extends GeminiBaseService
    └── generateVisaSteps()           # Gera checklist de etapas do visto

apps/microservice/src/ai-blog/
└── ai-blog.service.ts         # Usa GeminiBaseService diretamente
    ├── fetchGoogleNewsRss()          # Busca Google News RSS (sem API key)
    └── generatePost()                # RSS → Gemini → BlogPost DRAFT
```

### Padrões para IA

- Modelo de geração: `gemini-2.5-flash-lite`
- Modelo de embeddings: `gemini-embedding-001`
- Modelo de geração de imagens: `gemini-2.5-flash-image`
- **Herança**: Ambos os apps estendem `GeminiBaseService` de `@app/ai` — sem código duplicado de inicialização, parsing ou embeddings
- **Validação obrigatória** das respostas via **Zod schemas** centralizados em `@app/ai`
- **Prompts centralizados** em `libs/ai/src/prompts/` — importados via `@app/ai`
- `generateImage(prompt)` em `GeminiBaseService` — retorna `Buffer | null` com dados base64 decodificados

---

## 6.1. Envio de Emails (Resend)

### Arquitetura

- **Localização**: `libs/email/`
- **Descrição**: Lib de envio de emails via Resend. Contém módulo NestJS (`EmailModule`, `EmailService`), função standalone `sendEmail()` para uso fora do DI, e templates HTML multilíngue (EN/PT-BR/ES) para verificação de email e reset de senha.

### Exportações

| Export                    | Tipo              | Descrição                                         |
| ------------------------- | ----------------- | ------------------------------------------------- |
| `EmailModule`             | Módulo NestJS     | Módulo importável que registra `EmailService`     |
| `EmailService`            | Service           | Serviço injetável para envio de emails via Resend |
| `sendEmail`               | Função standalone | Envio de emails fora do contexto de DI do NestJS  |
| `buildVerificationEmail`  | Função            | Gera template HTML de verificação de email        |
| `buildResetPasswordEmail` | Função            | Gera template HTML de reset de senha              |

---

## 7. Armazenamento de Arquivos (Cloudflare R2)

### Arquitetura

```
libs/storage/
└── storage.service.ts        # StorageService: uploadFile(), deleteFile(),
                              #   listFiles(), listFolders()
                              # Usa @aws-sdk/client-s3 — S3-compatible API

apps/immigrant_be/src/storage/
├── storage.module.ts         # Importa StorageLibModule de @app/storage
├── storage.controller.ts     # POST /api/v1/storage/upload (público, autenticado)
├── admin-storage.controller.ts # Endpoints admin (ADMIN role)
└── dto/
    ├── upload-response.dto.ts
    └── storage-file-item.dto.ts
```

### Endpoint de Upload (público)

- `POST /api/v1/storage/upload` — `multipart/form-data`, campo `file`
- Query param `folder` (default: `uploads`) — determina a pasta no bucket
- Autenticado (sessão ativa, sem `@AllowAnonymous`)
- Tamanho máximo: **10 MB**
- Tipos permitidos: `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `application/pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`
- Resposta: `{ url, key, size, mimeType, originalName }`
- Nomes de arquivo gerados com UUID para evitar colisão e path traversal

### Endpoints Admin (`ADMIN` role)

- `GET /api/v1/admin/storage/folders` — lista pastas únicas no bucket (prefixos comuns via `Delimiter: '/'`)
- `GET /api/v1/admin/storage/files?folder=` — lista arquivos de uma pasta ou de todo o bucket
- `POST /api/v1/admin/storage/upload?folder=` — upload sem restrição de mime, tamanho máximo **50 MB**
- `DELETE /api/v1/admin/storage/file?key=` — deleta arquivo pelo key; retorna `204 No Content`

### URL Pública

```
${CLOUDFLARE_R2_PUBLIC_URL}/${folder}/${uuid}.${ext}
```

### AI Blog Cover Images

O `AiBlogWorkerService` injeta `StorageService` e, após gerar o conteúdo do post, chama `GeminiBaseService.generateImage()` para criar a imagem de capa. Se bem-sucedido, faz upload para o folder `blog/` e preenche `cover_image_url` no `BlogPost`. Falhas são logadas como `warn` — o post é criado sem imagem de capa em vez de abortar.

---

## 8. Processamento Assíncrono (BullMQ)

### Arquitetura

```
App Principal (API)                    Microservice
      │                                     │
      ├── Adiciona job na fila ────────►    ├── Consome jobs
      │   via BullMQ                        │   via processors
      │                                     │
      └── SSE endpoint ◄────────────── └── Emite eventos (insert em `events`)
          /api/v1/system/sse               API faz poll + marca delivered
```

- **Redis** como broker de mensagens
- **Microservice** roda como app separado (porta 6000)
- Comunicação via filas nomeadas
- Eventos notificam o frontend via **Server-Sent Events (SSE)**
- Ao concluir um job, o consumer grava um registro na tabela `events` (status `pending`). O endpoint `/system/sse` faz polling a cada 1s, consume o evento (marca `delivered`) e envia ao cliente. O frontend exibe toast com título e mensagem da tarefa concluída.

### Filas existentes

| Fila                     | Constante                | Jobs                                           | Descrição                                    |
| ------------------------ | ------------------------ | ---------------------------------------------- | -------------------------------------------- |
| `plan_queue`             | `PLAN_QUEUE`             | `process_create_plan`                          | Geração de planos de imigração               |
| `ai_blog_queue`          | `AI_BLOG_QUEUE`          | `generate_ai_blog_post`                        | Geração de posts de blog com IA              |
| `ai_blog_image_queue`    | `AI_BLOG_IMAGE_QUEUE`    | `generate_ai_blog_image`                       | Geração assíncrona de imagem de capa do post |
| `blog_translation_queue` | `BLOG_TRANSLATION_QUEUE` | `translate_blog_post`, `translate_all_pending` | Tradução automática via Gemini (EN + ES)     |

A fila `ai_blog_queue` suporta **repeatable jobs** com expressão cron, configurada dinamicamente pelo módulo `ai-blog` quando um `AiBlogCronJob` é criado/ativado.

A fila `ai_blog_image_queue` é enfileirada após a criação do post (DRAFT), permitindo que a geração de imagem ocorra de forma **assíncrona e independente**. O campo `cover_image_url` é `null` inicialmente e atualizado pelo consumer `AiBlogImageConsumer` via `prisma.blogPost.update()` assim que a imagem é gerada e enviada ao storage.

A fila `blog_translation_queue` suporta **repeatable job diário** (`translate_all_pending` às 03:00 UTC) registrado por `BlogTranslationCronService` via `OnModuleInit`. O job `translate_all_pending` busca todos os posts PUBLISHED sem tradução para EN e ES, e enfileira jobs individuais `translate_blog_post`. O endpoint `POST /admin/blog/posts/:id/translations/enqueue` permite acionar traduções sob demanda.

---

## 8. API — Rotas e Prefixos

### Prefixo global: `/api/v1`

| Prefixo                                      | Módulo                    | Acesso                              |
| -------------------------------------------- | ------------------------- | ----------------------------------- |
| `/auth/*`                                    | better-auth               | Público                             |
| `/users/plan`                                | Users                     | Autenticado                         |
| `/admin/users`                               | Users (admin)             | ADMIN                               |
| `/admin/roles`                               | Roles                     | ADMIN                               |
| `/countries`                                 | Countries                 | Misto (CRUD admin, leitura pública) |
| `/immigration-visa-types`                    | ImmigrationVisaType       | Misto                               |
| `/visa-steps`                                | VisaSteps                 | Misto                               |
| `/system/suggestions`                        | System                    | Público                             |
| `/system/visa-recommendation`                | System                    | Autenticado                         |
| `/system/sse`                                | System                    | Autenticado                         |
| `/blog/posts`                                | Blog                      | Público                             |
| `/blog/posts/admin`                          | Blog (admin inline)       | ADMIN                               |
| `/blog/posts/:slug`                          | Blog                      | Público                             |
| `/blog/categories`                           | Blog                      | Público                             |
| `/blog/tags`                                 | Blog                      | Público                             |
| `/blog/authors`                              | Blog                      | Público                             |
| `/blog/authors/:id`                          | Blog                      | Público                             |
| `/admin/blog/posts`                          | Blog (admin)              | ADMIN                               |
| `/admin/blog/categories`                     | Blog (admin)              | ADMIN                               |
| `/admin/blog/tags`                           | Blog (admin)              | ADMIN                               |
| `/admin/blog/authors`                        | Blog (admin)              | ADMIN                               |
| `/admin/blog/authors/:id`                    | Blog (admin)              | ADMIN                               |
| `/admin/blog/posts/:id/translations`         | Blog Translations (admin) | ADMIN                               |
| `/admin/blog/posts/:id/translations/:locale` | Blog Translations (admin) | ADMIN                               |
| `/admin/blog/posts/:id/translations/enqueue` | Blog Translations (admin) | ADMIN                               |
| `/admin/ai/blog/generate`                    | AI Blog                   | ADMIN                               |
| `/admin/ai/blog/pending`                     | AI Blog                   | ADMIN                               |
| `/admin/ai/blog/pending/:id/approve`         | AI Blog                   | ADMIN                               |
| `/admin/ai/blog/cron`                        | AI Blog                   | ADMIN                               |
| `/storage/upload`                            | Storage                   | Autenticado                         |
| `/health`                                    | Health                    | Público                             |
| `/health/ready`                              | Health                    | Público                             |

### Convenções de endpoints

- Endpoints administrativos ficam sob `/admin/`
- Endpoints públicos usam `@AllowAnonymous()`
- Documentação Swagger em `/api/v1/docs`
- Rate limiting global: **100 requests por 60 segundos**

---

## 9. Middleware Global

| Ordem | Componente              | Descrição                                  |
| ----- | ----------------------- | ------------------------------------------ |
| 1     | **CORS**                | Múltiplas origens, credentials: true       |
| 2     | **ValidationPipe**      | whitelist, transform, forbidNonWhitelisted |
| 3     | **ThrottlerGuard**      | Rate limiting (100/60s)                    |
| 4     | **RolesGuard**          | Verifica sessão + roles no banco           |
| 5     | **AllExceptionsFilter** | Padroniza respostas de erro com timestamp  |

---

## 10. Testes

### Estrutura

| Tipo      | Localização                  | Comando         |
| --------- | ---------------------------- | --------------- |
| Unitários | `*.spec.ts` junto ao arquivo | `pnpm test`     |
| E2E       | `apps/*/test/*.e2e-spec.ts`  | `pnpm test:e2e` |
| Coverage  | -                            | `pnpm test:cov` |

### Padrões de teste

- Mocks de repositories nos testes de service
- Mocks de PrismaService nos testes de repository
- Testes E2E usam banco PostgreSQL separado (`test_db`)
- Framework: **Jest** com **ts-jest**

---

## 11. Docker e CI/CD

### Dockerfile (Multi-stage)

| Stage          | Propósito                               |
| -------------- | --------------------------------------- |
| `deps`         | Instala dependências com pnpm           |
| `build`        | Gera Prisma client + compila TypeScript |
| `production`   | App principal — porta 3000              |
| `microservice` | Processador de jobs — porta 6000        |

### Docker Compose (desenvolvimento)

| Serviço    | Porta | Imagem                 |
| ---------- | ----- | ---------------------- |
| PostgreSQL | 5434  | pgvector/pgvector:pg16 |
| Redis      | 6379  | redis:7-alpine         |

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
- **Blog Posts**: tabela `BlogPostTranslation` persiste traduções por locale (`pt` | `en` | `es`)
  - Query param `?lang=en` nos endpoints públicos aplica overlay de tradução (fallback para PT se ausente)
  - Admin pode gerenciar traduções manualmente (`PUT /admin/blog/posts/:id/translations/:locale`)
  - Worker `blog-translation` gera traduções automáticas via Gemini (cron diário 03:00 UTC ou sob demanda)

---

## 13. Variáveis de Ambiente Requeridas

| Variável                          | Descrição                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `DATABASE_URL`                    | Connection string PostgreSQL                                                      |
| `PRIVATE_KEY`                     | Chave privada (base64) para auth                                                  |
| `GEMINI_API_KEY`                  | API key do Google Gemini                                                          |
| `NODE_ENV`                        | development / production / test                                                   |
| `PORT_IMMIGRANT`                  | Porta da API (default: 3000)                                                      |
| `PORT_MICROSERVICE`               | Porta do microservice (default: 6000)                                             |
| `REDIS_HOST`                      | Host do Redis                                                                     |
| `REDIS_PORT`                      | Porta do Redis                                                                    |
| `REDIS_USER`                      | Usuário Redis (opcional)                                                          |
| `REDIS_PASSWORD`                  | Senha Redis                                                                       |
| `CORS_ORIGINS`                    | Origens permitidas (separadas por vírgula)                                        |
| `RESEND_API_KEY`                  | Chave da API do Resend para envio de emails (obrigatória)                         |
| `FRONTEND_URL`                    | URL base do frontend para links nos emails (default: `http://localhost:3001`)     |
| `EMAIL_FROM`                      | Endereço remetente dos emails (default: `ImmigrantMatch <onboarding@resend.dev>`) |
| `CLOUDFLARE_R2_ACCESS_KEY_ID`     | Access Key ID do token S3 do R2                                                   |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Secret Access Key do token S3 do R2                                               |
| `CLOUDFLARE_R2_ACCOUNT_ID`        | Account ID da conta Cloudflare                                                    |
| `CLOUDFLARE_R2_BUCKET_NAME`       | Nome do bucket R2 (ex: `immigrant`)                                               |
| `CLOUDFLARE_R2_PUBLIC_URL`        | URL pública do bucket R2                                                          |

---

## 14. Regras para Alteração da Arquitetura

**Estas regras são obrigatórias para todos os agentes e desenvolvedores.**

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

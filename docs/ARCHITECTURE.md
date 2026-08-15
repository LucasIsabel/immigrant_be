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
| Logging                   | pino (via nestjs-pino)          |
| Monitoramento de erros    | Sentry (`@sentry/nestjs`)       |
| Painel de filas           | Bull Board                      |
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
│   │   │   ├── countriesnow/   # Proxy público CountriesNow (países/estados/cidades/moeda)
│   │   │   ├── immigration-visa-type/  # Módulo de tipos de visto
│   │   │   ├── users/          # Módulo de usuários
│   │   │   ├── roles/          # Módulo de RBAC
│   │   │   ├── system/         # Módulo de IA/Gemini e sugestões
│   │   │   ├── visa-steps/     # Módulo de etapas de visto
│   │   │   ├── blog/           # Módulo de blog (posts, categorias, tags)
│   │   │   ├── ai-blog/        # Módulo de geração de posts com IA (AI Blog Generator)
│   │   │   ├── storage/        # Módulo de upload de arquivos para R2
│   │   │   ├── professional-profile/ # Módulo de perfil profissional do usuário
│   │   │   ├── business/       # Módulo de negócios locais de imigrantes (My City)
│   │   │   ├── business-pages/ # Módulo de páginas públicas de negócios (My City)
│   │   │   ├── publisher-qualification/ # Módulo de qualificação automática de publishers
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

### Nome de campo em DTO é contrato de banco

Os repositories espalham o DTO direto em `prisma.*.create` / `.update`, sem
camada de mapeamento. Um campo com nome que não existe no schema não é barrado
pela `ValidationPipe` — ele chega ao Prisma, que lança
`PrismaClientValidationError`, e o cliente recebe um 500 opaco.

Por isso:

- **Campo de DTO usa o nome da coluna**, em snake_case, como no `schema.prisma`.
- **`Update*Dto` deriva do `Create*Dto`** com `PartialType` (e `OmitType` para o
  que não pertence ao update, como relações). Escrever o update à mão é o que
  permite os dois lados divergirem sem ninguém perceber — foi assim que quatro
  campos de `UpdateCountryDto` ficaram em camelCase por meses.
- A pipe roda com `forbidNonWhitelisted: true`, então renomear campo de DTO é
  **breaking change**: o cliente que ainda manda o nome antigo passa a levar 400.

---

## 4. Autenticação e Autorização

### Autenticação (better-auth)

- Base path: `/api/v1/auth`
- Mecanismo: **Cookie-based sessions** (`better-auth.session_token`)
- Duração da sessão: **7 dias**
- Cache de cookie: **5 minutos**
- **Cookies entre subdomínios**: controlado pela env var `COOKIE_DOMAIN` (ex.: `.aloravia.com`), **não** por `NODE_ENV`. Quando definida, `crossSubDomainCookies` é habilitado com esse `domain`, permitindo que o frontend (`aloravia.com`) leia o cookie setado pela API (`api.aloravia.com`). Sem `COOKIE_DOMAIN`, o cookie fica *host-only* (adequado para dev em `localhost`).
- Hash de senha: **bcrypt** (salt rounds: 10)
- Suporte a múltiplos providers via tabela `Accounts`
- **Verificação de email**: Obrigatória para login. Usuário só pode fazer login após verificar o email.
  - `autoSignIn: false` — cadastro não cria sessão; usuário é redirecionado para página de verificação
  - `requireEmailVerification: true` — login retorna 403 se email não verificado
  - `sendOnSignUp: true` / `sendOnSignIn: true` — email de verificação enviado no cadastro e reenviado ao tentar login sem verificar
  - `autoSignInAfterVerification: true` — ao clicar no link do email, usuário é logado automaticamente
  - Envio de email via **Resend** (`libs/config/src/email.ts`). Env vars: `RESEND_API_KEY`, `EMAIL_FROM`

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

Countries ─────┬──── CountryTranslation (1:N) — todo o texto voltado ao usuário
               ├──── ImmigrationVisaType (1:N)
               ├──── VisaTypeRecommendations (1:N)
               ├──── Plans (1:N)
               └──── AiBlogCronJob (1:N) — cron jobs de geração automática

Plans ─────────┬──── completed_step_keys (String[]) — só a identidade do progresso
               ├──── selected_visa_type_id — de onde o texto dos steps é lido
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

AiGeneratedImage ─── Users (N:1) — quem solicitou a geração
  Armazena: prompt, folder, key, url, mimeType, isPublic, status (pending|processing|completed|failed), errorMessage
  Usado pelo Media Generator (admin): geração de imagens via Gemini e upload para R2

UserProfessionalProfile ─── Users (1:1, opcional) — perfil profissional do usuário
  Armazena: jobTitle, company, linkedinUrl, githubUrl, websiteUrl, bio, skills (String[]),
            yearsOfExperience, location, isPublic (default true)
  Perfil público acessível sem autenticação via GET /professional-profile/:userId

Business ─── Users (N:1) — negócio local de um imigrante
  Tabela: businesses
  Enum BusinessType: RESTAURANT | LEGAL | TOUR_GUIDE | GENERAL
  Armazena: userId (FK), businessType, name, city, lat, lng, photos (String[]),
            draftData (Json?, opcional) — rascunho de edição; `PUT /business/:id` grava apenas aqui;
            `POST /business/:id/draft/publish` aplica ao vivo e limpa; `DELETE /business/:id/draft` descarta o rascunho;
            typeData (Json — dados específicos por tipo, validados via Zod no Service),
            isPublic (default false)
  Listagem pública disponível via GET /business/public (diretório "My City")
  Filtro geoespacial por raio: quando os params lat, lng e radius (km) são enviados,
    BusinessRepository.findPublic() delega para findPublicByRadius(), que executa
    Haversine SQL via Prisma.$queryRaw para buscar apenas os IDs dentro do raio e
    depois hidrata os registros completos via Prisma ORM (preserva mapeamento camelCase).
    Negócios sem lat/lng são excluídos quando o filtro de raio está ativo.
    Sem os três params, o caminho Prisma ORM padrão é mantido sem alterações.
  Verificação de propriedade (ownership check) nas operações de update/delete/visibility

BusinessPage ─── Business (1:1) — página pública moderada de um negócio
  Tabela: business_pages
  Status: DRAFT | PENDING_REVIEW | APPROVED | APPROVED_WITH_PENDING | REJECTED
  Armazena: businessId (FK único), slug (único após primeira aprovação via slugLockedAt),
            businessType, pendingContent (Json), approvedContent (Json),
            submittedAt, approvedAt, approvedById, rejectedAt, rejectionReason, slugLockedAt
  Conteúdo em dois estágios: pendingContent (editável pelo owner) e approvedContent (versão ao vivo)
  Cada blob JSON pode incluir `typeData` (objeto opcional) — snapshot por tipo na versão da página (ex.: menu em RESTAURANT), distinto do `typeData` ao vivo na tabela `Business`; na aprovação, o conteúdo aprovado copia `pendingContent` (incluindo `typeData` quando existir).
  Fluxo: DRAFT → PENDING_REVIEW → APPROVED | REJECTED; re-edição: APPROVED → APPROVED_WITH_PENDING
  Página pública acessível sem autenticação via GET /pg/:businessType/:slug

PublisherQualification ─── Business (1:1) — qualificação automática do publisher
  Tabela: publisher_qualifications
  PK: businessId (UUID, aponta diretamente para Business)
  Armazena: isQualified, qualifiedAt, disqualifiedAt, totalApprovals, lastRejectionAt
  Critérios automáticos (calculados em runtime): totalApprovals >= 3, emailVerified,
    accountAge >= 30 dias, sem rejeição nos últimos 90 dias, perfil completo (name + city)
  Override manual (admin): overrideActive, overrideValue, overrideById (FK Users),
    overrideReason, overrideAt — quando overrideActive=true, ignora critérios automáticos
  Ciclo: criado automaticamente na primeira aprovação/rejeição de página;
    publisher qualificado tem suas submissões aprovadas diretamente sem moderação
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

### Seed de países — garantia de não-destrutividade

`prisma/seeds/countries.seed.ts` reconcilia `immigration_visa_types` por
`(country_id, category)`: atualiza a categoria existente **preservando o id**, cria a nova e
apenas **reporta** (nunca apaga) a que existe no banco mas não está no seed.

Isso não é preferência de estilo, é requisito: `visa_steps.visa_type_id` tem
`ON DELETE CASCADE` e `plans.selected_visa_type_id` tem `ON DELETE SET NULL`. Apagar um tipo de
visto destrói os steps associados e desvincula o plano do usuário. Remoção de categoria obsoleta
deve ser uma decisão humana explícita, nunca efeito colateral de rodar o seed.

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
│   ├── blog-post.schema.ts           # BlogPostAiResponse — geração de posts
│   ├── blog-translation.schema.ts    # BlogTranslationAiResponse — tradução de posts
│   └── business-page-moderation.schema.ts # Entrada/saída da moderação de páginas (admin)
└── prompts/                          # Templates de prompts centralizados
    ├── countries-match.prompt.ts
    ├── best-visa-type.prompt.ts
    ├── blog-post.prompt.ts           # buildBlogPostPrompt() — usa Google News RSS
    ├── blog-translation.prompt.ts    # buildBlogTranslationPrompt() — preserva Markdown
    └── business-page-moderation.prompt.ts # Moderação de conteúdo de páginas públicas (admin)

apps/immigrant_be/src/business-pages/
└── business-page-moderation.service.ts  # Moderação IA (admin): GeminiBaseService + validação Zod

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

| Export                    | Tipo              | Descrição                                                |
| ------------------------- | ----------------- | -------------------------------------------------------- |
| `EmailModule`             | Módulo NestJS     | Módulo importável que registra `EmailService`            |
| `EmailService`            | Service           | Serviço injetável para envio de emails via Resend        |
| `sendEmail`               | Função standalone | Envio de emails fora do contexto de DI do NestJS         |
| `buildVerificationEmail`  | Função            | Gera template HTML de verificação de email               |
| `buildResetPasswordEmail` | Função            | Gera template HTML de reset de senha                     |
| `buildApprovalEmail`      | Função            | Gera template HTML de aprovação de página (My City)      |
| `buildRejectionEmail`     | Função            | Gera template HTML de reprovação de página (My City)     |

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
| `ai_blog_queue`          | `AI_BLOG_QUEUE`          | `generate_ai_blog_post`                        | Geração de posts de blog com IA              |
| `ai_blog_image_queue`    | `AI_BLOG_IMAGE_QUEUE`    | `generate_ai_blog_image`                       | Geração assíncrona de imagem de capa do post |
| `ai_image_queue`         | `AI_IMAGE_QUEUE`         | `generate_ai_image`                            | Geração de imagens via Gemini (Media Generator) |
| `blog_translation_queue` | `BLOG_TRANSLATION_QUEUE` | `translate_blog_post`, `translate_all_pending` | Tradução automática via Gemini (EN + ES)     |

A fila `ai_blog_queue` suporta **repeatable jobs** com expressão cron, configurada dinamicamente pelo módulo `ai-blog` quando um `AiBlogCronJob` é criado/ativado.

A fila `ai_blog_image_queue` é enfileirada após a criação do post (DRAFT), permitindo que a geração de imagem ocorra de forma **assíncrona e independente**. O campo `cover_image_url` é `null` inicialmente e atualizado pelo consumer `AiBlogImageConsumer` via `prisma.blogPost.update()` assim que a imagem é gerada e enviada ao storage.

A fila `ai_image_queue` é usada pelo módulo **AI Image** (Media Generator): o admin enfileira uma geração via `POST /admin/ai-image/generate`; o consumer `AiImageConsumer` processa o job chamando `GeminiBaseService.generateImage()`, faz upload para o R2 na pasta informada e atualiza o registro `AiGeneratedImage` (status, url, key).

A fila `blog_translation_queue` suporta **repeatable job diário** (`translate_all_pending` às 03:00 UTC) registrado por `BlogTranslationCronService` via `OnModuleInit`. O job `translate_all_pending` busca todos os posts PUBLISHED sem tradução para EN e ES, e enfileira jobs individuais `translate_blog_post`. O endpoint `POST /admin/blog/posts/:id/translations/enqueue` permite acionar traduções sob demanda.

---

## 8. API — Rotas e Prefixos

### Prefixo global: `/api/v1`

| Prefixo                                      | Módulo                    | Acesso                                     |
| -------------------------------------------- | ------------------------- | ------------------------------------------ |
| `/auth/*`                                    | better-auth               | Público                                    |
| `GET /users/me`                              | Users                     | Autenticado                                |
| `PATCH /users/me`                            | Users                     | Autenticado (nome, imagem, bio)            |
| `PATCH /users/me/preferences`                | Users                     | Autenticado (emailNotificationsEnabled)    |
| `/users/plan`                                | Users                     | Autenticado                                |
| `GET /users/plan/:id?language=`              | Users                     | Autenticado (steps resolvidos no idioma)   |
| `PATCH /users/plan/:id/step`                 | Users                     | Autenticado (troca `completed_step_keys`)  |
| `/users/plan/from-country`                   | Users                     | Autenticado (criar plano a partir de país) |
| `/admin/users`                               | Users (admin)             | ADMIN                                      |
| `/admin/roles`                               | Roles                     | ADMIN                                      |
| `/countries`                                 | Countries                 | Misto (CRUD admin, leitura pública)        |
| `PUT /countries/:id/translations/:language`  | Countries                 | ADMIN (upsert da cópia por idioma)         |
| `GET /countriesnow/countries`                | CountriesNow              | Público (proxy CountriesNow + cache 24h)   |
| `GET /countriesnow/states?country=`          | CountriesNow              | Público (estados por país; cache 24h)      |
| `GET /countriesnow/cities?country=&state=`   | CountriesNow              | Público (cidades por estado; cache 24h)    |
| `GET /countriesnow/currency`                 | CountriesNow              | Público (moeda; fallback REST Countries)   |
| `/immigration-visa-types`                    | ImmigrationVisaType       | Misto                                      |
| `/visa-steps`                                | VisaSteps                 | Misto                                      |
| `/admin/visa-steps/translate`                | VisaSteps (tradução)      | ADMIN                                      |
| `/system/suggestions`                        | System                    | Público                                    |
| `/system/visa-recommendation`                | System                    | Autenticado                                |
| `/system/sse`                                | System                    | Autenticado                                |
| `/blog/posts`                                | Blog                      | Público                                    |
| `/blog/posts/admin`                          | Blog (admin inline)       | ADMIN                                      |
| `/blog/posts/:slug`                          | Blog                      | Público                                    |
| `/blog/categories`                           | Blog (categorias com count de posts PUBLISHED) | Público                                    |
| `/blog/tags`                                 | Blog                      | Público                                    |
| `/blog/authors`                              | Blog                      | Público                                    |
| `/blog/authors/:id`                          | Blog                      | Público                                    |
| `/admin/blog/posts`                          | Blog (admin)              | ADMIN                                      |
| `/admin/blog/categories`                     | Blog (admin)              | ADMIN                                      |
| `/admin/blog/tags`                           | Blog (admin)              | ADMIN                                      |
| `/admin/blog/authors`                        | Blog (admin)              | ADMIN                                      |
| `/admin/blog/authors/:id`                    | Blog (admin)              | ADMIN                                      |
| `/admin/blog/posts/:id/translations`         | Blog Translations (admin) | ADMIN                                      |
| `/admin/blog/posts/:id/translations/:locale` | Blog Translations (admin) | ADMIN                                      |
| `/admin/blog/posts/:id/translations/enqueue` | Blog Translations (admin) | ADMIN                                      |
| `/admin/ai/blog/generate`                    | AI Blog                   | ADMIN                                      |
| `/admin/ai-image/generate`                  | AI Image                  | ADMIN                                      |
| `/admin/ai-image`                            | AI Image                  | ADMIN (listar imagens geradas)              |
| `/admin/ai-image/:id`                       | AI Image                  | ADMIN                                      |
| `/admin/ai-image/:id` (DELETE)              | AI Image                  | ADMIN                                      |
| `/admin/ai/blog/pending`                     | AI Blog                   | ADMIN                                      |
| `/admin/ai/blog/pending/:id/approve`         | AI Blog                   | ADMIN                                      |
| `/admin/ai/blog/cron`                        | AI Blog                   | ADMIN                                      |
| `/storage/upload`                            | Storage                   | Autenticado                                |
| `/health`                                    | Health                    | Público                                    |
| `/health/ready`                              | Health                    | Público                                    |
| `GET /professional-profile/me`               | ProfessionalProfile       | Autenticado                                |
| `PUT /professional-profile/me`               | ProfessionalProfile       | Autenticado (role USER)                    |
| `GET /professional-profile/:userId`          | ProfessionalProfile       | Público (`@AllowAnonymous`)                |
| `GET /business/me`                           | Business                  | Autenticado (role USER) — lista negócios do usuário |
| `POST /business`                             | Business                  | Autenticado (role USER) — cria negócio     |
| `PUT /business/:id`                          | Business                  | Autenticado (role USER) — guarda rascunho em `draftData` (validação de `typeData`); não altera campos ao vivo até publicar |
| `POST /business/:id/draft/publish`           | Business                  | Autenticado (role USER) — aplica `draftData` aos campos do negócio e limpa o rascunho |
| `DELETE /business/:id/draft`                 | Business                  | Autenticado (role USER) — descarta `draftData` sem alterar o negócio ao vivo |
| `DELETE /business/:id`                       | Business                  | Autenticado (role USER) — remove (ownership check) |
| `PATCH /business/:id/visibility`             | Business                  | Autenticado (role USER) — alterna isPublic (ownership check) |
| `GET /business/public`                                     | Business                       | Público (`@AllowAnonymous`) — lista negócios públicos com filtros (city, businessType, search, page, limit) |
| `GET /business/public/:id`                                 | Business                       | Público (`@AllowAnonymous`) — detalhe de negócio público                                                   |
| `GET /pg/:businessType/:slug`                              | BusinessPages                  | Público (`@AllowAnonymous`) — detalhe de página aprovada                                                   |
| `GET /business-pages/slug-availability`                    | BusinessPages                  | Autenticado — verifica disponibilidade de slug                                                             |
| `POST /business-pages`                                     | BusinessPages                  | Autenticado (role USER) — cria página (DRAFT)                                                              |
| `GET /business-pages/my/:businessId`                       | BusinessPages                  | Autenticado (role USER) — detalhe da própria página; inclui `isPublisherQualified` (PublisherQualification) |
| `PUT /business-pages/:id/content`                          | BusinessPages                  | Autenticado (role USER) — atualiza `pendingContent` (DTO `UpdateBusinessPageContentDto`; campo opcional `typeData` como objeto para snapshots por tipo, ex. cardápio) |
| `POST /business-pages/:id/submit`                          | BusinessPages                  | Autenticado (role USER) — submete para revisão (ou aprova diretamente se publisher qualificado)            |
| `GET /admin/business-pages`                                | BusinessPages (admin)          | ADMIN — lista páginas com filtro opcional por status                                                       |
| `POST /admin/business-pages/:id/approve`                   | BusinessPages (admin)          | ADMIN — aprova submissão, envia email ao owner                                                             |
| `POST /admin/business-pages/:id/reject`                    | BusinessPages (admin)          | ADMIN — reprova submissão com motivo opcional, envia email ao owner                                        |
| `GET /admin/business-pages/:id`                            | BusinessPages (admin)          | ADMIN — detalhe: `pendingContent`, `approvedContent`, negócio e utilizador (folha de revisão)              |
| `POST /admin/business-pages/:id/moderate`                  | BusinessPages (admin)          | ADMIN — moderação de conteúdo via Gemini (`pendingContent`, fallback `approvedContent`); analisa pornografia, linguagem obscena, links adultos, violações de normas off-platform e abuso de contactos; resposta `ModerationResult` (`riskLevel`, `flags`, `summary`, `recommendation`) |
| `GET /admin/publishers`                                    | PublisherQualification (admin) | ADMIN — lista qualificações de publishers com critérios calculados                                         |
| `GET /admin/publishers/:businessId`                        | PublisherQualification (admin) | ADMIN — detalhe de um publisher                                                                            |
| `POST /admin/publishers/:businessId/override`              | PublisherQualification (admin) | ADMIN — aplica override manual (forçar qualificado ou bloquear)                                            |
| `DELETE /admin/publishers/:businessId/override`            | PublisherQualification (admin) | ADMIN — remove override, restaura critérios automáticos                                                    |
| `POST /business-pages/:id/upload/logo`                     | BusinessPages                  | Autenticado (role USER) — upload da logo; multipart/form-data, campo `file`; JPEG/PNG/WebP, máx 5 MB; chave R2 determinística `business-pages/{businessId}/logo.{ext}` |
| `POST /business-pages/:id/upload/cover`                    | BusinessPages                  | Autenticado (role USER) — upload da foto de capa; mesmas restrições; chave R2 `business-pages/{businessId}/cover.{ext}` |

**Business pages (admin) — moderação IA:** `BusinessPageModerationService` (`apps/immigrant_be/src/business-pages/business-page-moderation.service.ts`) injeta `GeminiBaseService`, monta o input a partir do conteúdo da página, chama a IA e valida a resposta com Zod. Prompt em `libs/ai/src/prompts/business-page-moderation.prompt.ts`; schemas em `libs/ai/src/schemas/business-page-moderation.schema.ts`.

### Health

| Rota                    | Checa              | Resposta                                                  |
| ----------------------- | ------------------ | --------------------------------------------------------- |
| `GET /health`           | Prisma + Redis     | 200 quando tudo responde; 503 nomeando o serviço que caiu |
| `GET /health/ready`     | Prisma + Redis     | Idem                                                       |
| `GET /health/live`      | nada               | Sempre 200 enquanto o processo estiver de pé              |

O healthcheck do container deve apontar para `/health/live`. Apontá-lo para
`/health` transforma uma queda do Postgres em loop de restart.

O `AllExceptionsFilter` repassa o corpo do Terminus intacto no 503, para que a
resposta diga **qual** dependência caiu:

```json
{
  "status": "error",
  "info": { "database": { "status": "up" } },
  "error": { "redis": { "status": "down" } },
  "details": { "database": { "status": "up" }, "redis": { "status": "down" } }
}
```

### Origem dos dados

Cada endpoint tem fonte, cadência de atualização e comportamento em falha
documentados em [`docs/DATA_SOURCES.md`](./DATA_SOURCES.md). Endpoint novo que
sirva dado ao usuário entra lá junto com o PR que o cria.

### Convenções de endpoints

- Endpoints administrativos ficam sob `/admin/`
- Endpoints públicos usam `@AllowAnonymous()`
- Documentação Swagger em `/api/v1/docs`
- Rate limiting global: **100 requests por 60 segundos**

---

## 9. Middleware Global

| Ordem | Componente                   | Descrição                                                       |
| ----- | ---------------------------- | --------------------------------------------------------------- |
| 1     | **correlationIdMiddleware**  | Abre o contexto de correlação; aceita e ecoa `x-request-id`      |
| 2     | **pino-http**                | Log estruturado da requisição, já com `correlationId`            |
| 3     | **CORS**                     | Múltiplas origens, credentials: true, expõe `x-request-id`       |
| 4     | **ValidationPipe**           | whitelist, transform, forbidNonWhitelisted                       |
| 5     | **ThrottlerGuard**           | Rate limiting (100/60s)                                          |
| 6     | **RolesGuard**               | Verifica sessão + roles no banco                                 |
| 7     | **AllExceptionsFilter**      | Padroniza erros, reporta 5xx ao Sentry, preserva payload do health |

### Correlation ID

`libs/config/src/request-context.ts` mantém um `AsyncLocalStorage` que é a fonte
única do ID da requisição em curso. Ele é lido pelo `mixin` do pino (todo log
sai com `correlationId`), pelo `AllExceptionsFilter` (vira a tag
`correlation_id` no Sentry) e pelos producers de fila, que gravam
`correlationId` no job data (`libs/config/src/job-data.ts`). Os consumers
reidratam o contexto com `runWithCorrelationId`, usando `job.id` como fallback
para jobs de cron e para jobs enfileirados antes do campo existir.

Resultado: um request HTTP, o job que ele enfileirou e o evento de erro no
Sentry compartilham o mesmo identificador.

### Observabilidade

- **Sentry** é inicializado por `apps/*/src/instrument.ts`, que precisa ser o
  primeiro import do `main.ts` de cada app. A captura é **explícita** (no filtro
  HTTP e em `reportJobFailure`) em vez de depender da auto-instrumentação: o
  build é bundlado por webpack, onde os hooks de `require-in-the-middle` não são
  confiáveis. Sem `SENTRY_DSN` o SDK sobe desabilitado.
- **Falha de job** só é reportada na tentativa final (`isFinalAttempt`), senão
  uma falha com `attempts: 3` viraria três alertas.
- **Bull Board** fica em `GET /api/v1/admin/queues` — o `setGlobalPrefix` se
  aplica à rota montada por middleware. É protegido por basic auth
  (`BULL_BOARD_USER` / `BULL_BOARD_PASSWORD`) e não pelo `RolesGuard`, que não
  roda em middleware Express. Em produção o módulo só é montado se as duas
  credenciais existirem.

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
- Tabela `CountryTranslation` com **todo o texto de país voltado ao usuário** por idioma:
  `description`, `benefits`, `challenges`, `processing_time`, `investment_required`,
  `language_requirement`. Unique em `(country_id, language)`.
  - `difficulty` (`Easy`|`Moderate`|`Hard`) e `job_market` (`Strong`|`Moderate`|`Weak`) **não**
    ficam aqui: são vocabulário fechado, permanecem como código em `countries` e o FE traduz
    via `messages/*.json`. Traduzi-los por país repetiria a mesma string 34 vezes.
  - `visa_options` e `popular_cities` também permanecem em `countries` — são nomes próprios.
  - O repository devolve **todos** os idiomas (`translations: true`) e o cliente escolhe;
    no BE, use o helper `pickTranslation(translations, language)`, que faz fallback para `en`
    e depois para qualquer linha existente.
  - **Escrita**: `POST /countries` exige `translations` com pelo menos o idioma de fallback
    (`en`) — país e cópia nascem no mesmo nested write, porque um país sem tradução renderiza
    em branco em todos os idiomas. Para corrigir um idioma sem tocar nos outros, use
    `PUT /countries/:id/translations/:language`, que faz upsert por `(country_id, language)`.
  - O vocabulário de idiomas vive em `SUPPORTED_LANGUAGES` (`country-translation.util.ts`) e é
    validado **no service**, não só no DTO: o unique aceita qualquer string, então um locale
    digitado errado no path viraria uma linha permanente que ninguém lê.
- `VisaSteps` armazena etapas por idioma — uma linha por `(visa_type_id, language)`.
  - Cada item do blob carrega uma **`key` estável, idêntica nos três idiomas**, derivada do nome
    em inglês no seed (`slugifyStepKey`). A chave é a identidade do step; `name` e `notes` são a
    projeção dela em um idioma.
  - **`Plans` não copia os steps.** O plano guarda só `completed_step_keys` (`String[]`) e o
    `selected_visa_type_id`; o texto é resolvido a cada leitura de `GET /users/plan/:id?language=`.
    É isso que faz a troca de idioma preservar o progresso — antes o plano era um retrato
    congelado no idioma da criação, com a conclusão indexada pelo nome traduzido.
  - Fallback de leitura: idioma pedido → `en`. **Nunca `pt`.**
  - `progress` conta apenas os steps `required`, alinhado ao que a barra do dashboard exibe.
    Antes o backend contava todos e os dois números discordavam.
  - `PUT /admin/visa-steps/:id` valida **paridade de chaves** contra os outros idiomas do mesmo
    visa type: editar um idioma pode mudar o texto, nunca o conjunto de chaves. Sem essa guarda,
    um blob editado à mão desalinharia os idiomas e os steps desmarcariam sozinhos na troca de
    locale.
- Respostas de IA adaptadas ao idioma solicitado
- **Blog Posts**: tabela `BlogPostTranslation` persiste traduções por locale (`pt` | `en` | `es`)
  - Query param `?lang=en` nos endpoints públicos aplica overlay de tradução (fallback para PT se ausente)
  - Admin pode gerenciar traduções manualmente (`PUT /admin/blog/posts/:id/translations/:locale`)
  - Worker `blog-translation` gera traduções automáticas via Gemini (cron diário 03:00 UTC ou sob demanda)

---

## 13. Variáveis de Ambiente Requeridas

| Variável                          | Descrição                                             |
| --------------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`                    | Connection string PostgreSQL                          |
| `PRIVATE_KEY`                     | Chave privada (base64) para auth                      |
| `GEMINI_API_KEY`                  | API key do Google Gemini                              |
| `NODE_ENV`                        | development / production / test                       |
| `PORT_IMMIGRANT`                  | Porta da API (default: 3000)                          |
| `PORT_MICROSERVICE`               | Porta do microservice (default: 6000)                 |
| `REDIS_HOST`                      | Host do Redis                                         |
| `REDIS_PORT`                      | Porta do Redis                                        |
| `REDIS_USER`                      | Usuário Redis (opcional)                              |
| `REDIS_PASSWORD`                  | Senha Redis                                           |
| `CORS_ORIGINS`                    | Origens permitidas (separadas por vírgula)            |
| `COOKIE_DOMAIN`                   | Domínio do cookie de sessão p/ subdomínios (ex: `.aloravia.com`); opcional |
| `CLOUDFLARE_R2_ACCESS_KEY_ID`     | Access Key ID do token S3 do R2                       |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Secret Access Key do token S3 do R2                   |
| `CLOUDFLARE_R2_ACCOUNT_ID`        | Account ID da conta Cloudflare                        |
| `CLOUDFLARE_R2_BUCKET_NAME`       | Nome do bucket R2 (ex: `immigrant`)                   |
| `CLOUDFLARE_R2_PUBLIC_URL`        | URL pública do bucket R2                              |
| `RESEND_API_KEY`                  | API key do Resend para envio de emails de verificação |
| `EMAIL_FROM`                      | Email remetente (domínio verificado no Resend)        |
| `SENTRY_DSN`                      | DSN do Sentry; sem ele o SDK fica desabilitado (opcional) |
| `SENTRY_TRACES_SAMPLE_RATE`       | Amostragem de tracing, 0 a 1 (default: `0`)           |
| `LOG_LEVEL`                       | Nível do pino: fatal/error/warn/info/debug/trace (default: `info`) |
| `BULL_BOARD_USER`                 | Usuário do basic auth do Bull Board (opcional)        |
| `BULL_BOARD_PASSWORD`             | Senha do basic auth do Bull Board (opcional; em produção o board só sobe com o par definido) |

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

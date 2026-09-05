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
| IA                        | OpenRouter (multi-modelo) + Google Gemini |
| Armazenamento de arquivos | Cloudflare R2 (S3-compatible)   |
| Documentação              | Swagger (OpenAPI)               |
| Logging                   | pino (via nestjs-pino)          |
| Monitoramento de erros    | Sentry (`@sentry/nestjs`)       |
| Painel de filas           | Bull Board                      |
| Testes                    | Jest                            |
| Runtime                   | Node.js 22                      |
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
│   │   │   ├── places/        # Lugares turísticos (público) + API admin de ingestões
│   │   │   ├── immigration-visa-type/  # Módulo de tipos de visto
│   │   │   ├── users/          # Módulo de usuários
│   │   │   ├── roles/          # Módulo de RBAC
│   │   │   ├── system/         # Módulo de IA/Gemini e sugestões
│   │   │   ├── visa-steps/     # Módulo de etapas de visto
│   │   │   ├── blog/           # Módulo de blog (posts, categorias, tags)
│   │   │   ├── blog-personas/  # CRUD admin da equipe de reportagem (BlogPersona)
│   │   │   ├── ai-blog/        # Módulo de geração de posts com IA (AI Blog Generator)
│   │   │   ├── ai-config/      # Modelo por cenário de IA (OpenRouter / Gemini)
│   │   │   ├── ai-image/       # Media Generator (imagens avulsas)
│   │   │   ├── queues/         # API JSON de inspeção/controle das filas (admin)
│   │   │   ├── bull-board/     # Dashboard Bull Board (break-glass, /admin/queues-board)
│   │   │   ├── storage/        # Módulo de upload de arquivos para R2
│   │   │   ├── professional-profile/ # Módulo de perfil profissional do usuário
│   │   │   ├── my-city/        # Contagens da tela My City (uma chamada, quatro abas)
│   │   │   ├── business/       # Módulo de negócios locais de imigrantes (My City)
│   │   │   ├── business-pages/ # Módulo de páginas públicas de negócios (My City)
│   │   │   ├── event-interest/ # Fase 0 de eventos: captura pública de interesse de organizadores
│   │   │   ├── community-events/ # Eventos da comunidade: criação autenticada, agenda pública e moderação
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
│   ├── ai/                     # AiRouterService (multi-provider) + GeminiBaseService
│   ├── immigration/            # Regras de imigração puras (livre circulação UE/EEE/Suíça)
│   ├── ingestion/              # Port de despacho da ingestão de lugares + adapter BullMQ
│   ├── notifications/          # A única escrita de notificação: sino in-app + e-mail opcional
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
| `@app/immigration` | `libs/immigration/src` |
| `@app/ingestion`  | `libs/ingestion/src`  |
| `@app/email/*`    | `libs/email/src/*`    |
| `@app/notifications/*` | `libs/notifications/src/*` |
| `@app/storage/*`  | `libs/storage/src/*`  |

---

## 3. Padrão Arquitetural por Módulo

Cada feature segue a estrutura **Controller → Service → Repository → Prisma**.
Exceção: módulos que falam só com infraestrutura (ex.: `queues/` → BullMQ)
não têm repository nem Prisma — o Service injeta as filas e o Controller
expõe HTTP.

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
               ├──── AiBlogCronJob (1:N) — cron jobs de geração automática
               └──── Place (1:N, opcional) — FK anulável; ver abaixo
  `iso2` (VarChar(2), anulável, único quando presente) é o código ISO 3166-1
  alpha-2 do país. Existe porque `name` não serve para decidir regra: a livre
  circulação UE/EEE/Suíça compara dois códigos, e sem a coluna o destino não
  tinha como ser comparado com o passaporte. Anulável só porque a coluna nasceu
  em 62 linhas já existentes e o admin pode criar país sem ela — o seed preenche
  todos os 62, e a etapa de reconciliação reescreve o valor a cada execução.

Place ─────────── PlaceTranslation (1:N) — só description e tip
  category: LANDMARK | MUSEUM | NATURE | BEACH | VIEWPOINT | FOOD_MARKET | NIGHTLIFE | NEIGHBORHOOD
  A chave de busca é `countryCode` (ISO2), não o FK: o seletor do frontend
  trabalha com ISO2 vindo do CountriesNow, e o lugar existe para países que não
  são destino de imigração e portanto não têm linha em `countries` (a coluna
  `Country.iso2` cobre só os 62 destinos). O FK liga o lugar ao destino de
  imigração quando ele existe, e é anulável porque nem todo país com lugar
  precisa ser destino.
  `city` é string livre, como em `Business` — não existe model City. O valor tem
  de ser o do CountriesNow ("Lisbon", não "Lisboa"), senão a cidade escolhida
  no frontend nunca casa com os lugares. `name` não é traduzido de propósito:
  é o que está na placa e no mapa.

CityIngestion ─── Place (1:N) — uma tentativa de popular os lugares de uma cidade
  status: PROCESSING | FAILED | READY_FOR_REVIEW | APPROVED | REJECTED
  A revisão é por CIDADE, não por lugar: ~186 cidades × ~10 lugares seriam 1.800
  decisões, e trabalho que ninguém faz vira conteúdo que nunca sai do rascunho.
  O admin vê os ~10 lugares de uma cidade e decide de uma vez, podendo rejeitar
  ou editar lugares individuais dentro dela.
  Não há model "PlaceCandidate": o `Place` em `reviewStatus: DRAFT` já é o
  candidato, e um segundo model seria código morto.
  `osmAreaId`/`osmMatchedName` guardam o resultado da resolução de área no OSM,
  para o retry não repetir a consulta — e porque o nome que o OSM usa ("Lisboa")
  não é o da nossa lista de cidades ("Lisbon").
  `stats` guarda os contadores da execução e a lista de conflitos com lugares já
  curados; essa lista é a métrica de redescoberta do piloto.

Place.reviewStatus: DRAFT | APPROVED | REJECTED
  Default `APPROVED` de propósito: os 30 lugares que já existiam foram curados à
  mão e estão no ar — esse é o estado verdadeiro deles, e a migration não
  precisou de backfill. A ingestão automática sempre grava `DRAFT`.
  `REJECTED` não é lixo: a linha fica como memória, para a re-ingestão da cidade
  não recriar um lugar que alguém já recusou.
  Proveniência (`wikidataId`/`sourceUrl`/`wikipediaMonthlyViews`/
  `generatedByModel`/`generationCostUsd`; `osmType`/`osmId` só nos registros
  anteriores à descoberta no Wikidata) serve a saber de onde veio cada campo
  quando alguém questionar o dado. O
  `popularityScore` é derivado de `wikipediaMonthlyViews`, guardado cru para a
  ordem ser auditável.

Plans ─────────┬──── completed_step_keys (String[]) — só a identidade do progresso
               ├──── selected_visa_type_id — de onde o texto dos steps é lido
               ├──── documents (JSON)
               └──── status: draft | active | completed

ImmigrationVisaType ── VisaSteps (1:N) — por idioma
ImmigrationVisaType ──┬── processing_time / estimated_cost (nullable) — só onde a fonte declara
                      └── main_requirements (String[]) — derivado dos templates de steps

Users ─────────────── BlogPost (1:N) — como autor (quem publicou)

BlogAuthor ─────────── BlogPost (1:N) — display_author (autor exibido no post, opcional)
Entidade independente: name, bio, avatar_url, website, twitter, linkedin
BlogAuthor ─────────── BlogPersona (1:1) — byline pública da persona; a bio declara autoria por IA

BlogPersona ────────── BlogPost (1:N) — colunista de IA (opcional)
  theme: IMMIGRATION | TOURISM | CUISINE | GEOPOLITICS
  tagline: String? (VARCHAR 120) — recorte do colunista, mostrado entre
    parênteses no dropdown do newsroom
  editorial_stance: string (RESTRICTIONIST | PROGRESSIVE | DISCOVERY |
    BALANCED_TRAVEL | GASTRONOMY | ANALYST no seed)
  Guardrails de conteúdo NÃO moram na tabela — vivem em
  `libs/ai/src/prompts/persona-guardrails.ts`, em três blocos escolhidos pelo
  tema: PERSONA_GUARDRAILS (IMMIGRATION), PERSONA_GUARDRAILS_LIFESTYLE
  (TOURISM, CUISINE) e PERSONA_GUARDRAILS_ANALYSIS (GEOPOLITICS)

BlogPost ──────────┬── BlogCategory (N:1)
                   ├── BlogPostTag (1:N) ──── BlogTag (N:M)
                   ├── Country (N:1, opcional) — país em destaque
                   ├── BlogAuthor (N:1, opcional) — display_author
                   ├── BlogPersona (N:1, opcional)
                   └── BlogPostTranslation (1:N) — traduções por locale

BlogPost status: DRAFT | PUBLISHED | ARCHIVED
Slug e reading_time_min gerados automaticamente pelo Service
is_ai_generated: Boolean — marca posts criados pelo AI Blog Generator
original_locale: String (default "en") — idioma original do post
persona_id, debate_group_id, moderation_flag — colunas de opinião (nulas nos posts sem persona)
A API pública devolve `persona {slug,name,tagline,theme,editorial_stance}` e
`counterpart_slug` do outro post publicado com o mesmo `debate_group_id`

BlogPostTranslation — traduções de posts do blog
  Campos: id, post_id, locale ("pt"|"en"|"es"), title, excerpt, content,
          translated_by ("AI"|"HUMAN"), created_at, updated_at
  Unique: (post_id, locale)
  Cascade delete com BlogPost

BlogCategoryTranslation ─── BlogCategory (N:1) — o nome da categoria noutro idioma
  Tabela: blog_category_translations
  Chaves: unique (category_id, locale) e unique (locale, slug)
  Espelha BlogPostTranslation, e pela mesma razão: o leitor em /en via o título, o resumo e
    o corpo do post traduzidos — e por cima deles a categoria em português, porque a
    categoria não tinha onde guardar outra língua.
  Post nasce em inglês; categoria nasce em português. Daí `BlogCategory.original_locale` e
    `translationTargetsFor()` em libs/config: `TRANSLATION_LOCALES` é a lista de destinos
    *de post*, e só está certa porque post é escrito em inglês.
  O slug é traduzido junto com o nome e gerado no servidor (`slugify`), nunca pelo modelo.
    A rota pública resolve as duas grafias, então link já partilhado nunca quebra.
  Falta de tradução mostra o nome original, não esconde a categoria — esconder transformaria
    uma falha temporária da IA num buraco de navegação.
  Gatilhos: criar e renomear enfileiram `TRANSLATE_BLOG_CATEGORY` (a fila engole a falha —
    criar categoria não pode depender do Redis); o cron das 03:00 varre o que faltou;
    `scripts/backfill-category-translations.ts` cobre as que existiam antes.

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
            openingHours (Json? — a semana de funcionamento) e timezone (IANA),
            typeData (Json — dados específicos por tipo, validados via Zod no Service),
            — `type-data.schemas.ts` é o contrato dos dois caminhos de escrita (`POST /business` e
              o `pendingContent` da página). **Todo campo tem teto**: é coluna JSON, e sem limite
              uma requisição forjada grava um megabyte que a página renderiza. Os tetos não são
              regra de produto (exceto as 6 fotos por parada, que espelham o formulário) — são o
              ponto em que o conteúdo deixa de ser conteúdo. O 400 nomeia o caminho completo
              (`itinerary[2].description`) e o limite, em português, numa string: o
              `extractApiErrorMessage` do FE lê `message` e joga direto no toast.,
            isPublic (default false)
  **Horário de funcionamento** (`business/opening-hours.schema.ts`): por dia, ou `{closed:true}`
    ou uma lista de 1..4 intervalos `HH:MM`. Substituiu duas strings livres que uma máscara
    reduzia a uma janela só — o dono digitava `12:00–15:00 e 19:00–23:00 (fechado à segunda)` e
    ficava `12:00 - 15:00`. Três decisões que valem lembrar:
    - **Coluna própria, não `typeData`.** Os três tipos que mostram horário tinham cada um a sua
      gambiarra, e horário é **fato**, não conteúdo editorial: fora do conteúdo moderado da
      página, corrigir um horário deixa de exigir re-moderação.
    - **Dia ausente ≠ fechado.** Ausente é "não informado", e quem lê responde `unknown` em vez de
      anunciar um negócio como fechado num dia sobre o qual ninguém disse nada.
    - **A meia-noite mora no schema.** `close < open` significa atravessar para o dia seguinte
      (`19:00–02:00` no sábado = aberto até domingo às 02:00), e só o último intervalo do dia pode
      atravessar. Quem calcula "aberto agora" tem de olhar também o intervalo transbordante do dia
      **anterior** — sem isso o bar às 01:30 aparece fechado. É a regra que quebra a comparação
      ingênua `abre ≤ agora ≤ fecha`, e por isso ela fica junto do dado.
  **`timezone`** é IANA, validado pelo `IsIanaTimeZone` (`common/decorators/`, que decide pelo ICU
    do runtime em vez de por uma lista a manter). Sem ele **nenhuma superfície afirma "aberto
    agora"** — o relógio do visitante responderia pelo lugar errado, que era o bug original: um
    leitor em São Paulo era informado de que um restaurante em Lisboa estava aberto, com quatro
    horas de erro.

  `isPublic` significa UMA coisa: o negócio aparece no diretório do My City — é o que o
    interruptor promete ao dono ("Listar publicamente no My City"), e é o que alimenta a
    listagem, o mapa e a elegibilidade de eventos.
    Ele NÃO governa se a página pública consegue ler o negócio. Governava por acidente, e o
    efeito era uma página `APPROVED` no ar com preços sem símbolo de moeda e sem galeria,
    porque as duas coisas vêm do registro do negócio. `findVisibleById` (usado só pelo
    GET /business/public/:id) responde quando o negócio está listado **ou** quando a página
    dele está `APPROVED`/`APPROVED_WITH_PENDING`: uma página que a plataforma aprovou já é
    pública por esse fato. As listagens do diretório continuam honrando só o `isPublic`.
  As rotas públicas (`GET /business/public` e `/business/public/:id`) respondem com
    `PublicBusinessResponseDto`, uma allowlist — e o repositório usa `select`, não
    `include`, então os campos que ficam de fora nem saem do Postgres. Fora de propósito:
    `draftData` (o rascunho não publicado do dono, que era legível por quem tivesse o id),
    `userId` (quem é dono de qual listagem) e `isPublic` (anunciaria a escolha de não
    aparecer no diretório). O `BusinessResponseDto` do dono continua completo.
  Listagem pública disponível via GET /business/public (diretório "My City"), com
    filtro por `country` (nome, que é o que o negócio guarda) além de `city`: nomes de
    cidade repetem-se pelo mundo — Córdoba é argentina e espanhola, e sem o país as
    duas respondem juntas. O nome basta porque os dois lados leem o mesmo catálogo do
    CountriesNow; um `countryCode` no model seria mais sólido e é migration com
    backfill, decidida quando a identidade do país pesar mais.
  GET /business/public/cities devolve as cidades que têm negócios listados, agrupadas
    por nome de país e cidade, **com o centro** (média das coordenadas dos negócios,
    null se nenhum tiver). O centro serve à busca por proximidade: escolher "Porto" tem
    de poder alcançar um negócio em Vila Nova de Gaia, a quatro quilómetros — o FE
    resolve o centro pelos lugares da cidade e, se não houver, por este. Existe porque o seletor de cidade do FE vinha de um
    catálogo de terceiros que não nomeia todas as cidades — 46 das 107 do distrito do
    Porto faltavam —, e um negócio numa delas era inalcançável. Declarada **antes** de
    `public/:id`, que senão engole "cities" como id.
  Comparação de cidade pela coluna `city_key`, não por `city`: os nomes chegam de dois
    catálogos do CountriesNow que discordam nos acentos (a lista plana de Portugal não
    tem nenhum em 673 nomes; a lista por distrito tem 27 em 107 só no Porto), então
    `Póvoa de Varzim` e `Povoa de Varzim` não se encontravam. `city` continua a ser o
    que o dono escreveu e o que a tela mostra; só a busca é dobrada. A chave é derivada
    por `normalizeCity` em `BusinessRepository`, num único ponto por onde passam todas
    as escritas ao vivo, e é **NOT NULL** — uma chave ausente esconderia o negócio da
    busca em silêncio, e é melhor que uma escrita esquecida estoure.
  Pré-filtro por caixa delimitadora antes do Haversine (`bounding-box.ts`), com índice
    `@@index([lat, lng])`. Sem ele o Postgres calculava a distância de todas as linhas
    públicas — `Seq Scan`, 52 ms com 200 mil negócios, e o bloco "por perto" dispara
    isso em toda visualização de cidade; com ele, 0,5 ms, e o tempo deixa de subir com
    a tabela. A caixa é **pré-filtro**: é mais larga que o círculo (nos cantos admite
    √2 raios) e quem decide continua a ser o Haversine. O limite de longitude é omitido
    junto dos polos e sobre o antimeridiano, onde um `BETWEEN` não exprime o intervalo.
  Filtro geoespacial por raio: quando os params lat, lng e radius (km) são enviados,
    BusinessRepository.findPublic() delega para findPublicByRadius(), que executa
    Haversine SQL via Prisma.$queryRaw para buscar apenas os IDs dentro do raio e
    depois hidrata os registros completos via Prisma ORM (preserva mapeamento camelCase).
    Negócios sem lat/lng recuam para o centro da própria cidade — a média dos
    outros negócios públicos com o mesmo `city_key`. São dois ramos num `OR`, e não
    um `COALESCE(b.lat, c.lat)`: o COALESCE sobre a coluna juntada não é indexável
    e devolveria a consulta ao Seq Scan que a caixa delimitadora existe para evitar.
    Buraco assumido: cidade onde nenhum negócio tem coordenada não tem centro, e os
    de lá continuam fora — fecha assim que um deles for geocodificado.
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

CommunityEvent ─┬── Users (N:1, "OrganizedEvents") — quem publicou
                ├── Users (N:1, opcional, "ApprovedEvents"/"RejectedEvents") — o admin que moderou
                ├── Business (N:1, opcional) — negócio anfitrião; FK anulável (SetNull)
                └── CommunityEventReport (1:N) — denúncias anónimas
  Tabela: community_events
  Enum CommunityEventStatus: DRAFT | PENDING_REVIEW | APPROVED | REJECTED | CANCELLED
  Enum CommunityEventCategory: CONCERT | FAIR | MEETUP | WORKSHOP | EXHIBITION | SPORTS | FOOD | OTHER
  `Events` já é a tabela de notificações do utilizador — daí `CommunityEvent`, e não `Event`.
  Desde 2026-09-05 ela é também a **caixa de entrada**: ganhou `readAt` (nulo = por ler, e
  é isso que o contador do sino conta) mais três índices — `(userId, status)` para o poll do
  SSE, `(userId, createdAt desc)` para a listagem e `(userId, readAt)` para o contador.
  O nome infeliz fica: renomear não é aditivo, e o código a correr ficaria sem tabela na
  janela do deploy.
  Armazena: organizerId (FK), slug (único), title, description (Markdown, 20–8000, sem HTML),
            imageUrl (capa; obrigatório só para submeter), images (galeria ordenada, até 8 URLs),
            category, startsAt/endsAt (instantes UTC), timezone (IANA),
            countryCode + city (string livre, como em Business/Place), venueName, venueAddress,
            lat/lng (obrigatórios — geolocalização exata), businessId (FK opcional),
            contactEmail/contactPhone (ao menos um), isFree, priceNote, externalUrl, minAge,
            termsVersion + termsAcceptedAt, submittedAt, approvedAt/approvedById,
            rejectedAt/rejectedById/rejectionReason
  **Fuso.** É a primeira entidade em que "que horas" é local por natureza: nenhum outro
    `DateTime` do schema guarda fuso. `startsAt`/`endsAt` são instantes; `timezone` é o que
    permite exibir "sábado, 21h" e responder "hoje" no dia **da cidade**. Os filtros
    `when=today|weekend` correm em SQL (`(starts_at AT TIME ZONE 'UTC') AT TIME ZONE timezone`)
    porque duas linhas da mesma lista podem estar em fusos diferentes.
  **Capa e galeria.** `imageUrl` é a capa (og:image) e continua a ser o que o `submit` exige;
    `images` é a galeria, um `String[] @default([])` no molde de `Business.photos`. A ordem do
    array é a ordem da página — `PATCH /events/:id` aceita `images` apenas como permutação ou
    subconjunto do que já está gravado, porque acrescentar é o que a rota de upload faz.
  **Descrição em Markdown.** O campo é Markdown renderizado no frontend com HTML cru desligado;
    o backend recusa qualquer tag (400 "Descrição não pode conter HTML"), para que nem uma
    futura mudança de renderizador possa servir markup que alguém gravou.
  **Termo versionado.** A criação exige `acceptTerms: true` e `termsVersion` igual à constante
    `COMMUNITY_EVENT_TERMS_VERSION` do módulo; versão antiga é 400. O texto do termo é conteúdo
    de utilizador e vive no frontend.
  Ciclo: DRAFT → PENDING_REVIEW → APPROVED | REJECTED; CANCELLED a qualquer momento.
    Editar (ou trocar a capa de) um evento APPROVED devolve-o a PENDING_REVIEW e limpa
    `approvedAt`/`approvedById` — some do público até nova aprovação. O slug é regenerado
    enquanto DRAFT/REJECTED e congela depois da primeira aprovação, para o link partilhado
    continuar a funcionar.
  Teto de 5 eventos em PENDING_REVIEW por organizador (409 na criação): a fila é revista à mão.

CommunityEventReport ─── CommunityEvent (N:1) — denúncia anónima de um evento aprovado
  Tabela: community_event_reports
  Armazena: eventId (FK, cascade), reason, createdAt — o denunciante não é identificado
  A aprovação segura o que chega; a denúncia segura o que passou. O admin vê `reportCount` na
  fila e as denúncias no detalhe, e `reject` num evento APPROVED é a derrubada.

TourGuideReview ─── Business (N:1) / Users (N:1) — avaliação de um guia turístico
  Tabela: tour_guide_reviews
  Uma por utilizador por negócio (unique businessId+userId); o dono não avalia o próprio.
  O nome exibido vem de `user.name` na leitura, nunca de coluna gravada: `author_name` era
    digitado por quem avaliava, ou seja, podia ser o nome de qualquer pessoa. A coluna ficou
    nullable e deixou de ser escrita — o DROP vem quando o FE parar de enviar o campo.
  Ocultar (soft): hiddenAt, hiddenBy (FK Users, SetNull), hiddenReason — some da listagem
    pública e da média; é reversível e o motivo fica. Apagar é hard delete, para conteúdo que
    não pode ficar guardado, com o motivo em log antes da linha sair.

TourGuideReviewReport ─── TourGuideReview (N:1) — denúncia anónima de uma avaliação
  Tabela: tour_guide_review_reports
  Armazena: reviewId (FK, cascade), reason, createdAt — o denunciante não é identificado
  Mesmo desenho do CommunityEventReport, e pela mesma razão: quem lê a página de um guia não
    está autenticado, e exigir conta para denunciar difamação é como a denúncia nunca chega.
    Honeypot + throttle de 5/min carregam o abuso. Não há moderação por IA no caminho de
    escrita: a rede é denúncia + admin.

PublisherQualification ─── Business (1:1) — qualificação automática do publisher
  Tabela: publisher_qualifications
  PK: businessId (UUID, aponta diretamente para Business)
  Armazena: isQualified, qualifiedAt, disqualifiedAt, totalApprovals, lastRejectionAt
  Critérios automáticos (calculados em runtime): totalApprovals >= 3, emailVerified,
    accountAge >= 30 dias, sem rejeição nos últimos 90 dias, perfil completo (name + city)
  Override manual (admin): overrideActive, overrideValue, overrideById (FK Users),
    overrideReason, overrideAt — quando overrideActive=true, ignora critérios automáticos
  Ciclo: criado automaticamente na primeira aprovação/rejeição de página;
    publisher qualificado publica direto, sem revisão humana — mas o envio passa
    antes pela moderação por IA, que é o único leitor desse caminho: `riskLevel`
    alto demove a página para a fila normal de revisão; qualquer outro resultado
    (inclusive o `medium` de falha da IA) publica, para que indisponibilidade da
    moderação não trave quem já ganhou o direito
```

### Roteiros — a primeira coleção do utilizador que é partilhável

```
Users ────────── Itinerary (1:N)
Itinerary ──┬─── ItineraryStop (1:N) ──┬── Place (N:1, opcional)
            │                          └── Business (N:1, opcional)
            └─── ItineraryReport (1:N) — denúncia anónima
```

Um roteiro é uma sequência ordenada de paradas que alguém montou explorando o My
City. Três decisões de modelagem carregam o porquê:

- **Pertence a um país, não a uma cidade.** As cidades saem das paradas. Um
  roteiro chamado "Tour praia de Portugal" atravessa Lagos, Cascais e Almada;
  prendê-lo a uma cidade tornaria esse caso impossível. O filtro público por
  cidade responde "roteiros que passam por aqui" através de
  `ItineraryStop.cityKey`, desnormalizado do alvo no momento em que a parada
  entra — uma coluna indexada em vez de um leque de junções.
- **Tabela filha, não JSON.** O itinerário do guia turístico vive como JSON em
  `Business.typeData`, e a diferença é de natureza: aquele guarda conteúdo
  autoral do próprio negócio, que nasce e morre com ele, enquanto uma parada
  aponta para um agregado alheio. Referência pede FK — com ela, apagar a conta
  de um dono limpa as paradas em cascata e não sobra uuid pendurado, e a leitura
  pública hidrata o conteúdo curado actual num `include`.
- **`position` sem unique, de propósito.** No Postgres um unique não-diferível é
  verificado a cada instrução, então uma permutação completa dentro de uma
  transacção tropeçaria a meio caminho. A ordem é reescrita por inteiro ao
  reordenar.
- **Até três roteiros *criados* por país, e o tecto é um guarda-corpo.** O
  primeiro roteiro de um país continua a nascer da primeira parada — um
  formulário à frente da coisa que a pessoa queria é um formulário que ela
  abandona — e `POST /itineraries` existe para o segundo, onde "guardar" deixou
  de ter resposta óbvia sobre onde. As **cópias não contam**: quem copiasse três
  roteiros portugueses ficaria sem conseguir escrever um seu. A contagem é
  derivada (`source_itinerary_id IS NULL`), nunca uma coluna, porque um contador
  seria uma segunda verdade a manter em cada apagar e em cada conta em cascata.
  A contagem e a inserção **não** são travadas uma contra a outra, e o tamanho
  disso foi medido: duas abas a submeter a partir de um país já cheio recebem
  ambas 422, mas seis pedidos disparados juntos a partir do zero passam todos.
  Segura contra o engano, não contra a tentativa — e é assim que está
  documentado, em vez de se fingir que é um controlo. O que mantém a listagem
  pública honesta é a denúncia anónima, não este número.
- **Recopiar é um pedido em dois tempos, e o primeiro não escreve.** `POST
  /itineraries/public/:slug/copy` responde **409** quando já existe cópia, com
  o corpo a descrever qual (`CopyItineraryConflictDto`: título, `copiedAt` e
  `editedSinceCopy`) — e **nada é escrito**. A confirmação da pessoa volta como
  `overwrite: true`, e só então a cópia é substituída pela versão actual da
  origem, preservando `id`, `slug` e `isPublic` para o link que ela partilhou
  continuar a resolver. Um `GET` de pré-voo custaria um pedido a cada visitante
  com sessão em cada página pública para uma resposta que é "não" quase sempre.
  O `AllExceptionsFilter` preserva o detalhe de qualquer erro 4xx lançado com
  campos além dos três do Nest — antes colapsava tudo em `message`, e o diálogo
  ficaria a adivinhar o que está prestes a destruir.
- **`copiedAt` é carimbado a partir de `updatedAt`, não do relógio.** Os dois
  são escritos por mãos diferentes na mesma instrução, e compará-los através
  dessa fenda obriga a uma tolerância que erra nas duas direcções: apertada de
  mais e uma cópia acabada de fazer anuncia que já foi editada; larga de mais e
  uma edição feita logo a seguir é engolida — **medido a 28 ms** — e o diálogo
  promete que nada se perde enquanto algo se perde. Um `UPDATE` cru dentro da
  mesma transacção iguala os dois, e a comparação passa a ser estrita.
- **`sourceItineraryId` é um uuid solto, não uma relação.** Registado quando a
  linha nasceu como cópia de um roteiro público, e **nunca é dereferenciado**:
  a cópia tem as próprias paradas a apontar direto para `Place`/`Business` e
  sobrevive à origem ser despublicada ou apagada — que é a promessa em que ela
  foi construída. Serve duas perguntas que já têm a origem em mão ("esta pessoa
  já tem cópia dela?", para recopiar reescrever em vez de acrescentar; e "isto
  foi criado ou copiado?", de que o tecto por país precisa). Uma FK com
  `onDelete: SetNull` transformaria uma cópia num roteiro criado no dia em que
  a origem fosse apagada, gastando um lugar que o dono nunca gastou — um facto
  sobre o passado não deixa de ser verdade porque aquilo que ele aponta
  desapareceu. Sem FK, o Prisma nem permite escrever um `include` por ele, que
  é a garantia que queremos que o código não consiga violar por distracção.
  Mesmo raciocínio de `AiUsageLog.entityId`. O par `@@unique([userId,
  sourceItineraryId])` dá **uma cópia por origem por pessoa**; NULLs são
  distintos no Postgres, então os roteiros criados nunca colidem entre si.
  Para fora, os DTOs do dono expõem `isCopy` e `copiedAt`, nunca o id da
  origem: de quem veio o roteiro não é assunto de quem o copiou, e "nunca
  caminho de leitura" vale também no cliente.

O único campo de texto livre é `Itinerary.title`. É isso que torna defensável
publicar sem fila de moderação, no molde de `Business.isPublic`: todo o resto do
conteúdo já passou pela curadoria da plataforma. A denúncia anónima é a rede de
segurança, e não guarda quem denunciou.

A restrição de **exactamente um alvo por parada** (`place_id` ou `business_id`,
nunca ambos, nunca nenhum) vive na migration como um `CHECK` escrito à mão — o
Prisma não sabe exprimir uma restrição entre colunas:

```sql
ALTER TABLE itinerary_stops ADD CONSTRAINT itinerary_stops_exactly_one_target
  CHECK (num_nonnulls(place_id, business_id) = 1);
```

Os dois `@@unique([itineraryId, placeId])` e `@@unique([itineraryId, businessId])`
proíbem apenas **duplicados** do mesmo alvo no mesmo roteiro: no Postgres NULLs
são distintos entre si, então paradas do outro tipo não colidem.

Plano do épico: `plans/2026-09-03-epico-roteiros.md`.

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

### Cobertura de steps — o guard contra tipo de visto sem checklist

`countries.seed.ts` declara os tipos de visto que o usuário pode escolher; `prisma/seeds/visa-steps/`
guarda o checklist de cada um, **casado pela string exata da categoria**. Nada além dessa string
liga os dois arquivos, e a falha é silenciosa nas duas direções: categoria sem template faz o
seed logar um aviso e não escrever nada, e o sintoma só aparece como `selectVisaType` devolvendo
404 para quem escolher aquele visto; template sem categoria é pulado com a mesma discrição.

Por isso a checagem é teste, não script opcional: `visa-steps-coverage.spec.ts` roda no
`pnpm test` e cobre os dois sentidos. Ele mora em `apps/immigrant_be/src/visa-steps/` porque o
jest só varre `apps` e `libs`, e lê as categorias do texto de `countries.seed.ts` via
`prisma/seeds/visa-steps/country-categories.ts` — a lista vive dentro de `seedCountries()`, e
importar aquele módulo construiria um `PrismaClient`. O mesmo helper alimenta o
`validate.ts`, que continua sendo o caminho para rodar as checagens de conteúdo sem banco
(`npx tsx prisma/seeds/visa-steps/validate.ts`).

### Catálogo de vistos — de onde vem cada número

`immigration_visa_types` carrega três campos que a recomendação lê:
`processing_time`, `estimated_cost` (ambos anuláveis) e `main_requirements`
(`String[]`, default `[]`). Nenhum deles é escrito à mão no `countries.seed.ts`:
o único lugar que os preenche é `prisma/seeds/visa-catalogue.ts`, e o seed
apenas espalha o resultado de `catalogueFieldsFor(country, category)`.

A regra é a razão de o módulo existir. **Nenhum número é inventado**: prazo e
custo são copiados literalmente das `translations[].processing_time` e
`investment_required` do país, e só quando a string nomeia uma rota que
corresponde a exatamente uma categoria daquele país (`Golden Visa`, `MPRP`,
`EB-5`, `D-8`). Um "2–4 meses" de país não descreve nenhuma das quatro
categorias dele em particular, então fica `null` — 8 dos 242 tipos de visto têm
prazo e 38 têm custo, e o resto está vazio de propósito. `main_requirements` é
**derivado** dos templates de `visa-steps/` (grupos `core_documents` e
`financial_requirements`, menos os passos imperativos), nunca copiado, para o
catálogo não divergir do checklist que o usuário recebe.

O prompt `best-visa-type.prompt.ts` omite a linha inteira de um campo vazio em
vez de escrever "unknown", e manda o modelo não apresentar como mais rápido ou
mais barato um visto que não declarou prazo nem custo. `visa-catalogue.spec.ts`
trava as três invariantes: fato ancorado em categoria inexistente, contagem de
preenchimento e instrução vazando para a lista de requisitos.

### Livre circulação — a regra que não passa pelo modelo

`libs/immigration` exporta `FREEDOM_OF_MOVEMENT_COUNTRIES` (conjunto ISO2) e
`hasFreedomOfMovement(passaporte, destino)`. É biblioteca pura, sem Nest e sem
Prisma, porque a resposta é função de dois códigos e de mais nada.

**A lista é UE + EEE + Suíça, não Schengen.** Os dois conjuntos se parecem e
não são o mesmo: Islândia, Liechtenstein e Noruega estão no EEE e fora da UE
(o acordo do EEE estende a livre circulação de pessoas); a Suíça tem o direito
por acordo bilateral; Irlanda e Chipre estão na UE e fora de Schengen, e a
livre circulação vale igual; Turquia e Reino Unido não estão em nenhum dos
grupos. Montar a lista a partir de Schengen erraria todos esses casos.

Quem decide é o backend, nunca a IA. `SystemService.getSelectedBestVisaType`
compara `UserDetailsQueryDto.nationality` com `Country.iso2`, devolve
`freedom_of_movement` na resposta **e** manda a mesma decisão para o prompt
(`buildBestVisaTypePrompt(..., { freedomOfMovement: true })`), que então
explica que não há visto a pedir e fala de registro. O booleano e a prosa saem
da mesma fonte de propósito: um "não precisa de visto" ao lado de um parágrafo
sobre visto de residência é pior do que qualquer um dos dois sozinho. No quiz,
`SuggestionItem.freedom_of_movement` é preenchido por sugestão depois do
enriquecimento com o cadastro, e `buildCountriesMatchPrompt` recebe a mesma
regra para que os `reasons` concordem.

Os dois caches são seguros porque já são chaveados pelos parâmetros inteiros:
`visa_type_recommendations` por `(country_id, parameters, language)`, com
`parameters` sendo o DTO completo — `nationality` incluída —, e `suggestions`
pelo JSON canônico dos `steps`, que carrega o passo `NATIONALITY`. Uma linha
gravada para um passaporte não pode ser servida a outro. Ainda assim o campo é
**recalculado na leitura**, não lido do JSON gravado: as linhas anteriores a
esta mudança não o têm, e um booleano ausente é lido como "precisa de visto".

---

### Tabelas de IA

| Tabela | Papel |
| --- | --- |
| `ai_model_configs` | Um registro por cenário: modelo primário + cadeia de fallback ordenada. Editável pelo painel, então trocar de modelo não é deploy. |
| `ai_usage_logs` | Uma linha por chamada de modelo, incluindo as que falharam (`error_kind`). Existe desde o dia um porque imagem domina o custo de um post e o cron gera em loop — sem isso não há como distinguir fatura surpresa de uso normal. |

---

## 6. Integração com IA (OpenRouter + Gemini)

### Arquitetura

```
libs/ai/                              # Biblioteca compartilhada de IA
├── ai-router.service.ts              # PORTA ÚNICA para modelos: resolve o cenário, percorre a
│                                     #   cadeia de fallback, grava AiUsageLog
├── model-config.service.ts           # cenário → cadeia de modelos (tabela ai_model_configs,
│                                     #   cache 60s, defaults no código)
├── providers/
│   ├── ai-provider.types.ts          # AiScenario, erros InsufficientCreditsError / RateLimitedError
│   ├── openrouter.service.ts         # texto + imagem via fetch (o SDK oficial é ESM-only)
│   └── gemini-direct.provider.ts     # último elo da cadeia, com a chave Gemini existente
├── utils/json-response.util.ts       # parseJsonResponse compartilhado por todos os providers
├── utils/moderation-flatten.util.ts  # achata typeData em campos nomeados pelo caminho JSON,
│                                     # para o flag da IA poder ser localizado na tela do admin
├── gemini-base.service.ts            # Legado: client Gemini de modelo fixo, ainda usado por
│                                     #   system, plan e business-pages
├── schemas/                          # Zod schemas centralizados
│   ├── suggestions.schema.ts         # SuggestionsType
│   ├── visa-recommendation.schema.ts # VisaRecommendationType
│   ├── blog-post.schema.ts           # BlogPostAiResponse — geração de posts
│   ├── blog-translation.schema.ts    # BlogTranslationAiResponse — tradução de posts
│   └── business-page-moderation.schema.ts # Entrada/saída da moderação de páginas
│                                       # inclui typeDataText/typeDataLinks: o typeData
│                                       # achatado por caminho JSON (tours[2].description)
└── prompts/                          # Templates de prompts centralizados
    ├── countries-match.prompt.ts       # regra da livre circulação junto dos critérios
    ├── best-visa-type.prompt.ts        # bloco extra sob `{ freedomOfMovement: true }`
    ├── blog-post.prompt.ts           # buildBlogPostPrompt() — usa Google News RSS
    ├── blog-translation.prompt.ts    # buildBlogTranslationPrompt() — preserva Markdown
    └── business-page-moderation.prompt.ts # Moderação de conteúdo de páginas públicas (admin)

apps/immigrant_be/src/business-pages/
└── business-page-moderation.service.ts  # Moderação IA (admin): AiRouterService (cenário business_moderation)

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
├── ai-blog.service.ts         # Usa AiRouterService
│   ├── fetchGoogleNewsRss()          # Busca Google News RSS (sem API key)
│   │                                 # termos por tema; `topic` do admin sobrepõe
│   └── generatePost()                # RSS → roteador → BlogPost DRAFT
│       # sem persona: blog_writing_standard + PoliticalTone legado
│       # persona IMMIGRATION/GEOPOLITICS: blog_writing_opinion + guardrails
│       # persona TOURISM/CUISINE: blog_writing_standard + guardrails lifestyle
│       # auto-moderação roda para toda persona, qualquer que seja o tema
│       # generate_both_sides: 2 jobs com o mesmo debate_group_id
├── ai-blog-image.service.ts   # Capa (blog_image) — último elo da cadeia
└── ai-blog-refine.service.ts  # Imagens inline (blog_image)
```

### Padrões para IA

- **Chamada nova usa `AiRouterService`**, nunca um provider direto. O caller nomeia um
  **cenário** (`blog_writing_standard` | `blog_writing_opinion` | `blog_translation` |
  `blog_image` | `place_writing` | `quiz_suggestions` | `visa_recommendation` |
  `visa_steps_translation` | `business_moderation`), não um modelo — o mapeamento vive na
  tabela `ai_model_configs`, então trocar de modelo é um `PUT /admin/ai/models/:scenario`,
  não um deploy.
- **`place_writing` é o cenário mais restrito.** O modelo recebe fatos já colhidos do
  OpenStreetMap e da Wikipédia e escreve descrição e dica nos três idiomas — nunca supre um
  fato. O prompt proíbe horário, preço e data de fundação explicitamente: são os campos que
  um modelo preenche com plausibilidade quando não sabe, e um horário errado manda alguém
  para uma porta fechada. Dica sem fato que a sustente volta `null`, e o schema aceita isso.
- **Toda cadeia tem um elo que sobrevive ao 402 da OpenRouter.** Créditos da OpenRouter são
  da conta inteira: quando acabam, nenhum modelo **pago** dela responde, e uma cadeia só de
  pagos não teria para onde cair. Dois elos satisfazem isso: `gemini-direct:` (outro provider,
  outra cobrança) ou um modelo **`:free`** — que atravessa o cooldown de 15 min de propósito,
  porque o cooldown existe para chamadas pagas e o free segue respondendo a custo zero. Nos
  cenários do app da API quem cumpre esse papel hoje é o `:free` do fim da cadeia
  (`minimax/minimax-m3:free`), e não um elo `gemini-direct:` — ver o bullet das rotas de IA
  do app da API mais abaixo.
- **Um 402 coloca a OpenRouter em cooldown de 15 min** para não martelar a API a cada job —
  exceto para modelos `:free`, que continuam sendo tentados (ver acima).
- **402 e 429 são erros diferentes.** 402 = créditos, não vale reesperar. 429 = rate limit, vale
  uma espera curta antes de pular para o próximo modelo.
- **Todo call gera linha em `ai_usage_logs`**, incluindo as tentativas que falharam. `cost_usd` só
  é preenchido quando o provider informa — estimativa aqui envenenaria a auditoria. A agregação
  para o admin é `GET /admin/ai/usage?period=day|week|month`.
- **Personas.** O tom mora em `BlogPersona`, não no dropdown de `PoliticalTone` (esse continua só
  para geração sem persona). Guardrails versionados em código são injetados **depois** do
  `persona_prompt`. Auto-moderação grava `moderation_flag`; draft flagado não bloqueia — só
  destaca na fila. Não existe caminho de auto-publish para post de persona.
- **O tema da persona guia o pipeline inteiro**, não só a voz: escolhe os termos da busca no
  Google News, o papel e o enunciado do prompt, o bloco de guardrails e o cenário de modelo.
  Antes o tema era ignorado e o colunista de viagem escrevia sobre manchetes de imigração.
  São três blocos de guardrails: o político (IMMIGRATION, com steelman), o de lifestyle
  (TOURISM e CUISINE — **nada de política**, prós e contras honestos, nada de lugar, prato ou
  preço inventado) e o de análise (GEOPOLITICS — apartidário, fato separado de análise, duas
  leituras antes de pesar). O bloco político é o fallback de quem não tem tema, porque é o
  mais restritivo.
- **`@openrouter/sdk` não é usado**: é ESM-only e este repo é CommonJS com ts-jest. Fazê-lo
  importar exigiria `allowJs` no monorepo ou um segundo transformer. `fetch` é nativo no Node 22 e
  a superfície usada são dois endpoints.
- **Proveniência gravada no registro de negócio.** `BlogPost.generated_by_model` e
  `generation_cost_usd`, `BlogPostTranslation.translated_by_model`. O que importa é saber que um
  post veio de um **elo de fallback** e não do modelo configurado — a fila de aprovação não
  distinguiria um do outro sem isso. `generation_cost_usd` fica nulo quando o provider não
  reporta; o Gemini direto nunca reporta.
- **O retry de imagem é a cadeia, não um laço.** O refinamento tinha três tentativas contra o
  mesmo modelo; com a cadeia isso viraria até nove imagens pagas por marcador. Tentar modelos
  diferentes também cobre mais tipos de falha do que insistir no mesmo. A capa, que não tinha
  retry nenhum, ganhou o mesmo comportamento de graça.
- **As rotas de IA do app da API passam pelo router desde #151.** Quiz
  (`quiz_suggestions`), recomendação de visto (`visa_recommendation`), tradução de steps
  (`visa_steps_translation`) e moderação (`business_moderation`) chamavam o Gemini cru e
  ficaram sem segunda opção quando o crédito pré-pago esgotou — enquanto o worker inteiro
  seguia respondendo pelas cadeias. **A cadeia dessas quatro é ordenada por latência medida**,
  não pelo modelo que a rota usava antes: tem gente olhando para um spinner. Medido em
  produção em 27/08/2026 com prompt do tamanho do quiz — `google/gemini-3.1-flash-lite` 1,3 s,
  `minimax/minimax-m3:free` 3,3 s, `deepseek/deepseek-v4-flash` 50 s isolado e 100 s dentro
  do request real. O `z-ai/glm-5.2:free` saiu porque o provider dele respondia 429: como
  último recurso, não era recurso nenhum. O `gemini-direct:gemini-2.5-flash-lite` saiu da
  cadeia só enquanto o crédito pré-pago do Google AI Studio estiver esgotado — ele responde
  429, embeddings incluídos. Restaurado o crédito, volta pelo painel admin, sem deploy.
  **A linha em `ai_model_configs` sombreia o default do código**, então mudar o default não
  muda produção: quem move produção é a migração de dados
  (`20260827090000_ai_chain_faster_fallbacks`), escrita para tocar só as linhas que ainda
  tinham o default antigo — quem já editou pelo painel é dono da própria escolha.
- **Sugestão e recomendação sem embedding são gravadas mesmo assim.** `generateEmbeddings`
  degrada para `null` quando o Gemini está fora — e o repositório recusava o null,
  transformando degradação em outage: o que a cadeia tinha acabado de gerar era barrado na
  porta. A coluna é nullable; linha sem vetor só não participa do lookup de similaridade.
  Vale para `createSuggestions` (medido ao provar o aceite da #151) e para
  `createVisaTypeRecommendation`, que ficou com o mesmo defeito uma camada abaixo e
  devolvia 500 em `getSelectedBestVisaType`. O guard de 768 dimensões continua valendo para
  vetor que **existe**: largura errada envenena a busca por similaridade, ausência de vetor
  não.
- **`GeminiService` (system) ainda estende `GeminiBaseService`, mas só pelos embeddings** —
  a OpenRouter não tem endpoint de embeddings. `plan` segue no legado.
- Modelo de embeddings: `gemini-embedding-001` (fora do roteador)
- **Validação obrigatória** das respostas via **Zod schemas** centralizados em `@app/ai`
- **Prompts centralizados** em `libs/ai/src/prompts/` — importados via `@app/ai`
- **Regras de prosa humana** em `libs/ai/src/prompts/prose-rules.ts` — fonte única das regras
  anti-"cara de IA" (sem travessão, sem clichês de LLM, voz de jornalista, cadência falada).
  São constantes separadas porque nem toda regra cabe em todo prompt: a blocklist de clichês
  não entra em prompts de **tradução** (forçaria o tradutor a desviar do original). Todo prompt
  novo que gera texto lido pelo usuário compõe as regras dali, nunca redige as suas. A rede em
  código é `stripEmDashes`/`stripEmDashesDeep` (`libs/ai/src/utils/blog-prose.ts`), aplicada em
  toda saída de prosa antes de gravar ou devolver.
- `generateImage(prompt)` em `GeminiBaseService` — retorna `Buffer | null` com dados base64 decodificados

---

## 6.0. My City — por que existe um módulo só para contar

`apps/immigrant_be/src/my-city/` expõe uma rota só, `GET /my-city/summary`, que
devolve quatro números: restaurantes, guias, eventos e lugares de uma cidade.

**Por que não vive dentro de `business`, `community-events` ou `places`.** Ele
conta atravessando os três. Pôr a contagem de lugares dentro do módulo de
negócios seria arquivar pelo lugar onde o número é lido, não pelo assunto do
número. A tela é o domínio a que esses quatro pertencem juntos.

**Por que a contagem existe.** A tela tem abas, e aba esconde: sem um número no
rótulo, uma aba vazia só se anuncia depois do clique. O número precisa portanto
ser conhecido **antes** de qualquer aba abrir — enquanto o sentido da aba é que
aba fechada não custe requisição. Uma chamada barata com os quatro números
resolve as duas coisas: as listas passam a carregar quando a aba abre.

**A regra que o código tem de manter.** O número tem de concordar com o que a
aba depois mostra. Como a lista de negócios funde a cidade exata com o que está
dentro do raio, a contagem faz o mesmo — num `OR` só, e não em duas consultas
somadas, que contariam duas vezes tudo o que satisfaz as duas condições. Ver
`my-city.repository.ts`.

**O raio alcança os quatro, e nem sempre alcançou.** Ele nasceu dentro da lista
de negócios — existe para trazer o restaurante de Gaia a quem navega o Porto — e
por dois meses só os negócios o respeitaram. Um leitor que apertava o raio a um
quilómetro em Faro continuava a ver sete lugares, um deles a 9,7 km, porque nos
clássicos e nos eventos a coordenada só ordenava. Reportado por quem usa, não
descoberto por revisão.

Ao aplicá-lo, uma escolha de `countBusinesses` teve de ser desfeita para lugares
e eventos: aquela contagem para na **caixa** e não roda o Haversine, com o
argumento de que uma contagem pode ser generosa nos cantos onde uma lista não
pode. Vale quando os números são grandes. Medido em Lisboa a um quilómetro, a
caixa contava dois lugares e o Haversine um — a aba diria dois sobre uma lista de
um. Com números pequenos, "generoso" é só errado, e a contagem passou a usar a
mesma condição exata da lista.

**O raio alarga ou estreita conforme de quem é a origem.** São dois
comportamentos, e o servidor não distingue um par de coordenadas do outro —
quem diz é o cliente, no parâmetro `nearMe`.

Sem GPS, a origem é o centro da cidade: um ponto que ninguém escolheu. Quem
pediu "Lisboa" não pediu "o Marquês de Pombal", e estreitar ali esconderia a
oferta da própria cidade selecionada. Aqui o raio **alarga** — `cidade OU
alcance` —, que é o que traz o restaurante de Gaia a quem navega o Porto.

Com GPS, a origem é a pessoa, e a união vira contradição: estar dentro da cidade
escolhida não faz nada ficar perto de quem lê. Aqui o raio **estreita** — só o
alcance, sem a cidade a somar. Medido com três guias à volta de Lisboa a 1,0,
7,8 e 19,2 km: alargando responde 2, 2, 2, 3 nos quatro raios; estreitando
responde 0, 1, 2, 3, batendo com o Haversine exato em todos.

A regra vale para as quatro abas, e é a coerência que faltava: era a mesma tela
a comportar-se de dois jeitos, com 1 km a significar 1 km numa aba e nada na
outra.

**Coordenada parcial é coordenada ausente.** Raio sem origem não tem de onde
medir, origem sem raio não tem alcance. Preencher a metade que falta com um
default esconderia conteúdo em silêncio, então um conjunto incompleto é tratado
como se não houvesse filtro nenhum — e a consulta sem coordenada continua sendo
a tipada de sempre, byte a byte.

**A lista de lugares filtra no cliente, de propósito.** O explorador já busca a
cidade inteira (`limit: 100`) e recorta categoria, gratuito e busca ali mesmo; o
raio entra no mesmo lugar. `GET /places/public` não ganhou o parâmetro porque
replicar o Haversine ali exigiria trocar a consulta tipada por SQL cru, com o
`select` de dezoito campos e as traduções escritos à mão, num endpoint público
que funciona — risco real por um consumidor que não precisa. Se um dia outro
cliente consumir aquela rota, o parâmetro entra lá; a decisão está aqui para não
parecer esquecimento. **Eventos são o caso oposto**: a faixa pede seis, e filtrar
seis no cliente devolveria menos que seis, então lá o raio vai para a consulta —
e um raio força o caminho de SQL cru mesmo em `upcoming`, porque Haversine não se
escreve num `where` do Prisma.

## 5.1. O deploy aplica as migrations

`scripts/start.sh` — o `CMD` da imagem — corre `prisma migrate deploy` antes de
arrancar qualquer processo, com `set -e`.

**Por que ali e não no `package.json`.** O `start` de lá é o de
desenvolvimento (`concurrently nest start`); quem sobe em produção é este script.
E é o único ponto por onde os dois processos passam, o que resolve de graça a
corrida entre eles: a migration corre uma vez, antes de existir API ou worker.

**Por que o binário direto.** O estágio de produção do Dockerfile não corre
`corepack enable`, então `pnpm exec` não existe lá dentro. O `node_modules` é
copiado inteiro do build, com o CLI do Prisma.

**Por que `set -e`.** Se a migration falhar, o contêiner não arranca. Um
contêiner que não arranca é visível; uma aplicação a correr contra um schema que
não conhece não é — foi o que aconteceu a 2026-09-01, com a listagem pública a
responder 500 porque uma migration aditiva ficou por aplicar.

**A regra que mantém isto seguro.** As migrations passam a correr sem ninguém a
ver, portanto continuam a ser **aditivas**: expandir num deploy, contrair noutro.
Uma que apague coluna corre sozinha, e não há passo humano onde reparar nela.

## 6.0.1. Destaques — um ato editorial, um módulo

`apps/immigrant_be/src/featured/` expõe `PATCH /admin/featured/:entity/:id`, uma
rota só para negócios, lugares e eventos. Destacar é o mesmo ato nos três — a
faixa acima da lista mistura-os —, e três superfícies de admin seriam três
cópias da mesma decisão.

**Por que `FeatureKind` e não um booleano.** `CURATED` é escolha nossa; `PAID` é
espaço vendido. A tela tem de poder dizer qual dos dois está a mostrar:
"Selecionados" sobre um anúncio é a troca silenciosa que gasta a confiança da
lista inteira, e um booleano tornaria essa troca impossível de evitar. O
servidor recusa um `PAID` sem data de fim, porque uma campanha sem fim fica no
ar por esquecimento.

**A regra vive num sítio só** — `common/featured/featured.ts` — em duas formas: a
função que decide sobre uma linha e o `where` que decide quem volta da base. As
duas existem porque a base escolhe quem aparece e o código escolhe o que dizer
sobre cada um; se divergirem, a lista e o rótulo discordam.

**O que sai na API pública:** `featureKind` e `featuredNow`. As datas ficam de
fora de propósito — mandá-las seria mandar a regra de "agora" junto, e duas
cópias dessa regra divergem no primeiro fuso horário.

**A faixa pede as próprias linhas.** `/business/public` e `/places/public`
aceitam `featured=true`. A alternativa — a faixa escolher entre o que a página
da lista trouxe — parece mais simples e não é: uma página pode não conter
nenhum destaque, e um que esteja na página quatro entraria na faixa quando o
leitor rolasse. A regra ganhou por isso uma terceira forma, `featuredSql`, em
`common/featured/featured.ts`: a busca por raio monta SQL à mão para usar o
índice `(lat, lng)`, e sem ela o filtro seria ignorado em silêncio justamente
nas consultas que o My City faz.

## 6.0.2. Retirar uma submissão não é ser reprovado

`DELETE /business-pages/:id/submission` tira da fila uma edição que o dono já
não quer publicar. Volta a `APPROVED` se havia conteúdo no ar — o público não é
tocado, sai o pedido de revisão e não a página — e a `DRAFT` se a página nunca
foi aprovada. O `pendingContent` fica onde está: é o rascunho do dono, e
retirar a submissão não é descartar o trabalho.

**Por que existe.** A única forma de tirar algo da fila era pedir ao moderador
que reprovasse, e reprovar chama `onPageRejected`, que grava `lastRejectionAt`
— e a qualificação de publisher exige **90 dias sem reprovação**
(`publisher-qualification.service.ts`, `rejectionFreeDaysRequired: 90`). Medido
a 2026-09-02: uma conta com 11 aprovações contra 3 exigidas perdeu a
qualificação por causa de um descarte puramente operacional, e a tela passou de
"Publicar agora" para "Submeter para revisão".

Descartar e reprovar são atos diferentes e agora têm caminhos diferentes. A
reprovação continua a ser juízo de conteúdo, com o preço que tem.

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

### Chaves determinísticas (upload por entidade)

Alguns módulos não geram UUID por ficheiro: gravam sempre na mesma chave, para que substituir a
imagem substitua o ficheiro em vez de acumular órfãos no bucket.

- `business-pages/{businessId}/logo.{ext}` e `business-pages/{businessId}/cover.{ext}`
- `community-events/{eventId}/cover.{ext}` — capa do evento (`POST /events/:id/image`)

A galeria do evento é a exceção deliberada: cada foto é acrescentada, não substituída, e por isso
leva UUID próprio — `community-events/{eventId}/gallery/{uuid}.{ext}` (`POST /events/:id/images`).
`DELETE /events/:id/images` remove a URL do array e apaga o objeto em best-effort, derivando a
chave do *path* da URL e só quando ela cai sob o prefixo da galeria daquele evento.

### AI Blog Cover Images

A capa é o elo antes de `READY` na cadeia (`TRANSLATING → GENERATING_IMAGE → READY`). O worker de
texto enfileira as traduções; o último locale traduzido faz compare-and-set para
`GENERATING_IMAGE` e enfileira `ai_blog_image_queue`. Se o enqueue da capa falhar, o post volta
para `FAILED_IMAGE` com `pipeline_error` — evita ficar travado em `GENERATING_IMAGE` sem job.

Depois da capa, posts com marcadores `[Visual sugerido]` no corpo enfileiram automaticamente
`refine_ai_blog_post`, que substitui as descrições por imagens inline (`blog_image` via
`AiRouterService`). Falha ao enfileirar o refine marca `refine_needs_manual_fix` sem desfazer
`READY`.

A imagem de capa usa o cenário `blog_image` via `AiRouterService` (não `GeminiBaseService`
direto). Falha na geração marca o post `FAILED_IMAGE`; o admin reenfileira só essa etapa. Posts
presos em `GENERATING_IMAGE` também podem ser reenfileirados.

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

Desde 2026-09-05 a API **também** escreve nessa tabela, por
`NotificationsService.notify` (`@app/notifications`) — o worker deixou de ser o
único emissor. É o que permite avisar alguém de uma aprovação sem depender de
e-mail.

- **Redis** como broker de mensagens
- **Microservice** roda como app separado (porta 6000)
- Comunicação via filas nomeadas
- Eventos notificam o frontend via **Server-Sent Events (SSE)**
- Ao concluir um job, o consumer grava um registro na tabela `events` (status `pending`). O endpoint `/system/sse` faz polling a cada 1s, consume o evento (marca `delivered`) e envia ao cliente. O frontend exibe toast com título e mensagem da tarefa concluída.
- O consume é `orderBy: { createdAt: 'asc' }`. Sem isso, duas linhas pendentes chegavam na ordem que o planner escolhesse — e como o poll é de um em um segundo, a pessoa vê as duas aterrar.
- `status` é o estado de **entrega** (`pending` → `delivered` quando o SSE despacha). `readAt` é o estado de **leitura**, e é coluna separada de propósito: uma notificação entregue a uma aba em segundo plano fica `delivered` **e** por ler, e as duas coisas são verdade ao mesmo tempo.

### Filas existentes

| Fila                     | Constante                | Jobs                                           | Descrição                                    |
| ------------------------ | ------------------------ | ---------------------------------------------- | -------------------------------------------- |
| `ai_blog_queue`          | `AI_BLOG_QUEUE`          | `generate_ai_blog_post`                        | Geração de posts de blog com IA              |
| `ai_blog_image_queue`    | `AI_BLOG_IMAGE_QUEUE`    | `generate_ai_blog_image`                       | Geração assíncrona de imagem de capa do post |
| `ai_image_queue`         | `AI_IMAGE_QUEUE`         | `generate_ai_image`                            | Geração de imagens via Gemini (Media Generator) |
| `blog_translation_queue` | `BLOG_TRANSLATION_QUEUE` | `translate_blog_post`, `translate_all_pending` | Tradução automática via Gemini (EN + ES)     |
| `place_ingestion_queue`  | `PLACE_INGESTION_QUEUE`  | `ingest_city`, `write_place_texts`, `write_place_image` | Ingestão de lugares turísticos (Wikidata + Wikimedia + IA) |

A fila `ai_blog_queue` suporta **repeatable jobs** com expressão cron, configurada dinamicamente pelo módulo `ai-blog` quando um `AiBlogCronJob` é criado/ativado.

A fila `ai_blog_image_queue` é enfileirada após a criação do post (DRAFT), permitindo que a geração de imagem ocorra de forma **assíncrona e independente**. O campo `cover_image_url` é `null` inicialmente e atualizado pelo consumer `AiBlogImageConsumer` via `prisma.blogPost.update()` assim que a imagem é gerada e enviada ao storage.

A fila `ai_image_queue` é usada pelo módulo **AI Image** (Media Generator): o admin enfileira uma geração via `POST /admin/ai-image/generate`; o consumer `AiImageConsumer` processa o job chamando `GeminiBaseService.generateImage()`, faz upload para o R2 na pasta informada e atualiza o registro `AiGeneratedImage` (status, url, key).

A fila `blog_translation_queue` suporta **repeatable job diário** (`translate_all_pending` às 03:00 UTC) registrado por `BlogTranslationCronService` via `OnModuleInit`. O job `translate_all_pending` busca todos os posts PUBLISHED sem tradução para EN e ES, e enfileira jobs individuais `translate_blog_post`. O endpoint `POST /admin/blog/posts/:id/translations/enqueue` permite acionar traduções sob demanda.

### Ingestão de lugares — desacoplada do broker

A fila `place_ingestion_queue` segue um desenho diferente das outras, a pedido
do produto: **o pipeline não conhece o BullMQ**. Um dia a fila pode virar Kafka
ou RabbitMQ, e a troca deve custar um adapter, não uma reescrita.

```
PlacesAdminService (API)       ← "processe esta cidade"
PlaceIngestionService (worker) ← regra: resolve a cidade, descobre no Wikidata,
  │                              ranqueia, persiste DRAFT, escreve texto, converge
  │ ambos dependem de
  ▼
IngestionDispatcher (port)     ← @app/ingestion
  ▲
  │ implementa
BullmqIngestionDispatcher      ← único arquivo que sabe o nome da fila
PlaceIngestionConsumer         ← traduz `Job` em chamada de método
```

O port vive em **`libs/ingestion/`** e não dentro do worker porque os **dois
apps despacham**: a API enfileira a ingestão quando o admin pede, e o worker
enfileira um job de texto por lugar encontrado. Se cada um injetasse a `Queue`
direto, trocar de broker seria mexer nos dois — e a API, que só quer dizer
"processe esta cidade", passaria a conhecer o broker sem precisar.

- `ingestion-dispatcher.port.ts` declara a interface, o token `INGESTION_DISPATCHER`
  e os dois erros de intenção: `RetryableIngestionError` e `PermanentIngestionError`.
- O binding do token acontece **só** em `IngestionModule` (`libs/ingestion/`).
  Trocar de broker é trocar o `useClass` dessa linha.
- **O barrel `@app/ingestion` exporta só o port, nunca o `IngestionModule`.**
  O módulo importa a config do BullMQ, que faz `envSchema.parse` no import — se
  ele estivesse no barrel, importar o `INGESTION_DISPATCHER` (o token cuja razão
  de existir é esconder o broker) carregaria a configuração do broker e todas as
  variáveis de ambiente dela. Quem faz wiring de DI importa
  `@app/ingestion/ingestion.module` explicitamente. Isso quebrou o CI uma vez,
  onde `OPEN_ROUTER` não existe.
- Nem `PlaceIngestionService`/`PlaceIngestionRepository` (worker) nem
  `PlacesAdminService` (API) importam `bullmq` ou `@nestjs/bullmq` — é essa
  ausência que mantém o desacoplamento honesto.

**Retry não é portável.** O BullMQ dá 3 tentativas com backoff exponencial; o
Kafka não tem nada disso e o RabbitMQ escreve com DLQ e TTL. Por isso o port
expressa *intenção* e cada adapter decide como honrá-la. `PermanentIngestionError`
chama `job.discard()` antes de propagar: cidade que não existe no Wikidata não
merece três tentativas e meia hora de backoff.

O worker roda com `concurrency: 1` e **sem limiter de fila**. O limiter de
1 job/min existia para o Overpass; com a descoberta no Wikidata não há fonte
com muro de taxa, e o limiter estava, medido, freando texto e imagem (18 jobs
de imagem levaram 18 min) por uma fonte que eles nem tocavam.

**Descoberta no Wikidata (#163).** `WikidataDiscoveryService` resolve o QID da
cidade (país + rótulo exato + coordenada, desempate por sitelinks) e roda uma
consulta SPARQL barata — `P131` com saltos limitados, **sem** filtro de classe,
porque `P31/P279*` dentro do SPARQL estourava o timeout em Lisboa. A
classificação é do nosso lado, por tabela explícita classe → categoria com um
salto de `P279` e uma lista de exclusão medida; o descarte vai para
`stats.droppedAsUnmapped`. Detalhes e métricas em `docs/DATA_SOURCES.md`.

**Convergência.** Cada job de texto, ao terminar, chama `markReadyIfDone`, um
`updateMany` com `status: PROCESSING` no `where` — compare-and-set, um só job
vence e o aviso ao admin sai uma vez. Texto que falhou em definitivo é gravado
em `stats.textFailures` (via `jsonb ||`, atômico) e sai da contagem de
pendentes: uma descrição que nunca veio não pode prender os outros nove lugares
em `PROCESSING`.

**Quantos lugares por cidade.** `PLACES_PER_CITY = 30`. O piloto rodou com 10 e
mostrou que era pouco: o Porto oferece **174 candidatos** com wikidata e nome.
Pegar todos foi considerado e recusado — a cauda é dólmen e aldeia, o custo de
IA multiplica pelo mesmo fator, e uma tela de revisão com 174 cards em três
idiomas deixa de ser revisável. Trinta e não quarenta é decisão de produto
(plano "My City — locais e eventos", 2026-08-25): os clássicos ingeridos são a
isca de tráfego, o negócio local e o evento são o produto — o catálogo não
precisa de uma profundidade que existe para entregar atenção a outra coisa. O `popularityScore` **não depende mais do teto**:
`scoreFor(index, total)` distribui de 100 a 1 para qualquer corte, e reproduz a
escala antiga exatamente quando o total é 10. A fórmula anterior
(`100 - 10 * rank`) estava soldada ao 10 — com 40 lugares o quadragésimo
pontuaria **−290**, ordenando ao contrário e sendo recusado pela validação do
PATCH admin.

**Nunca o mesmo lugar duas vezes**, e são dois problemas distintos, ambos
medidos no conjunto completo do Porto:

- **A mesma entidade duas vezes** — um item com duas coordenadas volta como
  duas linhas do SPARQL ("Liberty City", em Miami). A identidade é o QID; a
  descoberta colapsa por ele antes de qualquer outra coisa.
- **Lugares diferentes com o mesmo nome** — `Forte de São João Baptista` são
  dois fortes (Q10283826 e Q10284015). Como `[countryCode, city, slug]` é a
  chave única, colidir significa o segundo upsert sobrescrever o primeiro em
  silêncio. `uniqueSlugs` sufixa o perdedor com o **Wikidata id**, não um
  contador: o id é estável, enquanto um contador dependeria da ordenação e um
  reprocessamento que reordenasse criaria slug novo e linha duplicada — o
  oposto do que a função existe para evitar. O mais visitado fica com o slug
  limpo.

**Imagens vêm do Commons e moram no R2 (#152).** O P18 do Wikidata pega carona
na mesma chamada `wbgetentities` que o ranqueamento já faz — zero requisições
extras. Por lugar criado com imagem: `imageinfo` do Commons (URL **nunca é
montada na mão** — URLs montadas renderam dez HTTP 400 seguidos neste projeto),
download com User-Agent identificado, upload em chave determinística
(`places/{iso2}/{cidade}/{slug}.jpg`, re-run sobrescreve) e gravação de
`imageUrl` + `imageLicense` + `imageAuthor` — licença CC exige o crédito onde a
imagem aparece, e hospedar o arquivo não desobriga. Os jobs de imagem correm
**fora da convergência**: cidade fica `READY` quando os textos terminam, imagem
que falhar em definitivo é logada e o card cai no tom da categoria. Lugares
anteriores ao pipeline: `pnpm places:backfill-images` (relatório; `--run`
enfileira).

**O curado é intocável.** O upsert por `[countryCode, city, slug]` torna a
ingestão idempotente, mas seria também o caminho para uma descrição gerada
substituir uma escrita à mão. Lugar já existente com `reviewStatus != DRAFT`
não é tocado e vira `stats.conflicts[]` — que é justamente a métrica de
redescoberta do piloto de Lisboa.

### API admin das ingestões de lugares

`apps/immigrant_be/src/places/places-admin.controller.ts`, sob
`admin/places/ingestions`, com `@Roles(ADMIN)`. **Toda resposta é declarada como
classe nomeada em `@ApiResponse({ type })`** — é essa declaração que vira tipo no
frontend; schema inline não gera nada utilizável e um `$ref` dentro dele exigiria
`@ApiExtraModels` (lição do #132/#133).

| Rota | Resposta | Regra |
| --- | --- | --- |
| `POST /admin/places/ingestions` | `CityIngestionResponseDto` (202) | 409 se já houver ingestão `PROCESSING` ou `READY_FOR_REVIEW` da cidade |
| `GET  /admin/places/ingestions` | `PaginatedCityIngestionsResponseDto` | filtro por `status`, paginação server-side |
| `GET  /admin/places/ingestions/:id` | `CityIngestionDetailResponseDto` | lugares + traduções + proveniência + conflitos |
| `PATCH …/:id/places/:placeId` | `AdminPlaceResponseDto` | 409 se o lugar não estiver em `DRAFT` |
| `POST …/:id/places/:placeId/reject` | `AdminPlaceResponseDto` | o motivo vai para `stats.placeRejections[]` |
| `POST …/:id/places/:placeId/retry-texts` | 202 | re-enfileira só aquele lugar |
| `POST …/:id/approve` | `CityIngestionResponseDto` | **422** listando os lugares sem as 3 traduções |
| `POST …/:id/reject` | `CityIngestionResponseDto` | motivo obrigatório |
| `POST …/:id/retry` | `CityIngestionResponseDto` (202) | só de `FAILED`; **preserva o `osmAreaId`** |

Três decisões que não são óbvias no código:

- **Uma ingestão ativa por cidade é guarda de serviço, não constraint.** A mesma
  cidade pode ter várias ingestões ao longo do tempo — aprovada, recusada, uma
  nova depois de melhorar o pipeline. O que não pode é duas ao mesmo tempo,
  disputando os mesmos slugs.
- **O 422 no approve lista quem está incompleto.** Aprovar em silêncio publicaria
  um lugar sem descrição em espanhol, e ninguém descobriria até um usuário
  espanhol abrir o card vazio.
- **`osmAreaId` é `BigInt` no banco e vai como string no JSON.** `JSON.stringify`
  lança em `BigInt`: sem a conversão a rota devolveria 500 na primeira cidade que
  resolvesse a área.

O motivo de uma recusa individual vai para `stats.placeRejections[]` (mesmo
`jsonb ||` atômico do `textFailures`) em vez de uma coluna nova em `Place`: é
registro daquela corrida, não atributo do lugar, e uma coluna custaria uma
migration coordenada com produção para guardar uma frase. Aceitar o motivo e
descartá-lo seria pior que não pedir.

### API admin do catálogo de lugares (#159)

`places-catalog-admin.controller.ts`, em `admin/places` — um nível acima do
fluxo de ingestões. A divisão é deliberada:

- **O PATCH da ingestão recusa (409) qualquer lugar fora de `DRAFT`** — editar
  produção por uma tela de revisão não deixaria trilha do que foi revisado.
  O catálogo é o *outro fluxo* que aquela recusa prometia: opera sobre a tabela
  inteira, curados incluídos — que não pertencem a ingestão nenhuma e só são
  alcançáveis por aqui.
- **Desativar é o "remover do site" seguro**: as queries públicas já filtram
  `isActive`, então o lugar some do explorador com dados, traduções e
  proveniência recuperáveis. O `DELETE` existe para registro que nunca deveria
  ter existido.
- **Traduções no edit são upsert**, ao contrário do update estrito da ingestão:
  lá, tradução ausente significa job de texto ainda não rodado, e escrever uma
  correria com ele; aqui, curado editado para um idioma que nunca teve deve
  ganhá-lo, não dar 500.
- **Nota de roteamento**: o controller de ingestões registra primeiro no módulo
  (Nest casa rotas por ordem de registro), e o catálogo não tem `GET :id` solto
  — a lista carrega tudo, e um `:id` na raiz ficaria a um erro de ordem de
  engolir `/ingestions`.

### API admin das filas

`GET/POST/DELETE /admin/queues` (módulo `queues/`) é a API JSON que o painel
admin consulta. Cobre só as filas em `ADMIN_VISIBLE_QUEUES`
(`libs/config/src/constants.ts`): as cinco da tabela acima. Acrescentar uma
constante ali **não basta** — `QueuesService` injeta cada fila pelo token e
monta o mapa à mão, então a fila nova também entra no construtor. O spec
`queues.service.spec.ts` compara a lista com `ADMIN_VISIBLE_QUEUES` e falha
quando os dois lados divergem. Fila ou job
desconhecido responde 404; estado inválido, 400.

O payload de cada job é sanitizado: prompts, markdown e strings longas saem,
ficam IDs e primitivos curtos. `retry` em job falho chama `job.retry()`; em
job atrasado, `job.promote()`. Não há SSE nem histórico persistido — o
frontend faz poll.

O Bull Board continua existindo como break-glass em
`GET /api/v1/admin/queues-board` (basic auth). A rota antiga `/admin/queues`
passou a ser a API JSON, atrás do `RolesGuard`.

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
| `PATCH /users/plan/:id`                      | Users                     | Autenticado (renomeia; só `name` hoje)     |
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
| `GET /admin/ai/models`                       | AiConfig                  | ADMIN (modelo de cada cenário)             |
| `GET /admin/ai/models/status`                | AiConfig                  | ADMIN (cooldown/chave da OpenRouter)       |
| `PUT /admin/ai/models/:scenario`             | AiConfig                  | ADMIN (troca modelo sem deploy)            |
| `GET /admin/ai/usage`                        | AiConfig                  | ADMIN (custos e falhas por cenário/modelo) |
| `/admin/blog/personas`                       | BlogPersonas              | ADMIN (CRUD da equipe de reportagem)       |
| `/system/suggestions`                        | System                    | Público                                    |
| `/system/visa-recommendation`                | System                    | Autenticado                                |
| `/system/sse`                                | System                    | Autenticado                                |
| `/blog/posts`                                | Blog                      | Público                                    |
| `/blog/posts/admin`                          | Blog (admin inline)       | ADMIN                                      |
| `/blog/posts/:slug`                          | Blog                      | Público                                    |
| `/blog/categories?lang=`                     | Blog (categorias com count de posts PUBLISHED) | Público                                    |
| `/blog/categories/:slug?lang=`               | Blog (resolve slug canônico ou traduzido)      | Público                                    |
| `/blog/tags`                                 | Blog                      | Público                                    |
| `/blog/authors`                              | Blog                      | Público                                    |
| `/blog/authors/:id`                          | Blog                      | Público                                    |
| `/admin/blog/posts`                          | Blog (admin)              | ADMIN                                      |
| `/admin/blog/categories`                     | Blog (admin)              | ADMIN                                      |
| `/admin/blog/categories/:id/translations`    | Blog (admin — corrigir tradução de categoria) | ADMIN                   |
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
| `GET /admin/queues`                          | Queues                    | ADMIN (contagens + paused)                 |
| `GET /admin/queues/:name/jobs`               | Queues                    | ADMIN (jobs sanitizados, `?state=&page=`)  |
| `POST /admin/queues/:name/jobs/:id/retry`    | Queues                    | ADMIN                                      |
| `DELETE /admin/queues/:name/jobs/:id`        | Queues                    | ADMIN                                      |
| `POST /admin/queues/:name/pause`             | Queues                    | ADMIN                                      |
| `POST /admin/queues/:name/resume`            | Queues                    | ADMIN                                      |
| `POST /admin/places/ingestions`              | Places (admin)            | ADMIN — dispara a ingestão de uma cidade   |
| `GET /admin/places/ingestions`               | Places (admin)            | ADMIN — lista com `?status=&page=&limit=`  |
| `GET /admin/places/ingestions/:id`           | Places (admin)            | ADMIN — folha de revisão da cidade         |
| `PATCH /admin/places/ingestions/:id/places/:placeId` | Places (admin)     | ADMIN — edita rascunho                     |
| `POST /admin/places/ingestions/:id/places/:placeId/reject` | Places (admin) | ADMIN — recusa um lugar, motivo em `stats` |
| `POST /admin/places/ingestions/:id/places/:placeId/retry-texts` | Places (admin) | ADMIN — re-enfileira o texto do lugar |
| `POST /admin/places/ingestions/:id/approve`  | Places (admin)            | ADMIN — publica a cidade (422 se faltar tradução) |
| `POST /admin/places/ingestions/:id/reject`   | Places (admin)            | ADMIN — recusa a cidade, motivo obrigatório |
| `POST /admin/places/ingestions/:id/retry`    | Places (admin)            | ADMIN — reprocessa ingestão em `FAILED`    |
| `GET /admin/places`                          | Places (catálogo)         | ADMIN — todo lugar, curado ou ingerido, com filtros |
| `PATCH /admin/places/:id`                    | Places (catálogo)         | ADMIN — edita lugar vivo, qualquer status  |
| `POST /admin/places/:id/activate`            | Places (catálogo)         | ADMIN — volta ao explorador público        |
| `POST /admin/places/:id/deactivate`          | Places (catálogo)         | ADMIN — esconde sem apagar                 |
| `DELETE /admin/places/:id`                   | Places (catálogo)         | ADMIN — hard delete                        |
| `/storage/upload`                            | Storage                   | Autenticado                                |
| `POST /event-interest`                       | EventInterest             | Público — captura de interesse (fase 0 de eventos) |
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

> **As duas rotas anónimas de página levam `select` explícito, e isso é segurança e não
> optimização.** O controlador devolve o que o serviço lhe der e o Nest não retira campos que o
> DTO não declara, portanto uma consulta sem `select` põe a linha inteira no HTML público — foi
> assim que `pendingContent` (conteúdo submetido e ainda **não** aprovado), `moderationResult`,
> `rejectionReason` e os `approvedById`/`rejectedById` dos moderadores ficaram legíveis por
> qualquer visitante. Campo novo na página pública entra no `select` **e** no
> `BusinessPagePublicResponseDto`; a fricção é intencional. Ver `findApprovedBySlug` e
> `findPublicList` em `business-pages.repository.ts`.
| `GET /business-pages/slug-availability`                    | BusinessPages                  | Autenticado — verifica disponibilidade de slug                                                             |
| `POST /business-pages`                                     | BusinessPages                  | Autenticado (role USER) — cria página (DRAFT)                                                              |
| `DELETE /business-pages/:id/submission`                     | BusinessPages                  | Autenticado (role USER) — o dono retira a própria submissão, sem penalidade                                |
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
| `GET /events/public`                                       | CommunityEvents                | Público (`@AllowAnonymous`) — agenda: só APPROVED com `coalesce(endsAt, startsAt) >= now()`, ordem `startsAt asc`; filtros `countryCode`, `city`, `when=upcoming\|today\|weekend`, `page`, `limit` |
| `GET /events/public/:slug`                                 | CommunityEvents                | Público (`@AllowAnonymous`) — detalhe do evento aprovado; 404 se não aprovado |
| `POST /events/public/:slug/report`                         | CommunityEvents                | Público (`@AllowAnonymous`) — denúncia anónima; throttle 3/min, honeypot `website` (descarta em silêncio) |
| `POST /events`                                             | CommunityEvents                | Autenticado (role USER) — cria em DRAFT; throttle 10/min; 400 se `termsVersion` desatualizada; 409 no teto de 5 em análise |
| `GET /events/mine`                                         | CommunityEvents                | Autenticado (role USER) — os meus eventos em qualquer status, paginado |
| `GET /events/:id`                                          | CommunityEvents                | Autenticado (role USER) — detalhe do próprio evento; 403 se não for dele |
| `PATCH /events/:id`                                        | CommunityEvents                | Autenticado (role USER) — edita DRAFT/REJECTED; em APPROVED edita **e devolve a PENDING_REVIEW**; 409 em PENDING_REVIEW/CANCELLED; campos opcionais aceitam `null` para limpar (`undefined` não mexe); `images` só como permutação/subconjunto do array gravado, senão 400 "Galeria inválida" |
| `POST /events/:id/image`                                   | CommunityEvents                | Autenticado (role USER) — capa do evento; multipart, campo `file`; JPEG/PNG/WebP, máx 5 MB; chave R2 `community-events/{eventId}/cover.{ext}`; em APPROVED volta a análise |
| `POST /events/:id/images`                                  | CommunityEvents                | Autenticado (role USER) — acrescenta uma foto à galeria; multipart, campo `file`; JPEG/PNG/WebP, máx 5 MB; 409 "Limite de 8 fotos"; chave R2 `community-events/{eventId}/gallery/{uuid}.{ext}`; devolve `{ url, images }`; em APPROVED volta a análise |
| `DELETE /events/:id/images`                                | CommunityEvents                | Autenticado (role USER) — remove a foto indicada por `{ url }`; 404 se não estiver na galeria; apaga o objeto em best-effort; em APPROVED volta a análise |
| `POST /events/:id/submit`                                  | CommunityEvents                | Autenticado (role USER) — DRAFT/REJECTED → PENDING_REVIEW; 422 sem imagem; 409 se já em análise |
| `POST /events/:id/cancel`                                  | CommunityEvents                | Autenticado (role USER) — cancela e some do público; 409 se já cancelado |
| `GET /admin/events`                                        | CommunityEvents (admin)        | ADMIN — fila de moderação: PENDING_REVIEW primeiro por `submittedAt asc`; `?status=&page=&limit=`; cada item traz `reportCount` |
| `GET /admin/events/:id`                                    | CommunityEvents (admin)        | ADMIN — detalhe com as denúncias |
| `POST /admin/events/:id/approve`                           | CommunityEvents (admin)        | ADMIN — aprova; 409 se não estiver em análise |
| `POST /admin/events/:id/reject`                            | CommunityEvents (admin)        | ADMIN — recusa (PENDING_REVIEW) ou derruba (APPROVED); `reason` obrigatório (3–500) |
| `GET /itineraries/public`                                  | Itineraries                    | Público (`@AllowAnonymous`) — país filtra a coluna do roteiro, cidade sub-filtra pelas paradas; roteiro sem parada visível não lista |
| `GET /itineraries/public/:slug`                            | Itineraries                    | Público (`@AllowAnonymous`) — paradas indisponíveis filtradas e renumeradas 1..n |
| `POST /itineraries/public/:slug/report`                    | Itineraries                    | Público (`@AllowAnonymous`) — denúncia anónima; throttle 3/min, honeypot `website` (descarta em silêncio) |
| `POST /itineraries`                                        | Itineraries                    | Autenticado (role USER) — cria um roteiro vazio; 422 ao terceiro criado nesse país |
| `GET /itineraries/mine`                                    | Itineraries                    | Autenticado (role USER) — os meus roteiros, paginado, com `stopCount`, `unavailableStopCount` e `isCopy`; `?countryCode=PT` recorta |
| `POST /itineraries/stops`                                  | Itineraries                    | Autenticado (role USER) — adiciona parada; sem `itineraryId` usa o roteiro mais recente naquele país e cria um se não houver; `startNew: true` força um novo (400 junto com `itineraryId`); 409 se o item já estiver lá |
| `GET /itineraries/:id`                                     | Itineraries                    | Autenticado (role USER) — detalhe do próprio roteiro; 404 (não 403) se for de outra pessoa |
| `PATCH /itineraries/:id`                                   | Itineraries                    | Autenticado (role USER) — renomeia; o slug **não** muda |
| `PATCH /itineraries/:id/visibility`                        | Itineraries                    | Autenticado (role USER) — publica/despublica na hora, sem moderação |
| `PUT /itineraries/:id/stops/order`                         | Itineraries                    | Autenticado (role USER) — permutação completa; 400 se o conjunto divergir |
| `DELETE /itineraries/:id/stops/:stopId`                    | Itineraries                    | Autenticado (role USER) — remove uma parada |
| `DELETE /itineraries/:id`                                  | Itineraries                    | Autenticado (role USER) — apaga o roteiro; as paradas caem em cascata |

**Business pages (admin) — moderação IA:** `BusinessPageModerationService` (`apps/immigrant_be/src/business-pages/business-page-moderation.service.ts`) injeta o `AiRouterService`, monta o input a partir do conteúdo da página, achata o `typeData` com `flattenModerationContent` (cada folha nomeada pelo caminho JSON — `tours[2].description`), chama a IA e valida a resposta com Zod. Prompt em `libs/ai/src/prompts/business-page-moderation.prompt.ts`; schemas em `libs/ai/src/schemas/business-page-moderation.schema.ts`.

**O veredicto é gravado**, em `business_pages.moderation_result` (JSON). O portão do submit rodava a análise e a jogava fora, então o admin abria a fila e via uma página esperando sem nenhuma indicação de por quê — e o único jeito de descobrir era pagar uma segunda chamada, que podia responder diferente porque nada fixava o modelo nem o momento. O registro é o resultado do schema mais `model`, `analyzedAt` e `origin` (`gate` | `manual`), e o `origin` é o que responde diretamente "por que esta página está aqui".

- **Só o mais recente, não a série.** A trilha de *chamadas* já vive no `AiUsageLog` (agora com `entityId` da página — antes nem o log de custo sabia de que página se tratava). Uma tabela de histórico foi considerada e recusada: `BusinessPageReview` já existe neste domínio para histórico e nenhum código a consulta; uma segunda ao lado dela seria o mesmo erro. Se a sequência "rebaixada → editada → liberada" virar necessidade real, a tabela nasce nesse dia e a coluna vira o cache do último.
- **Grava nos dois desfechos**, não só no rebaixamento: uma página que passou também tem uma última análise, e guardá-la evita um ramo no código e uma pergunta sem resposta na tela.
- **`model: null` quando ninguém respondeu.** O fallback de erro não é a opinião de um modelo; atribuir um nome ali seria pôr na boca de alguém uma frase que ele não disse. Quando o modelo respondeu e a resposta não deu parse, o nome dele **fica** — é assim que se descobre depois que um deles não sabe responder isto.
- **Editar o conteúdo não limpa o registro.** Apagar apagaria o único traço de por que a página está na fila; o `analyzedAt` na tela deixa claro que a análise pode ser anterior à edição.

### Roteiros — o que as rotas do dono decidem

O módulo `itineraries/` espelha `community-events/`, e três escolhas merecem
ficar escritas porque são fáceis de desfazer sem perceber:

- **404, nunca 403, para roteiro alheio.** Dizer que um id existe mas não é seu
  é uma resposta que quem pergunta não merecia: transforma o endpoint num jeito
  de confirmar que um roteiro existe. A posse vai dentro da consulta
  (`findFirst({ where: { id, userId } })`, molde de `Plans`), então não há leitura
  que pudesse devolvê-lo.
- **O alvo é resolvido antes de qualquer escrita.** Sem essa ordem, um pedido
  nomeando um lugar inexistente ainda deixaria um roteiro vazio para trás — e a
  pessoa o encontraria depois sem saber de onde veio.
- **Reordenar é por igualdade de conjunto, nunca por prefixo.** Uma lista a que
  falte uma parada, que repita outra, ou que nomeie a de um estranho é recusada
  inteira. Meia ordem é pior do que nenhuma: está errada e parece deliberada.

`POST /itineraries/stops` é o *quick-add*: uma toque num cartão do My City, e o
roteiro pode ainda não existir. Pedir para criar um antes de guardar o primeiro
lugar é um formulário à frente da coisa que a pessoa queria. O `defaultTitle` vem
do cliente porque é texto que a pessoa lê, e é no cliente que vive o idioma.

`GET /itineraries/:id` devolve as paradas indisponíveis — lugar desativado,
negócio que o dono tornou privado — com `available: false`. O dono precisa de as
ver para as remover; some sem explicação lê-se como perda de dados. A leitura
pública faz o contrário e filtra (BE#247).

**A renumeração acontece uma vez, no servidor.** Uma parada cujo alvo saiu de
vista — lugar desativado, negócio que o dono tornou privado — desaparece da
leitura pública, e as restantes são renumeradas 1..n ali mesmo. O mesmo array
alimenta a lista e o mapa, então o pino 3 é o item 3 por construção, e não por
dois pedaços de código concordarem. Numerar antes de filtrar deixaria buracos;
filtrar só no mapa deslocaria todos os pinos seguintes.

**Parada sem coordenada é outro caso, e fica.** `Business.lat` e `lng` são
anuláveis — herança de cadastros feitos antes de o formulário geocodificar o
endereço —, enquanto `Place` e `CommunityEvent` exigem o par. Uma parada que não
se consegue desenhar continua na lista, numerada, com `lat`/`lng` nulos: o
endereço está na página dela e é um sítio real para ir. O mapa desenha um pino a
menos do que a lista tem linhas, o que é honesto; um número deslocado não seria.
Esconder o que não se consegue colocar no mapa seria decidir por render o que é
uma questão de conteúdo.

**Medido antes do merge**, com 5 mil roteiros e 50 mil paradas: a listagem com
país e cidade responde em **7,5 ms** pelo índice `itinerary_stops_city_key_idx`;
só com país, 19 ms; o detalhe por slug, 0,04 ms pelo índice único. A varredura
sequencial em `itineraries` aparece porque a semente é uniforme — 5 mil linhas
todas públicas e todas de Portugal —, então o índice `(country_code, is_public)`
não tem o que descartar; com dado real ele entra.

A ordem de declaração no controller é a ordem de roteamento: `public`,
`public/:slug`, `mine` e `stops` estão registados **antes** de `:id`, senão o
Express entrega-os ao handler de detalhe como se fossem um id — e `public` é um
segmento literal que seria lido como slug. O `itineraries.contract.spec.ts` verifica isso e
que nenhuma resposta de sucesso é descrita por schema inline — o que compila,
arranca e responde certo, e só falha dias depois no `pnpm generate:api` do
frontend, sem tipo nenhum do outro lado.

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
- **Bull Board** fica em `GET /api/v1/admin/queues-board` — o `setGlobalPrefix`
  se aplica à rota montada por middleware. É protegido por basic auth
  (`BULL_BOARD_USER` / `BULL_BOARD_PASSWORD`) e não pelo `RolesGuard`, que não
  roda em middleware Express. Em produção o módulo só é montado se as duas
  credenciais existirem. A API JSON do admin (`/admin/queues`) é outro módulo
  e usa sessão + `RolesGuard`.

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
- **Blog Categories**: tabela `BlogCategoryTranslation` guarda **nome e slug** por locale, com
  `original_locale` na categoria (`pt` na prática — o post nasce em `en` e a categoria em `pt`).
  - A localização da categoria vive em `localize-category.ts` e é aplicada **fora** de
    `applyTranslation`, de propósito: aquele helper retorna cedo quando o idioma pedido é o
    original *do post*, e o leitor em `en` — que não precisa de tradução do post — é justamente
    quem precisa da tradução da categoria. Colocá-la lá dentro mataria o caso principal.
  - O **slug é traduzido junto com o nome** e resolvido pelas duas grafias: o filtro
    `categorySlug` e `GET /blog/categories/:slug` fazem `OR` entre o slug canônico e um
    traduzido, para que um link compartilhado antes das traduções não quebre. O canônico é
    tentado primeiro, porque é único por constraint enquanto o traduzido só é único dentro do
    seu locale.
  - Fallback: sem `lang`, ou sem linha para o `lang` pedido, saem `name`/`slug` canônicos. Uma
    categoria **nunca é omitida** — nome em pt numa trilha em inglês é um defeito; categoria
    ausente da navegação é um buraco.
  - **`translations` inclui o idioma original**, com `translated_by: 'ORIGINAL'`. O topo da
    resposta é o idioma pedido e `translations` é o mapa completo — sem isso, uma resposta
    localizada em `en` já tinha sobrescrito `slug` e não trazia linha nenhuma de `pt`, então o
    `hreflang` português da página da editoria apontava para a URL em inglês (que resolve, mas
    por redirect).
  - **Correção humana**: `PUT /admin/blog/categories/:id/translations/:locale` grava
    `translated_by: 'HUMAN'` e `translated_by_model: null`. O DTO carrega **só o nome** — o slug
    é derivado no servidor, como no rename canônico e no worker. O locale é validado **no
    service**, não só no DTO, pelo mesmo motivo das traduções de país: o unique aceita qualquer
    string, e um locale digitado errado no path viraria linha permanente que ninguém lê.
  - `POST /admin/blog/categories/:id/translations/enqueue` devolve a categoria para a IA e
    **sobrescreve a correção humana** — comportamento herdado do post, avisado no botão.

---

## 13. Variáveis de Ambiente Requeridas

### Como o ambiente é carregado

`libs/config/src/env-file.ts` aplica o `.env` em `process.env` e `libs/config/src/env.ts`
valida o resultado — os dois **no import**, antes de o Nest existir.

Isso não é redundância com o `ConfigModule.forRoot({ envFilePath: '.env' })`: aquele só roda o
dotenv quando o Nest constrói o módulo, e a essa altura `env.ts` já validou `process.env` e
`app.module.ts` já decidiu o Bull Board a partir de `env.NODE_ENV`. Enquanto o carregamento
morava só no `ConfigModule`, o `.env` era decorativo em desenvolvimento: sem exportar as 13
variáveis obrigatórias no shell, o boot local morria com `DATABASE_URL is required`.

Duas regras valem sempre:

- **O ambiente real ganha do arquivo.** Uma variável já presente em `process.env` nunca é
  sobrescrita, inclusive quando está declarada e vazia. Em produção quem manda é o que o Coolify
  injeta no container.
- **O arquivo é procurado subindo a árvore** a partir do `cwd`, então `npx tsx` disparado de
  dentro de `apps/` encontra o mesmo `.env` da raiz.

Em produção o arquivo nem chega à imagem: o `.dockerignore` exclui `.env` e `.env.*`, e o
estágio final do `Dockerfile` só copia `dist`, `node_modules`, `generated` e `prisma`.

| Variável                          | Descrição                                             |
| --------------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`                    | Connection string PostgreSQL                          |
| `PRIVATE_KEY`                     | Chave privada (base64) para auth                      |
| `GEMINI_API_KEY`                  | API key do Google Gemini (último elo do fallback)     |
| `OPEN_ROUTER`                     | API key da OpenRouter. Aceita também o nome canônico `OPENROUTER_API_KEY`; o código lê `OPENROUTER_API_KEY ?? OPEN_ROUTER` |
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

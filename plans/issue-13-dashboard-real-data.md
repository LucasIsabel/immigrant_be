# Issue #13 — Dashboard com dados reais (parte backend)

> Plano gerado em 2026-08-10. Issue: <https://github.com/LucasIsabel/immigrant_be/issues/13>
> Branch: `chore/dashboard-real-data-be` · Worktree: `.claude/worktrees/dashboard-data`

## Critérios de aceite (como escritos na issue)

- Para cada card **mantido pelo FE** (`passport-strength-card`,
  `living-benchmarks-card`, `policy-alerts-card`, `immigration-stats-card`,
  `currency-exchange-compact`), existe endpoint real no backend servindo o dado.
- Dados com origem definida (integração ou base própria) e atualização
  documentada — nada estático disfarçado de real.

## Definition of Done

- Endpoints com teste cobrindo sucesso e falha da fonte.
- Contrato conferido com o consumo do FE.

## Veredito sobre o escopo real

**O conjunto "cards mantidos pelo FE" é vazio.** O frontend resolveu o lado dele
por deleção, não por integração. Evidências verificadas no clone do
`immigrant_fe` (branch `main`, commit `4de49bb`):

- Nenhum dos 5 arquivos existe em `components/dashboard/`.
- `components/dashboard/dashboard-data-integrity.test.ts` é um teste-guarda que
  **falha** se qualquer um deles voltar, e que também proíbe datasets hardcoded
  (`const RATES =`, `const BENCHMARKS =`, `const DEFAULT_ALERTS =`, …).
- O dashboard atual (`app/(private)/dashboard/page.tsx` → `refined-overview.tsx`)
  renderiza `DashboardHeroCard`, `ActivePlansOverview`, `MyBusinessesOverview`,
  `DestinationHighlights`, `ImmigrationNews` e `BlogInsightsCarousel` — todos
  já consumindo endpoints reais deste backend.
- Sobraram dois componentes órfãos com mock (`currency-exchange.tsx`, que usa
  `Math.random()` para simular flutuação de câmbio, e `immigration-stats.tsx`)
  com **zero importadores**. São código morto do repo FE, não trabalho de BE.
- **Não há artefato órfão no BE** para os 5 cards deletados: não existe endpoint
  de passport rank, benchmarks, alerts ou taxas de câmbio. O único candidato,
  `GET /countriesnow/currency`, está vivo (usado pelo My City e pelos formulários
  de business). Nada a remover.
- **Não há hardcode disfarçado nos services envolvidos.**
  `country.repository.findAll`, `user.repository.getAllUserPlans`,
  `blog.repository.findPublishedPosts` e `business.repository.findAllByUserId`
  são Prisma puro.

O critério literal está satisfeito por vacuidade, mas **a DoD não está**: faltam
testes de sucesso/falha em 3 dos 4 endpoints que o dashboard realmente consome,
e a "origem definida e atualização documentada" não existe em lugar nenhum.

**Entregável honesto: nenhum código de produção novo — testes, documentação e o
fechamento da issue com evidência.**

## Auditoria: seção do dashboard → endpoint BE

| Seção FE | Endpoint BE | Existe? | Contrato FE↔BE | Dado real? | Testes hoje | Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `DashboardHeroCard` | nenhum (sessão better-auth + store) | n/a | ok | real | n/a | nenhum |
| `ActivePlansOverview` | `GET /api/v1/users/plan` | Sim | `UserPlanResponseDto` bate com o tipo kubb; FE usa `status`, `name`, `country.{name,visa_options,region,background_image,translations}` | Sim (base própria) | **nenhum** para `getAllUserPlans` | sucesso + falha |
| `MyBusinessesOverview` | `GET /api/v1/business/me` | Sim | FE usa cliente manual (`lib/business/api.ts`), **não** kubb — contrato não verificado por geração | Sim (Prisma) | sucesso coberto | falha |
| `DestinationHighlights` | `GET /api/v1/countries` | Sim | `CountryDto` bate com o tipo kubb (`flag`, `region`, `difficulty`, `difficulty_score`, `translations[].processing_time`) | Sim (Prisma + admin CRUD/seeds) | **nenhum** para `findAll` | sucesso + falha |
| `ImmigrationNews` + `BlogInsightsCarousel` | `GET /api/v1/blog/posts?limit=3` | Sim | `BlogPostListResponseDto.data`; `page` omitido pelo FE tem default `= 1` no `BlogQueryDto` | Sim (Prisma + pipeline AI-blog) | sucesso coberto | falha |

## Arquivos a criar/alterar

Nenhum código de produção muda.

1. **Alterar** `apps/immigrant_be/src/users/user.service.spec.ts` — novo
   `describe('getAllUserPlans')`.
2. **Alterar** `apps/immigrant_be/src/countries/country.service.spec.ts` — novo
   `describe('findAll')`.
3. **Alterar** `apps/immigrant_be/src/business/business.service.spec.ts` — caso
   de falha em `getMyBusinesses`.
4. **Alterar** `apps/immigrant_be/src/blog/blog.service.spec.ts` — caso de falha
   em `findPublishedPosts`.
5. **Criar** `apps/immigrant_be/test/dashboard-sources.e2e-spec.ts` — contrato
   HTTP dos dois endpoints públicos do dashboard, sucesso e falha.
6. **Criar** `docs/DATA_SOURCES.md` — origem e atualização por endpoint.
7. **Alterar** `docs/ARCHITECTURE.md` — referência ao `DATA_SOURCES.md`.

## Estratégia de teste

**Unit** (mocks de repository, padrão já usado nos 4 arquivos):

- `getAllUserPlans` — sucesso: repository resolve a lista com `country`
  incluído, service devolve tal-qual e chama com o `user.user.id` da sessão;
  falha: `mockRejectedValue(new Error('db down'))` e `rejects.toThrow()`, o que
  prova que a falha **propaga** (lição de 2026-08-03: log sem `throw` é sucesso
  silencioso).
- `CountryService.findAll` — sucesso e propagação de falha.
- `BusinessService.getMyBusinesses` — propagação de falha (sucesso já coberto).
- `BlogService.findPublishedPosts` — propagação de falha (sucesso já coberto).

**E2E de contrato** (`dashboard-sources.e2e-spec.ts`) no molde de
`health.e2e-spec.ts`, com `jest.mock('@app/database')` e
`jest.mock('@thallesp/nestjs-better-auth')` no topo do arquivo (armadilha ESM do
`lessons.md`). Módulo de teste só com `CountryController`/`BlogController` e
services reais sobre repositories mockados, aplicando `setGlobalPrefix`,
`ValidationPipe` e `AllExceptionsFilter`:

- `GET /api/v1/countries` → 200 e o corpo contém exatamente as chaves que
  `destination-highlights.tsx` lê. **Isto é** a "conferência de contrato com o
  FE" da DoD, em forma executável.
- `GET /api/v1/countries` com repository rejeitando → 500 no formato do filtro.
- `GET /api/v1/blog/posts?limit=3` → 200 com `{ data, total, page: 1, limit: 3 }`
  (prova o default de `page` do qual o FE depende) e as chaves de post lidas por
  `immigration-news.tsx`.
- `GET /api/v1/blog/posts?limit=999` → 400 (`@Max(50)` do `BlogQueryDto`).
- `GET /api/v1/blog/posts` com repository rejeitando → 500.

Endpoints autenticados (`/users/plan`, `/business/me`) ficam só no unit — subir
auth real no e2e esbarra na dívida de desacoplar `libs/database` de
`@app/config`, que não é desta issue.

**Antes de tudo:** rodar `pnpm test` e `pnpm lint:ci` no baseline
(lição de 2026-08-03).

## O que documentar e onde

Novo `docs/DATA_SOURCES.md`, referenciado pelo `ARCHITECTURE.md`, com colunas
**Endpoint | Fonte | Como atualiza | Frequência | Comportamento em falha**:

| Endpoint | Fonte | Atualização | Falha |
| --- | --- | --- | --- |
| `GET /users/plan` | base própria (`plans`) | tempo real, escrita do usuário | 500 padronizado |
| `GET /business/me` | base própria (`business`) | tempo real, escrita do usuário | 500 padronizado |
| `GET /countries` | base própria (`country` + `country_translations`) | CRUD admin + seeds em `prisma/seeds/`, aplicados manualmente (ver lição de 2026-08-04 sobre migration/seed no deploy) | 500 padronizado |
| `GET /blog/posts` | base própria (`blog_posts`) | publicação admin + pipeline AI-blog (cron + microservice de tradução) | 500 padronizado |
| `GET /countriesnow/*` | integração externa CountriesNow, fallback REST Countries | cache em memória, 24h por processo | 503 upstream inalcançável / 502 payload inválido |

Registrar também a decisão histórica: os 5 cards foram **removidos** pelo FE
(commit `4de49bb`, teste-guarda `dashboard-data-integrity.test.ts`) em vez de
ganharem backend — para que ninguém reabra esse escopo sem querer.

## Ordem de execução

1. Baseline: `pnpm test` e `pnpm lint:ci`; anotar falhas pré-existentes.
2. `docs/DATA_SOURCES.md` + referência no `ARCHITECTURE.md`.
3. Os 4 blocos de unit test; `pnpm test` (só os specs tocados mudam de contagem).
4. `dashboard-sources.e2e-spec.ts`; `pnpm test:e2e`.
5. `pnpm lint:ci` limpo.
6. PR com `Closes #13`, a evidência do FE (link do teste-guarda e do commit de
   deleção) e a tabela de auditoria como prova da conferência de contrato.

## O que NÃO fazer, e por quê

- **Não criar endpoints** de câmbio, passport strength, benchmarks, policy alerts
  ou stats: nenhum consumidor existe, e seria exatamente o "estático disfarçado
  de real" que a issue proíbe.
- **Não remover nem alterar o módulo `countriesnow`**: está vivo (My City e
  formulários de business) e já trata falha da fonte corretamente.
- **Não deletar** `currency-exchange.tsx` / `immigration-stats.tsx`: são do repo
  FE. Cabe uma issue no board Aloravia FE.
- **Não tocar** em `health/`, `main.ts`, `common/filters/`, `libs/config/src/env.ts`
  nem em observabilidade — zona da #18. **Dependência declarada:** o e2e novo
  importa (read-only) o `AllExceptionsFilter` para reproduzir o pipeline HTTP,
  igual ao `health.e2e-spec.ts` faz hoje; se a #18 mover ou renomear o filtro, é
  um ajuste de import de uma linha, a coordenar na ordem de merge.
- **Não** subir o `AppModule` inteiro em e2e com auth real — a dívida ESM do
  better-auth está documentada e resolvê-la é outra issue.

## Perguntas abertas

1. Algum dos 5 cards deve voltar um dia? Se sim (ex.: câmbio real via API de
   exchange rates), merece issue própria por card, com integração e cadência
   definidas — não deve ser contrabandeado na #13.
2. O contrato de `GET /business/me` no FE é manual (fora do kubb). Vale abrir
   issue no board FE para migrar ao hook gerado, fechando o único ponto onde o
   contrato não é verificado por geração?
3. O nível de e2e proposto (controller + service reais sobre repository mockado)
   é suficiente, ou você quer e2e contra o `test_db` PostgreSQL citado na seção
   10 do `ARCHITECTURE.md`?

---

## Execução (2026-08-10)

Entregue conforme o veredito: **nenhum código de produção novo**.

| Item | Arquivo | O que passou a estar coberto |
| --- | --- | --- |
| `getAllUserPlans` | `apps/immigrant_be/src/users/user.service.spec.ts` | sucesso, lista vazia e propagação de falha da fonte |
| `CountryService.findAll` | `apps/immigrant_be/src/countries/country.service.spec.ts` | idem |
| `getMyBusinesses` | `apps/immigrant_be/src/business/business.service.spec.ts` | propagação de falha (sucesso já existia) |
| `findPublishedPosts` | `apps/immigrant_be/src/blog/blog.service.spec.ts` | propagação de falha (sucesso já existia) |
| Contrato HTTP | `apps/immigrant_be/test/dashboard-sources.e2e-spec.ts` | chaves exatas lidas pelo dashboard, tipo de `difficulty_score`, `processing_time` na tradução, default de `page`, limite máximo e 500 em falha da fonte |
| Origem e atualização | `docs/DATA_SOURCES.md` | tabela por endpoint, referenciada pelo `ARCHITECTURE.md` |

O e2e de contrato é a "conferência com o consumo do FE" da DoD em forma
executável: as listas `COUNTRY_FIELDS_USED_BY_DASHBOARD` e
`POST_FIELDS_USED_BY_DASHBOARD` nomeiam os campos que
`destination-highlights.tsx` e `immigration-news.tsx` leem, de modo que uma
renomeação deste lado quebra o teste em vez de esvaziar um card em silêncio.

Resultado: 320 testes unitários (24 suites) e 22 e2e (3 suites) verdes,
`lint:ci` limpo.

### Não feito, de propósito

- Nenhum endpoint de câmbio, passport strength, benchmarks, policy alerts ou
  stats — não existe consumidor, e criá-los seria o "estático disfarçado de
  real" que a própria issue proíbe.
- O módulo `countriesnow` não foi tocado: está vivo (My City e formulários de
  negócio) e já trata falha da fonte corretamente.
- `currency-exchange.tsx` e `immigration-stats.tsx` continuam órfãos no
  `immigrant_fe`. São código morto **do repositório do frontend** — cabe issue
  no board Aloravia FE, não a esta.

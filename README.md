# Aloravia — Backend

API e workers da [Aloravia](https://aloravia.com), plataforma que acompanha o
imigrante da descoberta de uma cidade até o plano de imigração.

O frontend fica em [`immigrant_fe`](../immigrant_fe) (Next.js).

## O que o backend faz

- **Matching de imigração** — o questionário vira um prompt, o Gemini devolve
  países compatíveis, e o resultado é cacheado por similaridade semântica
  (pgvector) para não repetir chamadas ao modelo.
- **Planos de visto** — tipo de visto recomendado por país e checklist de
  etapas, com progresso por usuário.
- **My City** — negócios cadastrados por imigrantes (restaurantes, guias,
  serviços), busca geográfica por raio, páginas públicas com moderação humana
  e triagem por IA, e qualificação de publisher (quem já tem histórico
  aprovado publica sem revisão).
- **Blog** — pipeline automática: um cron por país busca o Google News, o
  Gemini escreve o post como rascunho, outra fila gera a imagem de capa, o
  admin aprova e um cron diário traduz para EN e ES.

## Estrutura

Monorepo NestJS com duas aplicações e bibliotecas compartilhadas:

```text
apps/immigrant_be/   API HTTP (prefixo /api/v1, Swagger em /api/v1/docs)
apps/microservice/   Workers BullMQ (sem porta; consome as filas)
libs/config/         env (Zod), better-auth, config do BullMQ
libs/database/       PrismaService
libs/ai/             Gemini: cliente base, prompts e schemas Zod
libs/email/          Resend + templates
libs/storage/        Cloudflare R2
```

Detalhes em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Como rodar

Requisitos: Node 22+, pnpm 9 e Docker.

```bash
docker compose up -d          # Postgres (pgvector) na 5434 + Redis na 6379
pnpm install
npx prisma migrate deploy
pnpm seed:admin               # cria o usuário admin
pnpm start                    # sobe API e worker juntos
```

### Variáveis de ambiente

Validadas por Zod em `libs/config/src/env.ts` — a aplicação não sobe se
faltar alguma.

**Obrigatórias:** `DATABASE_URL`, `REDIS_URL`, `PRIVATE_KEY`,
`GEMINI_API_KEY`, `PORT_IMMIGRANT`, `RESEND_API_KEY`, `FRONTEND_URL` e as
`CLOUDFLARE_R2_*` / `CLOUDFLARE_ENDPOINT`.

**Com default ou opcionais:** `NODE_ENV`, `PORT_MICROSERVICE`,
`CORS_ORIGINS`, `EMAIL_FROM`, `COOKIE_DOMAIN` (necessária para compartilhar o
cookie de sessão entre subdomínios em produção).

## Scripts

| Comando | O que faz |
| --- | --- |
| `pnpm start` | API + worker |
| `pnpm dev` | API em watch mode |
| `pnpm test` | Testes unitários |
| `pnpm test:e2e` | Testes end-to-end |
| `pnpm lint` | ESLint com `--fix` |
| `pnpm lint:ci` | ESLint em modo verificação (usado no CI) |
| `pnpm build` | Build de produção |
| `pnpm seed:admin` | Cria o usuário administrador |

## Filas

Todas herdam `DEFAULT_JOB_OPTIONS` (`libs/config/src/constants.ts`): 3
tentativas com backoff exponencial de 30s. Esgotadas as tentativas, o consumer
emite um evento SSE com sufixo `_failed`, que o frontend mostra como toast de
erro.

| Fila | Jobs |
| --- | --- |
| `ai_blog_queue` | `generate_ai_blog_post` (aceita cron) |
| `ai_blog_image_queue` | `generate_ai_blog_image`, `refine_ai_blog_post` |
| `ai_image_queue` | `generate_ai_image` |
| `blog_translation_queue` | `translate_blog_post`, `translate_all_pending` |

## Deploy

Coolify, a partir do `Dockerfile` (multi-stage, Node 22). O
`scripts/start.sh` sobe API e worker no mesmo container.

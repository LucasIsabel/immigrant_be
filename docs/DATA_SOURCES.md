# Fontes de Dados

Este documento responde, para cada dado que a aplicação exibe: **de onde ele
vem, com que frequência muda e o que acontece quando a fonte falha.**

Ele existe porque "dado real" não é uma propriedade do código — é uma
propriedade rastreável. Um valor estático disfarçado de integração e um valor
vindo de uma fonte de verdade são indistinguíveis na tela; a diferença está
registrada aqui.

## Dashboard do usuário

O dashboard (`app/(private)/dashboard/page.tsx` → `refined-overview.tsx` no
`immigrant_fe`) consome quatro endpoints deste backend. Todos servem dados da
base própria, escritos por usuários ou por administradores.

| Endpoint | Fonte | Como atualiza | Comportamento em falha |
| --- | --- | --- | --- |
| `GET /api/v1/users/plan` | Base própria — tabela `plans` (+ `country` e `country_translations`) | Tempo real: escrita do próprio usuário ao criar plano ou marcar etapa | Falha propaga → 500 padronizado pelo `AllExceptionsFilter` |
| `GET /api/v1/business/me` | Base própria — tabela `business` | Tempo real: escrita do próprio usuário no editor de negócio | Idem |
| `GET /api/v1/countries` | Base própria — `country` + `country_translations` | CRUD administrativo, mais seeds versionados em `prisma/seeds/`. Os seeds são aplicados **manualmente** — ver a lição de 2026-08-04 em `tasks/lessons.md` sobre migration e seed no deploy | Idem |
| `GET /api/v1/blog/posts` | Base própria — `blog_posts` | Publicação administrativa, mais o pipeline de AI blog (cron de geração + microservice de tradução) | Idem |

Em nenhum dos quatro uma falha da fonte é convertida em lista vazia. Isso é
deliberado e está coberto por teste: uma lista vazia significa "não há nada",
e engolir o erro faria uma queda de banco ser exibida como "você não tem
nenhum plano".

### Por que os cinco cards da issue #13 não aparecem aqui

A issue #13 falava em cinco cards com dados hardcoded — `passport-strength-card`,
`living-benchmarks-card`, `policy-alerts-card`, `immigration-stats-card` e
`currency-exchange-compact`. Eles exibiam um ranking de passaporte fixo, cotações
de câmbio paradas, percentuais de aprovação inventados e um contador de
documentos derivado de `steps + 5`.

O frontend resolveu isso **removendo os cinco** (commit `4de49bb` no
`immigrant_fe`), em vez de criar backend para sustentá-los. Existe lá um teste
de regressão, `components/dashboard/dashboard-data-integrity.test.ts`, que falha
se qualquer um voltar e que também proíbe datasets hardcoded no diretório.

Portanto **não há endpoint a construir para eles**, e este backend não tem
nenhum artefato órfão que os servisse. Se algum desses dados for desejado no
futuro, cada um precisa de issue própria com fonte e cadência definidas — não
de um valor plausível escrito no código.

## Integrações externas

| Endpoint | Fonte | Como atualiza | Comportamento em falha |
| --- | --- | --- | --- |
| `GET /api/v1/countriesnow/*` | API pública CountriesNow, com fallback para REST Countries no lookup de moeda | Cache em memória por processo, TTL de 24h (`countriesTtlMs = 86_400_000`) | `503 Service Unavailable` quando o upstream está inalcançável; `502 Bad Gateway` quando responde com status de erro ou payload inválido |

Este módulo **não** alimenta o dashboard — é consumido pelo My City e pelos
formulários de negócio. Está listado aqui porque é a única fonte de dados
verdadeiramente externa do backend, e porque o comportamento de cache e falha
dele é a referência para integrações futuras.

## Onde o contrato com o frontend é verificado

- **Gerado**: `/countries`, `/blog/posts` e `/users/plan` são consumidos por
  hooks gerados por kubb a partir do OpenAPI deste backend. Uma mudança de DTO
  aparece na regeração.
- **Executável**: `apps/immigrant_be/test/dashboard-sources.e2e-spec.ts` assere
  sobre HTTP real as chaves exatas que os componentes do dashboard leem, além do
  default de `page` do qual o frontend depende sem saber.
- **Manual**: `GET /business/me` é o único consumido por cliente escrito à mão no
  frontend (`lib/business/api.ts`), fora do kubb. É o único ponto onde o contrato
  não é verificado por geração.

# Todo — #39 (immigrant_fe): PATCH de país retorna 500

Plano completo: `plans/issue-39-update-country-dto.md`
Contraparte no frontend: `immigrant_fe`, branch `claude/open-issues-rvs6d6`

A issue vive no board do frontend, mas a causa raiz é deste repositório.

## Tarefas

- [x] `UpdateCountryDto` derivado do `CreateCountryDto` com `PartialType`/`OmitType`
- [x] `background_image` passa a existir no update (vem de graça da derivação)
- [x] Remover `entities/country.entity.ts` — zero importadores, grafia camelCase
- [x] `dto/country-dto.spec.ts` — guard estrutural DTO × `schema.prisma`
- [x] Provar que o teste falha contra o DTO antigo
- [x] Verificar contra Postgres 16 real com a `ValidationPipe` de `main.ts`
- [x] `docs/ARCHITECTURE.md` §3 — nome de campo em DTO é contrato de banco
- [x] Suíte completa (328), ESLint e Prettier

## Review

**A correção não é renomear quatro campos.** `UpdateCountryDto` era o único
`Update*Dto` do repo escrito à mão — todos os outros derivam do `Create*Dto` com
`PartialType`. Renomear os campos consertaria este bug e deixaria de pé o
mecanismo que o produziu: duas declarações do mesmo contrato, só uma conferida
contra o banco. Derivar torna a divergência não representável.

**O teste tinha que mudar de camada.** O `country.service.spec.ts` passava com o
bug vivo em produção, porque mocka o repository — quem rejeita o campo é o
Prisma, duas camadas abaixo. O guard novo compara os campos do DTO com as colunas
de `model Country` lidas do `schema.prisma`. Lê o schema em vez de importar
`generated/prisma` para não depender de um `prisma generate` recente e para não
arrastar o runtime do Prisma para dentro do teste.

**Verificado, não deduzido.** Contra Postgres 16 com as 49 migrations e a pipe
configurada como em `main.ts`: payload snake_case persiste os cinco campos,
`background_image` incluído; payload camelCase é rejeitado com 400 e os quatro
nomes. Contra o DTO antigo, o spec novo falha em 3 testes. 328 testes verdes
(baseline 320), ESLint e Prettier limpos.

**Coordenação de deploy — a issue subestimava.** Com `forbidNonWhitelisted:
true`, **as duas ordens quebram**: BE novo + FE antigo dá 400, FE novo + BE
antigo também. Não é "um 500 vira outro", é uma janela sem ordem segura. Os dois
PRs precisam ser mergeados em sequência curta.

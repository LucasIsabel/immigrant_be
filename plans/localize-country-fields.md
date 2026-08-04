# Plano — Localizar os campos de texto de `countries` (issue #23)

**Branch:** `feat/localize-country-fields` (empilhado sobre `feat/normalize-existing-countries`)

## Desenho

`country_descriptions` → **`country_translations`**, ganhando `benefits`, `challenges`,
`processing_time`, `investment_required` e `language_requirement`. As cinco colunas saem de
`countries`.

Escolhido por estender o mecanismo que já existe: a tabela já tinha unique
`(country_id, language)` e o repository já devolvia todos os idiomas para o cliente escolher.

**Fora da tabela de tradução:**
- `difficulty` e `job_market` — vocabulário fechado, viram código traduzido pelo FE
- `visa_options` e `popular_cities` — nomes próprios

## Passos

- [x] `schema.prisma`: modelo `CountryTranslation`, relação `translations`
- [x] Migration com backfill antes do drop
- [x] Dry run da migration contra produção com `ROLLBACK`
- [x] DTOs: `country-translation.dto.ts`, limpeza de `country.dto` / `create` / `update`
- [x] `country.repository.ts`: `descriptions` → `translations`
- [x] Helper `pickTranslation()` com fallback `en` → primeira linha
- [x] `user.service.ts` e `system.service.ts` passam a ler da tradução
- [x] Seed reestruturado: 34 países × 3 blocos de idioma
- [x] `docs/ARCHITECTURE.md`
- [ ] **FE — bloqueado**, ver abaixo

## Bloqueio do FE

`kubb.config.ts` lê o spec de `http://localhost:3000/api/v1/docs-json`, ou seja, exige o BE
**rodando local**. O BE precisa do Postgres, cujo host (`dk2ok1lth91w0vmep5d8mkor`) só resolve
dentro da rede Docker do servidor Coolify.

Para destravar, uma das opções:
1. Túnel SSH (`ssh -L 5433:dk2ok1lth91w0vmep5d8mkor:5432 root@91.99.139.53 -N`) + subir o BE
   local apontando para `localhost:5433`
2. Subir o Postgres local do `docker-compose.yml` e rodar as migrations nele
3. Apontar o kubb para um arquivo de spec commitado em vez do servidor

A opção 2 é a mais limpa e não toca em produção.

## Nota sobre conteúdo

O backfill e o seed copiam o texto atual (inglês) para os três idiomas. As linhas `pt` e `es`
ficam com inglês até que a tradução seja escrita — **não é regressão**, é o que o usuário já vê
hoje. A diferença é que agora existe o lugar certo para corrigir.

Traduzir 34 países × 5 campos × 2 idiomas é trabalho de conteúdo e merece PR própria.

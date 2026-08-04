# Plano — Normalizar os 22 países pré-existentes

**Branch:** `feat/normalize-existing-countries` (empilhado sobre `feat/seed-countries-p0-p1`)
**Issue:** #19
**Objetivo:** trazer os 22 países que já estavam cadastrados ao mesmo padrão dos 12 novos.

## Inconsistências encontradas

| Problema | Situação antes |
| --- | --- |
| Idioma dos campos | 19 dos 22 tinham `benefits`/`challenges` em português; os 12 novos em inglês |
| Densidade | 3 benefits / 2 challenges nos antigos, contra 4 / 3 nos novos |
| Vocabulário de `job_market` | Antigos usavam `High`/`Moderate`/`Low`; novos usavam `Strong`/`Moderate`/`Weak` |
| Campos livres | `processing_time`, `investment_required` e `language_requirement` misturavam PT e EN |
| Fontes | 8 países citavam sites privados como fonte oficial |

## O que foi feito

- `benefits` padronizado em **4 itens**, `challenges` em **3**, todos em inglês
- `processing_time`, `investment_required`, `language_requirement` reescritos em inglês
- `job_market` normalizado para o vocabulário `Strong` / `Moderate` / `Weak`
- 13 URLs de sites privados trocadas por portais oficiais:

  | De (privado) | Para (oficial) | País |
  | --- | --- | --- |
  | `feather-insurance.com` | `exteriores.gob.es` | Spain |
  | `immigrationspain.es` | `inclusion.gob.es` | Spain |
  | `qc-immigration.com` | `gov.uk` | United Kingdom |
  | `office-kasahara.jp` | `moj.go.jp/isa` | Japan |
  | `relocate.world`, `welcometofrance.com` | `france-visas.gouv.fr` | France |
  | `remote.com` | `ind.nl` | Netherlands |
  | `immigration-italy.com` | `vistoperitalia.esteri.it` | Italy |
  | `imminetwork.com` | `argentina.gob.ar` | Argentina |
  | `studyinsweden.se` | `migrationsverket.se` | Sweden |
  | `dublin.ie` | `irishimmigration.ie` | Ireland |

## Restrição crítica respeitada

**Nenhuma `category` de tipo de visto foi renomeada.** O seed reconcilia por
`(country_id, category)`; renomear uma categoria criaria um tipo novo e deixaria o antigo órfão,
levando junto os `visa_steps` que apontam para ele. Canada, Spain e United States têm steps
cadastrados exatamente nessas categorias.

Verificado por snapshot antes/depois: 122 categorias, zero diferenças. Só `description` e
`source` mudaram.

## Verificação

- Snapshot de categorias antes/depois: **zero renomeações**
- Resíduo de português nos campos livres: **zero**
- `job_market`: só `Strong` / `Moderate` / `Weak`
- Todos os 34 países com 4 benefits / 3 challenges
- Fontes privadas restantes: **zero**
- Dry run de UPDATE contra o schema de produção com `ROLLBACK`: 22 países atualizados,
  **`visa_steps` seguem 18** e **plano de usuário preservado**
- `pnpm lint`: rodar manualmente

## Limitação conhecida (não resolvida aqui)

`benefits`, `challenges`, `processing_time`, `investment_required` e `language_requirement`
**não são localizados** — são coluna única, não têm tabela por idioma como `country_descriptions`.

Padronizar em inglês deixa a base consistente, mas significa que um usuário em `pt` ou `es` vê
o rótulo traduzido (`messages/*.json`) com o valor em inglês. Antes desta PR o problema era o
inverso e pior: valores em português apareciam para usuários em inglês e espanhol, sem
consistência entre países.

A correção real é localizar esses campos, o que exige mudança de schema. Fica como débito.

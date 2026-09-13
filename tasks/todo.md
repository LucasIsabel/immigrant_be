# BE#343 — correr a varredura de país

Branch `feat/run-country-sweep`, 3 commits à frente de `main`. **PR por abrir**,
por decisão do Lucas a 2026-09-13: adiado até o E2E no browser poder correr.

## Feito

- [x] 1. Dobra da cidade extraída para `libs/geo` (`@app/geo`) — `7df0436`
- [x] 2. Migration `20260913024451_place_city_by_proximity` + schema
- [x] 3. Repositório: `location` por lugar, intocáveis por tuplo, `created` com QID
- [x] 4. Serviço: `ingest`/`ingestOneCity`/`sweepCountry`/`finish` — `f6dd158`
- [x] 5. Consumer e notificação
- [x] 6. API admin: campo novo, `orderBy`, exemplos das stats
- [x] 7. Specs e docs
- [x] 8. **Medir Itália** — feito, e decidiu o pré-corte por sitelinks (`8310fa2`)

## Medição de Itália (2026-09-13, `IT`/`LANDMARK`)

| perna | tempo |
| --- | --- |
| classes (SPARQL) | ~23 min |
| entidades + proximidade | ~38 min |
| visitas (pageviews) | ~26 min |
| **total** | **~87 min** para ficar com 100 lugares |

8877 candidatos, 8350 após veto, cidade por `P131` em 8116 e por proximidade em
225. Quatro sem município a 30 km (todos genuinamente ao largo), cinco não
perguntados, nenhuma classe por responder, uma truncada no tecto de 5000.

Daí o pré-corte: uma varredura pede visitas para `PLACES_PER_SWEEP × 5`
candidatos, ordenados por sitelinks — contagem que já vinha na resposta do
`wbgetentities`. Uma ingestão de cidade não pede lista curta e fica intocada.

## Portões (2026-09-13)

- unitários 1465/1466 — só o flake conhecido do `system-sse.spec.ts`, verde isolado
- `lint:ci` limpo, `--max-warnings=0`
- `nest build microservice` e `nest build immigrant_be` OK
- `prisma migrate status`: 87 migrations, sem deriva no `migrate diff`

## Por fazer

- [ ] 9. **E2E no browser** — bloqueado por memória local (8 GB, ver
      `tasks/lessons.md` e a memória `e2e-local-setup`). Precisa de ~1,5 GB
      livres. Percurso: subir Postgres/Redis, API e worker a partir de `dist`,
      frontend com `pnpm start` (não `dev`), Chrome em `127.0.0.1:3002`, login
      pelo Lucas como `delivered@resend.dev`; disparar por `fetch` na página
      autenticada com `{countryCode:'PT', scope:'COUNTRY', categories:['BEACH']}`;
      conferir os passos `discover → rank → write_texts`, a revisão com lugares
      de **várias** cidades, e abrir uma imagem para verificar que a chave do R2
      leva a cidade certa (é onde o defeito do slug apareceria). Limpar no fim:
      lugares, ingestão e imagens no R2.
- [ ] 10. Abrir o PR com `Closes #343` e mover o card para In review.

# Ações em lote no catálogo de lugares (admin)

Contexto: o bucket R2 das imagens foi apagado por engano. As fotos dos lugares
(`places/<pais>/<estado?>/<cidade>/<slug>.jpg`) sumiram. O Lucas quer, em
`/dashboard/admin/places`, apagar de uma vez os lugares de uma cidade e refazer a
ingestão dessa cidade.

## Por que apagar antes de reingerir

`persistDrafts` (microservice) trata como intocável todo lugar que não é DRAFT com
o mesmo `(countryCode, city, stateKey, slug)`. Reingerir uma cidade aprovada sem
apagar antes gera só conflitos e nenhuma imagem nova. Apagar e reingerir é o
caminho que o pipeline já suporta.

## Backend (`admin/places`, `PlacesCatalogAdminController`)

1. `POST /admin/places/bulk-delete` `{ ids: uuid[] }` (1..100) → `{ deleted }`.
   `deleteMany` por id. Ids inexistentes são ignorados (o número volta no
   `deleted`).
2. `POST /admin/places/city-reset` `{ countryCode, city, state?, reingest? }` →
   `{ deleted, keptRejected, ingestion | null }`.
   - Filtro da cidade igual ao da listagem do catálogo: `cityKey` dobrado, e
     `stateKey` só quando há estado. O que o admin vê filtrado é o que se apaga.
   - Lugares REJECTED ficam: são a memória que impede a nova ingestão de recriar
     o que alguém recusou (regra documentada no schema). O número volta em
     `keptRejected`.
   - `reingest: true`: antes de apagar, verifica se já há ingestão em curso para a
     cidade (409, nada é apagado). Reaproveita `categories`, `osmAreaId` e a
     grafia de `city`/`state` da última ingestão CITY da cidade, quando existe.
     Depois de apagar, chama `PlacesAdminService.createIngestion` (mesmo fluxo do
     formulário: cria a linha e despacha o job).
   - Itinerários: `ItineraryStop.place` é `onDelete: Cascade`, então paradas que
     apontam para lugares apagados somem. Dito no diálogo de confirmação.

## Frontend (aba Catálogo)

- Filtros de país, estado e cidade (reuso de `IngestionsFilters`).
- Checkbox em cada card, "selecionar página", barra com "Apagar selecionados".
- Com uma cidade filtrada: "Apagar todos de {cidade}" e "Apagar e refazer
  ingestão", cada um com confirmação.
- Depois de refazer: toast, invalidação do catálogo e da lista de ingestões.

## Verificação

- Unitários do serviço e do contrato (BE), testes de componente (FE),
  `pnpm validate` / `pnpm lint` / `pnpm test`.
- E2E local: o Playwright MCP não está disponível nesta sessão; dizer ao Lucas
  antes de abrir o PR.

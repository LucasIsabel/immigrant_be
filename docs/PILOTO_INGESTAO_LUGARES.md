# Piloto da ingestão de lugares — relatório go/no-go

**Data:** 2026-08-25 · **Cidades:** Lisbon, Rio de Janeiro, Miami
**Issue:** #142 · **Plano:** `plans/2026-08-25-epico-ingestao-lugares.md` (no `immigrant_fe`)

## Veredito

**Go no pipeline. No-go em rodar as 186 cidades contra a instância pública do
Overpass.**

O que foi possível medir passou, e uma das hipóteses abertas do plano foi
respondida a favor. O que bloqueia não é qualidade: é capacidade da instância
pública, e a saída já está desenhada (`OVERPASS_BASE_URL`).

## O que foi medido

### 1. Resolução de área — **passou nas três**

| Cidade | Área OSM | Nome no OSM | Como resolveu |
|---|---|---|---|
| Lisbon | `3605400890` | Lisboa | `name:en` |
| **Rio de Janeiro** | `3602697338` | Rio de Janeiro | **`admin_level:name`** |
| Miami | `3601216769` | Miami | `name:en` |

O Rio era **a hipótese aberta do plano** — a medição inicial mostrava
`area["name"="Rio de Janeiro"]` devolvendo 0. Ele resolve, mas só pelo quarto
passo da cascata, acrescentado durante a #140: o terceiro passo filtrava por
`name:en`, que é justamente a tag que falta quando os anteriores falham. Sem
essa correção o Rio continuaria irresolúvel — e com ele qualquer cidade cujo
OSM não tenha nome em inglês.

### 2. Ordem: score curado × visitas na Wikipédia — **ρ = 0,783** (meta ≥ 0,70)

Reprodutível com `pnpm places:rank-correlation Lisbon`.

| Visitas/mês | Lugar | Score curado |
|---:|---|---:|
| 12.026 | Torre de Belém | 100 |
| 9.451 | Mosteiro dos Jerónimos | 95 |
| 5.622 | Castelo de São Jorge | 88 |
| 3.571 | Praça do Comércio | 80 |
| 3.249 | Alfama | 70 |
| 1.493 | Bairro Alto | 36 |
| 1.254 | Oceanário de Lisboa | 66 |
| 694 | MAAT | 44 |
| 592 | Time Out Market | 74 |

Os quatro primeiros batem exatamente com a ordem que alguém escreveu à mão. As
discordâncias são informativas e não ruído: o **Time Out Market** foi curado em
5º e é o último em leitura, enquanto o **Bairro Alto** foi curado em último e
lê mais que o Oceanário. São dois casos em que o julgamento humano e o interesse
público divergem de verdade — não erros do sinal.

**9 de 10 resolveram.** O que faltou, *Miradouro da Senhora do Monte*, não tem
artigo em inglês — é o filtro operando exatamente como desenhado, e é a razão
pela qual estátua e placa de rua não entram no top 10.

> **Armadilha registrada:** a primeira versão desta medição resolveu
> "Castelo de São Jorge" para **Q55264655 — *Elmina Castle*, em Gana**, porque
> `wbsearchentities` devolve o primeiro palpite. O ρ saiu 0,600 comparando
> Lisboa com um castelo ganês. O script comitado agora **verifica P17/P131**
> antes de aceitar a entidade. Número de busca sem verificação não é medição.

### 3. Ritmo do Overpass — **o parâmetro estava errado, e o piloto achou**

A instância pública expõe **2 slots** simultâneos. O código usava 5s entre
consultas; com isso **as três cidades falharam todas as tentativas** no
`fetch_pois`, com 504 (*"the server is probably too busy"*).

Medição direta das 8 consultas de categoria de Lisboa:

| Intervalo | Resultado |
|---|---|
| 5s (código anterior) | piloto inteiro falhou |
| **15s** | **7 de 8 na primeira tentativa** (o único 429 é recuperado pela espera por slot) |

`INTERVALO_MINIMO_MS` passou para 15s. Custa ~2 min por cidade, dentro do que o
limiter de 1 cidade/min já permitia.

Volume de Lisboa por categoria, já filtrado por `["wikidata"]["name"]`: 72
museus/galerias, 144 históricos, 80 parques/jardins, 40 bairros, 6 mercados, 4
miradouros, 1 praia.

### 4. Capacidade da instância pública — **é o bloqueio**

Depois de algumas centenas de consultas numa tarde, `overpass-api.de` passou de
504 para **recusar conexão** (`http 000`), enquanto Wikipedia e Wikidata seguiam
respondendo 200 da mesma máquina. Não é a nossa rede nem a forma da consulta: a
mesma consulta do pipeline responde **200 em 3,65s** quando a instância aceita.

Os mirrors testados hoje não são plano B: `overpass.kumi.systems` devolveu 500,
`overpass.private.coffee` e `overpass.osm.jp` não responderam.

## O que ficou sem medir

Tudo que depende de ter POIs em mãos:

- **Redescoberta** (meta ≥ 7/10 dos curados de Lisboa)
- **Precisão dos textos novos** (meta ≥ 70% aceitos sem edição)
- **Miami sem parque de bairro no top 10** — a hipótese do filtro `enwiki` + pageviews
- **Custo real de IA** por cidade

Nada disso é bloqueio de desenho; é consequência do item 4.

## Recomendação

1. **Subir uma instância própria do Overpass** e apontar `OVERPASS_BASE_URL`.
   É a saída que o plano já previa como risco #2, e a medição de hoje a
   converte de contingência em pré-requisito. Um extrato regional (Europa +
   Américas) cobre as 186 cidades.
2. **Repetir este piloto** contra ela, para fechar as quatro métricas pendentes
   antes de liberar o backfill.
3. **Não rodar o backfill contra a instância pública.** O uso em lote é
   desencorajado na política dela, e a medição de hoje mostra o que acontece:
   a instância para de nos atender antes de a primeira dezena de cidades sair.

O pipeline em si está pronto: as três áreas resolveram, o sinal de popularidade
concorda com o julgamento humano acima da meta, e o caminho de falha se comporta
como projetado — cidade que falha fica visível, com etapa e motivo, e o retry
reaproveita a área já resolvida.

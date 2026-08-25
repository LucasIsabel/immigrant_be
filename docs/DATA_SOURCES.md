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

### Ingestão de lugares turísticos

Três fontes, cada uma respondendo ao que sabe. Nenhuma delas é consultada em
tempo de requisição: entram pelo pipeline de ingestão, disparado à mão por um
admin, e o que chega ao usuário já está no nosso banco.

| Fonte | O que fornece | Cadência e limites | Em falha |
|---|---|---|---|
| **Overpass / OpenStreetMap** (`OVERPASS_BASE_URL`) | Existência do lugar, nome, coordenada, categoria, endereço, site | Disparo manual por cidade, limitador de 1 cidade/min na fila e **intervalo mínimo de 5s entre consultas**. A instância pública documenta ~10k req/dia e desencoraja uso em lote | 429 espera pelo slot (ver abaixo) e repete até 4 vezes; 504 e 429 persistente viram erro retentável, e o `attempts: 3` do BullMQ re-roda o job |
| **Wikidata** (`wbgetentities`) | QID → artigo em inglês | Lotes de 50 ids | Sem artigo em inglês, o lugar é **descartado** — é o filtro que separa ponto turístico de estátua de rua |
| **Wikimedia Pageviews e Summary** | Popularidade (média mensal de 12 meses) e o parágrafo que ancora o texto da IA | Uma chamada por lugar sobrevivente | Devolve `null` em vez de lançar: o lugar sai do ranking, a ingestão da cidade continua |

**Por que não Google Places**: os termos proíbem armazenar o conteúdo — só o
`place_id` indefinidamente, e coordenadas por até 30 dias. Nome, endereço, foto
e avaliação não têm exceção. O nosso model `Place` guarda tudo isso, então a
fonte é incompatível com o desenho, independentemente de preço.

**Por que não Nominatim**: o Overpass resolve a área da cidade sozinho, o que
elimina a fonte com o limite mais apertado (1 req/s, 4 req/min para script
contínuo).

**Licença**: dado do OSM é **ODbL**. Armazenar é permitido; a atribuição
"© OpenStreetMap contributors" é obrigatória onde o dado aparece, e cada lugar
guarda a URL canônica do elemento em `sourceUrl`. O `INGESTION_USER_AGENT`
identifica a aplicação, como a política de uso exige — User-Agent genérico de
biblioteca é motivo declarado de bloqueio.

**O 429 do Overpass é falta de slot, não cota.** O `/api/status` da instância
pública responde `Rate limit: 2` — duas consultas simultâneas — e anuncia
quando a próxima libera: *"Slot available after: …, in 11 seconds"*. Cada slot
fica preso por um tempo proporcional ao custo da consulta, e a de área de
Lisboa levou **9,9s**: disparar a sonda logo em seguida tomava 429 sem nenhuma
cota ter sido excedida. Por isso o cliente (a) espera 5s entre quaisquer duas
consultas, não só entre categorias, e (b) quando leva 429 sem `Retry-After`,
pergunta ao `/api/status` quanto falta em vez de chutar.

**O 504 é congestionamento do servidor, e ele diz isso.** O corpo do erro traz
`Error: runtime error: … The server is probably too busy to handle your
request.` — o cliente extrai essa frase para o `errorMessage` da ingestão,
porque "Overpass respondeu 504" não diz ao admin que basta tentar de novo.
Medido em 2026-08-25: a mesma consulta alternou 200, 429 e 504 em minutos, e o
`curl` manual falhou junto com o worker — é a instância, não o cliente. Se isso
persistir no piloto, `OVERPASS_BASE_URL` aponta para um mirror ou instância
própria (os mirrors testados na data — `overpass.kumi.systems`,
`overpass.private.coffee`, `overpass.osm.jp` — devolveram 500 ou não
responderam, então "usar um mirror" não é plano B pronto: instância própria é a
saída real).

**Medido no piloto (2026-08-25, `docs/PILOTO_INGESTAO_LUGARES.md`):** o
intervalo de 5s entre consultas era curto demais — as três cidades do piloto
falharam todas as tentativas no `fetch_pois`. As mesmas 8 consultas espaçadas
**15s** devolveram 7/8 na primeira tentativa. E, depois de algumas centenas de
consultas numa tarde, a instância pública passou de 504 a **recusar conexão**,
com Wikipedia e Wikidata respondendo normalmente da mesma máquina. Rodar as 186
cidades contra ela não é viável: instância própria é pré-requisito, não
contingência.

**A armadilha do nome da cidade**: a nossa lista vem do CountriesNow em inglês
("Lisbon"), e o OSM usa o nome local ("Lisboa"). A resolução tenta `name:en`,
depois `name`, depois `boundary=administrative` com `admin_level` 6 a 8 — e
falha reportando as tentativas, nunca em silêncio.

**E a armadilha do acento**, que é outra: o CountriesNow escreve "Sao Paulo" e o
OSM guarda "São Paulo", então nenhuma das quatro tentativas exatas casa. O
Overpass não compara ignorando acento, e **classe de caracteres não resolve** —
`[aàáâã]` devolveu zero, porque o regex dele trabalha byte a byte e o `ã` ocupa
dois. O `.` casa o caractere inteiro, então as duas últimas tentativas trocam
cada vogal (mais `c` e `n`, que carregam cedilha e til) por `.`.

O padrão fica frouxo de propósito: `^S.. P..l.$` casou **28 áreas** no Brasil,
entre elas 21 "San Pablo" e duas "St. Pauls". Quem separa é a conferência do
nome do nosso lado, comparando sem acento — sobrou exatamente uma,
`3600298285`, São Paulo cidade. Frouxo na consulta, exato na verificação: pedir
precisão ao Overpass aqui não dá, e aceitar o primeiro resultado dele seria
loteria.

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

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

Três famílias de fonte, cada uma respondendo ao que sabe. Nenhuma delas é consultada em
tempo de requisição: entram pelo pipeline de ingestão, disparado à mão por um
admin, e o que chega ao usuário já está no nosso banco.

| Fonte | O que fornece | Cadência e limites | Em falha |
|---|---|---|---|
| **Wikidata Query Service** (SPARQL) + **Wikidata API** (`wbgetentities`) | Existência do lugar, nome, coordenada (P625), classe (P31 → nossa categoria), site (P856), endereço (P6375) | Uma consulta SPARQL por cidade (0,4–7 s medidos) + lotes de 50 ids para classificar. Sem cota diária prática; timeout de 60 s por consulta | 5xx é retentado 3× com pausa crescente; timeout do WDQS (que chega como HTTP 200 com a página de erro colada no JSON parcial) e cidade não encontrada viram erro — o segundo permanente, o primeiro retentável |
| **Wikidata** (`wbgetentities`, no ranqueamento) | QID → artigo em inglês e imagem (P18), na mesma chamada | Lotes de 50 ids | Sem artigo em inglês, o lugar é **descartado** — é o filtro que separa ponto turístico de estátua de rua |
| **Wikimedia Pageviews e Summary** | Popularidade (média mensal de 12 meses) e o parágrafo que ancora o texto da IA | Uma chamada por lugar sobrevivente | Devolve `null` em vez de lançar: o lugar sai do ranking, a ingestão da cidade continua |
| **Wikimedia Commons** (`imageinfo`) | Imagem do lugar (via P18 do Wikidata), licença e autor | Uma chamada + um download por lugar com P18 (~85%, medido no Porto); arquivo fica no **nosso R2**, não em hotlink | Sem P18 ou arquivo irresolúvel → lugar sem imagem, card cai no tom da categoria; a cidade não espera imagem |

**Por que não Google Places**: os termos proíbem armazenar o conteúdo — só o
`place_id` indefinidamente, e coordenadas por até 30 dias. Nome, endereço, foto
e avaliação não têm exceção. O nosso model `Place` guarda tudo isso, então a
fonte é incompatível com o desenho, independentemente de preço.

**Por que não Overpass / OpenStreetMap** (fonte de descoberta até 2026-08-26,
`docs/PILOTO_INGESTAO_LUGARES.md` guarda as medições): o Overpass só fornecia a
lista bruta de candidatos — todo filtro que decide o ranking já era do Wikidata
(artigo em inglês, visitas, P18). Era também a única fonte com muro de taxa: a
instância pública passou de 504 a recusar conexão no piloto, e hospedar a
própria para os 62 países de destino significaria importar o planeta
(400–600 GB). Ir à fonte do sinal tirou o gargalo em vez de escalá-lo. Medido
no Porto: uma consulta SPARQL devolveu os clássicos (Dom Luís I, Lello, Sé,
São Bento, Clérigos, Bolsa, Casa da Música) que o caminho OSM, por um bug de
área, não tinha achado.

**Por que não Nominatim**: o QID da cidade se resolve na própria API do
Wikidata, sem uma terceira fonte com o limite mais apertado de todas.

**Licença**: o Wikidata é **CC0** — sem obrigação de atribuição para os lugares.
Cada registro guarda mesmo assim a entidade de origem em `sourceUrl`
(`https://www.wikidata.org/wiki/Qxxx`), porque proveniência auditável é
desenho, não licença. Registros anteriores à troca guardam o elemento OSM
(`osmType`/`osmId`) e continuam sob ODbL. O `INGESTION_USER_AGENT` identifica a
aplicação em toda chamada, como a política de uso da Wikimedia exige.

**Licença das imagens**: cada arquivo do Commons traz a própria licença
(`LicenseShortName` + `Artist` da API), gravada em `image_license` e
`image_author` no registro do lugar. CC BY-SA exige exibir crédito **onde a
imagem aparece** — hospedar no R2 não desobriga. A decisão de armazenar em vez
de hotlink está registrada na issue #152: o Commons não tem SLA, desencoraja
hotlink em produção, e o volume (~30 × 186 × ~100KB ≈ 500MB) custa centavos.

**Como a cidade é resolvida.** Nunca pelo primeiro resultado da busca: "Porto"
devolve Porto Alegre primeiro, e "Castelo de São Jorge" já virou um castelo em
Gana neste projeto. A candidata precisa ter o **país certo (P17)**, o **rótulo em
inglês exato** e **coordenada (P625)**; empate se desfaz pelo número de
sitelinks — cidade tem dezenas, aldeia homônima tem meia dúzia. Não se verifica
por classe (P31): Lisboa é instância de uma classe que só existe para Portugal,
e em 62 países uma lista de classes nunca fecha.

**Como os lugares são descobertos.** `P131` **com saltos limitados** (um para
freguesia, dois para bairro), não o transitivo `P131+`, que levou 44 s no Porto
e estourou o timeout em Lisboa. A consulta **não filtra por classe**: filtrar
com `P31/P279*` dentro do SPARQL é o que estoura — o fecho de subclasses é a
parte cara — enquanto a mesma consulta sem ele responde em 0,4 s. A
classificação acontece do nosso lado, a partir do `P31` de cada candidato, com
uma tabela explícita classe → categoria, um salto de `P279` para classes
desconhecidas, e uma lista de **exclusão** medida (aeroporto, estádio,
universidade, presídio, porto, prédio de apartamentos — cada um foi visto
entrando pelo pai genérico "estrutura arquitetônica"). O que não mapeia é
descartado **e contado** em `stats.droppedAsUnmapped`, para o corte nunca ficar
invisível na tela de revisão.

**Métricas do spike (2026-08-26, `scripts/wikidata-discovery-spike.ts`):**
Lisboa contra a lista curada, comparada por QID — 8/10 reencontrados, 7/10 no
top-30 (meta ≥ 7), ρ de Spearman 0,929 (meta ≥ 0,70). Os dois que faltam: o
Miradouro da Senhora do Monte não tem artigo em inglês, e o Time Out Market é
outra entidade. Miami passou na hipótese que o piloto deixou aberta: nenhum
parque de bairro no topo.

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

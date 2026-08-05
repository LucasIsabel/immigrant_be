# Plano — Países P2 e P3 (issue #19, fatia final)

**Branch:** `feat/seed-countries-p2-p3`
**Escopo:** os 28 países restantes. Fecha a #19.

## Países

**P2 (11)** — Malta, Croatia, Estonia, Hungary, Turkey, Colombia, Paraguay, Malaysia, Israel,
Qatar, Indonesia

**P3 (17)** — Romania, Luxembourg, Cyprus, Iceland, Peru, Dominican Republic, Ecuador, Vietnam,
Philippines, Taiwan, Hong Kong, China, India, Saudi Arabia, South Africa, Morocco, Egypt

## Formato

Já no schema localizado da #23: `translations` com um bloco por idioma.

- `description` **difere** entre `pt`, `en` e `es` — escrita para cada idioma
- `benefits` (4), `challenges` (3), `processing_time`, `investment_required` e
  `language_requirement` ficam em inglês nos três blocos, **igual aos 34 países já existentes**

A tradução desses cinco campos é trabalho de conteúdo para os 62 países de uma vez, registrado
como follow-up na #23. Traduzir só os 28 novos criaria inconsistência com o resto da base.

## Vocabulários respeitados

- `difficulty`: `Easy` | `Moderate` | `Hard`
- `job_market`: `Strong` | `Moderate` | `Weak`

Validado por script — nenhum valor fora desses conjuntos.

## Passos

- [x] Gerar as entradas P2 (11 países)
- [x] Gerar as entradas P3 (17 países)
- [x] Validação estrutural
- [x] Dry run contra o schema de produção com `ROLLBACK`
- [ ] PR fechando a #19
- [ ] Rodar o seed em produção depois do merge

## Verificação

| | |
| --- | --- |
| Países no seed | 62 |
| Novos presentes | 28/28 |
| Blocos de tradução | 186 (62 × 3) |
| Tipos de visto | 233 |
| Descrições distintas entre idiomas | ✅ todas |
| `difficulty` / `job_market` fora do vocabulário | 0 |
| Fontes não-https ou de sites privados | 0 |
| Dry run | 62 países, 186 traduções, 233 vistos, `visa_steps` = 18, 0 traduções incompletas |

## Débito que continua aberto

- **Imagens de fundo:** agora são **40 países** sem arte no R2 (12 de P0/P1 + 28 destes). Todos
  entram com `background_image: ''`.
- **Conteúdo não verificado contra as fontes:** as `source` apontam para portais oficiais, mas
  os valores específicos (limiares de renda, custos de programas de investimento) foram escritos
  a partir de conhecimento geral e não conferidos um a um. Mudam com frequência.

## Atenção no merge

Esta PR **não tem migration** — só dados de seed. O deploy automático sobe o código, mas o seed
**não roda sozinho**. Depois do merge é preciso executar, dentro do container do BE:

```bash
node_modules/.bin/tsx prisma/seeds/index.ts
```

Sem isso, produção continua com 34 países.

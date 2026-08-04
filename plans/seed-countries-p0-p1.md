# Plano — Cadastro dos países P0/P1 (issue #19, fatia 1 de 4)

**Branch:** `feat/seed-countries-p0-p1`
**Issue:** #19 — cadastrar 40 países faltantes de imigração e turismo
**Escopo desta fatia:** 12 países (P0 + P1). As fatias P2 e P3 ficam para PRs seguintes.

## Bloqueador encontrado antes de começar

`countries.seed.ts` é **destrutivo**. Para cada país ele executa:

```ts
await prisma.immigrationVisaType.deleteMany({ where: { country_id: country.id } });
```

E `visa_steps.visa_type_id` tem `ON DELETE CASCADE`; `plans.selected_visa_type_id` tem `SET NULL`.

Impacto medido no banco de produção se o seed rodasse hoje:

| Efeito | Impacto real |
|---|---|
| `visa_steps` apagados por CASCADE | 18 de 18 (todos) |
| `plans.selected_visa_type_id` zerado | 1 plano de usuário real |
| UUIDs dos 75 tipos de visto | todos regenerados |

Corrigir isso é **pré-requisito** desta fatia — sem o fix, o próprio entregável da #19 destrói o
da #20.

## Passos

- [x] Medir o blast radius do seed destrutivo
- [x] Verificar disponibilidade das imagens no R2 (todas 404 — ver "Dependências")
- [x] Criar branch `feat/seed-countries-p0-p1`
- [ ] Tornar o seed não-destrutivo (reconciliação por `(country_id, category)`)
- [ ] Adicionar os 12 países ao `countries.seed.ts`
- [ ] Validar o payload contra o schema real com dry run (`ROLLBACK`, sem gravar)
- [ ] Atualizar `docs/ARCHITECTURE.md` se necessário
- [ ] Abrir PR referenciando #19 **sem** keyword de fechamento (é fatia parcial)

## Fix do seed — decisão de design

Trocar `deleteMany` + `create` por reconciliação:

- categoria já existente em `(country_id, category)` → `update` de `description`/`source`,
  **preservando o UUID** (e portanto os `visa_steps` e os planos que apontam para ele);
- categoria nova → `create`;
- categoria existente no banco mas ausente do seed → **não apagar**, apenas logar como órfã.

O não-apagar é deliberado: a exclusão cascateia para `visa_steps` e zera plano de usuário.
Remoção de categoria obsoleta passa a ser decisão humana explícita, não efeito colateral de
rodar o seed.

## Países desta fatia

**P0** — Portugal, Mexico
**P1** — Norway, Denmark, Belgium, Czechia, Greece, Thailand, Brazil, Uruguay, Panama, Costa Rica

## Dependências / débito conhecido

- **Imagens de fundo:** nenhuma das 12 existe no bucket R2 (`portugal.png` … `costarica.png`
  retornam 404; `spain.png` retorna 200). O campo `background_image` é `NOT NULL`, então os 12
  entram apontando para a constante `PENDING_BACKGROUND_IMAGE` (imagem genérica, mesma que o
  seed já usava como fallback). Fica greppável para troca quando as imagens subirem.
- **Sweden** continua com descrição só em `pt` — débito registrado na #19, não é desta fatia.

## Verificação

- Dry run do payload contra o schema real de produção com `ROLLBACK` — valida NOT NULLs, tipos
  e uniques sem gravar nada.
- `pnpm validate` / lint: **rodar manualmente** (não executar automaticamente).
- Esta PR **não** aplica nada em produção. O seed roda depois, com o fix já mergeado.

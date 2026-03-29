# Business Pages — Phase 3a Design: Submissão + Status

**Data:** 2026-03-29
**Escopo:** Fluxo de submissão owner-facing — formulário de conteúdo, salvar rascunho, submeter para revisão, modais de feedback e badge de status.

---

## Contexto

Phase 1 entregou schema + check-slug. Phase 2 entregou templates públicos + endpoint de leitura. Phase 3a fecha o loop do lado do dono do negócio: criar/editar a BusinessPage e submetê-la para moderação.

---

## 1. Backend — Endpoints novos

Todos no `BusinessPagesModule`, protegidos com `@Roles(UserRole.USER)` + verificação de ownership (a BusinessPage deve pertencer a um Business do usuário autenticado).

### `POST /api/v1/business-pages`

Cria uma `BusinessPage` em status `DRAFT`, pré-populando `pending_content` com os campos do `Business` correspondente.

**Body:**
```typescript
interface CreateBusinessPageDto {
  businessId: string;  // UUID do Business
  slug: string;        // Validado: regex + disponibilidade
  businessType: string; // Ex: "restaurante" — deve ser valor válido de BUSINESS_PAGE_TYPES
}
```

**Regras:**
- Retorna `409 Conflict` se já existir uma `BusinessPage` para o `businessId`
- Valida que o `businessId` pertence ao usuário autenticado
- Valida que o `slug` está disponível (não existe em outra `BusinessPage`)
- Valida que `businessType` é um dos 7 valores válidos
- Pré-popula `pending_content` com: `name`, `city`, `address`, `phone`, `email`, `website`, `lat`, `lng` do `Business`

**Resposta (201):** objeto `BusinessPage` completo

---

### `PUT /api/v1/business-pages/:id`

Salva o conteúdo do rascunho sem alterar o status. Atualiza `pending_content`.

**Body:**
```typescript
interface UpdateBusinessPageContentDto {
  pendingContent: {
    name: string;
    description?: string;
    logoUrl?: string;
    coverPhotoUrl?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
    address?: string;
    city: string;
    lat?: number;
    lng?: number;
    openingHours?: {
      weekdays?: string;
      weekend?: string;
    };
  };
}
```

**Regras:**
- Verifica ownership
- Se status for `APPROVED`, não altera `approved_content` — apenas `pending_content`
- Se status for `DRAFT` ou `REJECTED`, atualiza `pending_content` normalmente

**Resposta (200):** objeto `BusinessPage` atualizado

---

### `POST /api/v1/business-pages/:id/submit`

Muda o status para `PENDING_REVIEW` e registra `submitted_at`. Retorna metadado para o FE escolher qual modal exibir.

**Regras:**
- Verifica ownership
- Status deve ser `DRAFT`, `REJECTED` ou `APPROVED` → caso contrário `409 Conflict`
  - `PENDING_REVIEW`: já está em análise
  - `APPROVED_WITH_PENDING`: já tem atualização pendente
- Transições:
  - `DRAFT` → `PENDING_REVIEW`
  - `REJECTED` → `PENDING_REVIEW`
  - `APPROVED` → `APPROVED_WITH_PENDING` (mantém `approved_content` intacto)
- Retorna `{ modal: "first" | "update" }`:
  - `"first"` se `approved_content` é null (nunca aprovada antes)
  - `"update"` se `approved_content` já existe

**Resposta (200):**
```typescript
interface SubmitResponseDto {
  modal: "first" | "update";
  status: string;
}
```

---

### `GET /api/v1/business-pages/my/:businessId`

Retorna a `BusinessPage` associada ao negócio do usuário. Retorna `null` (404) se não existir.

**Regras:**
- Verifica que `businessId` pertence ao usuário autenticado

**Resposta (200):** objeto `BusinessPage` completo ou 404

---

## 2. Frontend — Formulário

### Rota

```
/(private)/dashboard/meu-negocio/[id]/pagina-publica/page.tsx
```

### Comportamento

1. Ao entrar na rota, busca `GET /business-pages/my/:businessId`
2. Se não existe `BusinessPage`: mostra `SlugInput` + campo `businessType` + botão "Criar Página" (chama `POST /business-pages`)
3. Se existe: carrega formulário com `pending_content` pré-preenchido
4. **Salvar Rascunho:** chama `PUT /business-pages/:id` — sem modal, toast de confirmação
5. **Submeter para Revisão:** chama `POST /business-pages/:id/submit` — abre Modal A ou B conforme resposta

### Campos do formulário

| Campo | Fonte pré-preenchida | Editável |
|---|---|---|
| Nome | `business.name` | ✓ |
| Descrição | `business.description` | ✓ |
| Telefone | `business.phone` | ✓ |
| WhatsApp | — (novo) | ✓ |
| Email | `business.email` | ✓ |
| Website | `business.website` | ✓ |
| Endereço | `business.address` | ✓ |
| Cidade | `business.city` | ✓ |
| Horário Seg–Sex | — (novo) | ✓ |
| Horário Sáb–Dom | — (novo) | ✓ |
| URL da logo | — (novo) | ✓ |
| Foto de capa | — (novo) | ✓ |

O `slug` é exibido como read-only após a primeira aprovação (`slugLockedAt != null`). Antes da primeira aprovação, usa o `SlugInput` já implementado na Fase 1.

### Estrutura de arquivos FE

```
app/(private)/dashboard/meu-negocio/[id]/pagina-publica/
└── page.tsx

components/dashboard/
├── PublicPageForm.tsx          ← formulário React Hook Form + Zod
├── PublicPageStatusBadge.tsx   ← badge 5 estados (sem página / rascunho / em análise / publicada / reprovada)
└── modals/
    ├── FirstSubmissionModal.tsx   ← Modal A
    └── UpdateSubmissionModal.tsx  ← Modal B

lib/business-pages/
└── owner-api.ts                ← createPage, saveDraft, submitPage, fetchMyPage
```

---

## 3. Badge de status no card do negócio

Componente `PublicPageStatusBadge` exibido no card/listagem de negócios em `/dashboard/meu-negocio`:

| Status | Badge |
|---|---|
| Sem página | cinza "Sem página pública" + link "Criar" |
| DRAFT | amarelo "Rascunho" |
| PENDING_REVIEW | âmbar "Em análise" |
| APPROVED | verde "Publicada" + link para URL pública |
| APPROVED_WITH_PENDING | verde "Publicada" + âmbar "Atualização em análise" |
| REJECTED | vermelho "Reprovada" + motivo (se houver) |

---

## 4. Fora de escopo da Fase 3a

- Upload de logo/foto de capa (usa URL direta por enquanto)
- Dashboard admin + aprovar/reprovar (Fase 3b)
- Notificações por email (Fase 3b)
- Qualificação de publisher (Fase 4)
- Preview da página antes de submeter

---

## 5. Critérios de aceitação

- [ ] `POST /business-pages` cria em DRAFT com `pending_content` pré-populado do Business
- [ ] `PUT /business-pages/:id` salva rascunho sem alterar `approved_content`
- [ ] `POST /business-pages/:id/submit` muda status e retorna `{ modal: "first" | "update" }`
- [ ] Slug bloqueado (read-only) após `slugLockedAt` preenchido
- [ ] Modal A exibida na primeira submissão, Modal B nas atualizações
- [ ] Badge de status correto em todos os 6 estados
- [ ] Verificação de ownership em todos os endpoints (usuário só acessa seus próprios negócios)

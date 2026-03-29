# Business Pages — Phase 3b Design: Admin Approval + Email Notifications

**Data:** 2026-03-29
**Escopo:** Fluxo de moderação admin — fila de revisão, aprovar/reprovar páginas, notificações por email (branded HTML).

---

## Contexto

Phase 3a entregou o fluxo owner-facing: criar rascunho, salvar, submeter para revisão. Phase 3b fecha o loop do lado do moderador: o admin visualiza a fila de submissões, aprova ou reprova, e o sistema notifica o dono por email.

---

## 1. Backend — Endpoints novos

Todos no `BusinessPagesModule`, controller separado em `BusinessPagesAdminController`, prefixo `/admin/business-pages`, protegidos com `@Roles(UserRole.ADMIN)`.

### `GET /admin/business-pages`

Lista todas as `BusinessPage`, com filtro opcional por status.

**Query params:**
```typescript
interface ListBusinessPagesQuery {
  status?: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'APPROVED_WITH_PENDING' | 'REJECTED';
}
```

**Resposta (200):** array de objetos `BusinessPage` incluindo `business.name`, `business.city` (para exibição na tabela).

---

### `POST /admin/business-pages/:id/approve`

Aprova uma submissão.

**Regras:**
- Status deve ser `PENDING_REVIEW` ou `APPROVED_WITH_PENDING` — caso contrário `409 Conflict`
- Copia `pendingContent → approvedContent`
- Define `status = APPROVED`
- Define `approvedAt = now()`
- Define `slugLockedAt = now()` se ainda for `null` (primeira aprovação)
- Envia email de aprovação (branded HTML) ao dono do negócio

**Resposta (200):** objeto `BusinessPage` atualizado

---

### `POST /admin/business-pages/:id/reject`

Reprova uma submissão com motivo opcional.

**Body:**
```typescript
interface RejectBusinessPageDto {
  reason?: string;
}
```

**Regras:**
- Status deve ser `PENDING_REVIEW` ou `APPROVED_WITH_PENDING` — caso contrário `409 Conflict`
- Se status for `PENDING_REVIEW` e `approvedContent` for `null`:
  - Define `status = REJECTED`
- Se status for `APPROVED_WITH_PENDING`:
  - Define `status = APPROVED` (versão ao vivo é preservada, alteração pendente é descartada)
- Define `rejectedAt = now()`
- Define `rejectionReason = reason` (pode ser null)
- Envia email de reprovação (branded HTML) ao dono do negócio

**Resposta (200):** objeto `BusinessPage` atualizado

---

## 2. Repository — Métodos novos

```typescript
// Listagem com join opcional de business (name, city)
listPages(status?: string): Promise<BusinessPageWithBusiness[]>

// Aprovação: copia pending→approved, seta slugLockedAt se null
approvePage(id: string): Promise<BusinessPageWithOwnerEmail>

// Reprovação: status e reason passados pelo service
rejectPage(id: string, newStatus: 'REJECTED' | 'APPROVED', reason?: string): Promise<BusinessPageWithOwnerEmail>
```

`BusinessPageWithOwnerEmail` inclui `business.user.email` e `business.user.name` para o envio de email.

---

## 3. Service — Métodos novos

```typescript
async listPages(status?: string): Promise<BusinessPageWithBusiness[]>
async approveBusinessPage(id: string): Promise<BusinessPage>
async rejectBusinessPage(id: string, dto: RejectBusinessPageDto): Promise<BusinessPage>
```

O service determina o `newStatus` para `rejectPage` com base no estado atual da página e chama `EmailService` de forma síncrona (try/catch — falha de email não reverte a operação).

---

## 4. Email Templates

Adicionados a `libs/email/src/templates/`:

### `buildApprovalEmail(businessName: string, pageUrl: string): string`

Conteúdo:
- Header azul com "My City"
- Título: "Sua página foi aprovada!"
- Corpo: informa que a página de `businessName` está visível para a comunidade
- CTA: "Ver minha página →" linkando para `pageUrl`
- Footer: "My City · Não responda a este email"

### `buildRejectionEmail(businessName: string, reason?: string): string`

Conteúdo:
- Header azul com "My City"
- Título: "Sua página foi reprovada"
- Corpo: informa que a submissão de `businessName` não foi aprovada
- Se `reason` presente: exibe o motivo em destaque
- CTA: "Editar e resubmeter →" linkando para a rota da página pública no dashboard
- Footer: "My City · Não responda a este email"

Ambos os templates exportados de `libs/email/src/index.ts`.

---

## 5. DTOs

- `RejectBusinessPageDto` — `{ reason?: string }` com `@IsOptional()` + `@IsString()`
- Nenhum body para aprovação

---

## 6. Frontend — Rota e Componentes

### Rota

```
app/(private)/dashboard/admin/business-pages/page.tsx
```

Protegida pelo layout existente em `app/(private)/dashboard/admin/layout.tsx` (já verifica role "admin").

### Comportamento

1. Ao entrar, busca `GET /admin/business-pages?status=PENDING_REVIEW` (tab inicial: "Em análise")
2. Clicar nas tabs altera o `status` do query (ou remove o filtro para "Todas")
3. Botão "Aprovar" → abre `ApproveConfirmDialog` → ao confirmar chama `POST .../approve`
4. Botão "Reprovar" → abre `RejectModal` com textarea opcional → ao confirmar chama `POST .../reject`
5. Após qualquer ação: invalida a query e exibe toast de confirmação

### Estrutura de arquivos

```
app/(private)/dashboard/admin/business-pages/
└── page.tsx

components/admin/business-pages/
├── AdminBusinessPagesTable.tsx   ← tabela com filter tabs + rows + badges + action buttons
├── ApproveConfirmDialog.tsx      ← shadcn AlertDialog ("Confirmar aprovação?")
└── RejectModal.tsx               ← shadcn Dialog com textarea opcional + confirm

lib/admin/
└── business-pages-api.ts         ← listPages, approvePage, rejectPage

hooks/admin/
├── useAdminBusinessPages.ts      ← useQuery — lista com filtro de status
├── useApprovePage.ts             ← useMutation + invalidateQueries
└── useRejectPage.ts              ← useMutation + invalidateQueries
```

### Tabela — Colunas

| Coluna | Fonte |
|---|---|
| Negócio | `business.name` + slug (subtítulo) |
| Tipo | `businessType` |
| Cidade | `business.city` |
| Submetido em | `submittedAt` formatado |
| Status | Badge colorido por status |
| Ações | Botões Aprovar + Reprovar |

### Filter tabs

| Tab | Query param |
|---|---|
| Em análise | `status=PENDING_REVIEW` |
| Atualização pendente | `status=APPROVED_WITH_PENDING` |
| Aprovadas | `status=APPROVED` |
| Reprovadas | `status=REJECTED` |
| Todas | sem filtro |

---

## 7. Fora de escopo da Fase 3b

- Preview do conteúdo pendente antes de aprovar (Fase futura)
- Filtros por cidade, tipo ou período (Fase futura)
- Notificações in-app / push (Fase futura)
- Qualificação de publisher (Fase 4)

---

## 8. Critérios de aceitação

- [ ] `GET /admin/business-pages` retorna lista filtrada por status
- [ ] `POST /admin/business-pages/:id/approve` copia `pendingContent → approvedContent`, seta `slugLockedAt` na primeira aprovação
- [ ] `POST /admin/business-pages/:id/reject` com `APPROVED_WITH_PENDING` reverte para `APPROVED` (não destrói versão ao vivo)
- [ ] Email de aprovação enviado com template branded HTML
- [ ] Email de reprovação enviado com motivo (quando fornecido)
- [ ] Falha no envio de email não reverte a operação (try/catch)
- [ ] FE: tabela filtrável por status com badges corretos
- [ ] FE: modal de reprovação com textarea opcional
- [ ] FE: rota protegida pelo layout admin existente (role "admin")

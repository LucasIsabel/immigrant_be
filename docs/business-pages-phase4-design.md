# Business Pages — Phase 4: Qualificação de Publisher

**Data:** 2026-03-30
**Escopo:** Sistema de qualificação automática de publishers com override manual admin, auto-aprovação de submissões pendentes ao qualificar, e painel admin dedicado.

---

## Contexto

Phase 3b entregou o fluxo de moderação admin. Phase 4 fecha o loop de confiança: quando um negócio demonstra histórico confiável, suas atualizações passam a ser aprovadas diretamente, sem revisão manual. Admins podem forçar ou bloquear a qualificação manualmente com motivo obrigatório.

---

## 1. Modelo de dados

Nova tabela `PublisherQualification` (relação 1:1 com `BusinessPage`):

```prisma
model PublisherQualification {
  id             String    @id @default(cuid())

  businessPageId String    @unique
  businessPage   BusinessPage @relation(fields: [businessPageId], references: [id], onDelete: Cascade)

  isQualified    Boolean   @default(false)
  qualifiedAt    DateTime?
  disqualifiedAt DateTime?

  // Campos cacheados para display (calculados ao recalcular)
  approvalsCount Int       @default(0)
  lastRejectionAt DateTime?

  // Override manual
  overrideActive Boolean   @default(false)
  overrideValue  Boolean?
  overrideById   String?
  overrideBy     User?     @relation(fields: [overrideById], references: [id])
  overrideReason String?
  overrideAt     DateTime?

  updatedAt      DateTime  @updatedAt
}
```

Critérios dinâmicos (`emailVerified`, `accountAgeDays`, `noRejectionsIn90Days`, `profileComplete`) são calculados na hora a partir dos dados existentes — não armazenados.

---

## 2. Critérios de qualificação

```typescript
interface QualificationCriteria {
  approvalsCount >= 3
  user.emailVerified === true
  user.createdAt <= now - 30 dias
  lastRejectionAt === null || lastRejectionAt < now - 90 dias
  business.name && business.city  // perfil completo
}
```

**Prioridade:** se `overrideActive = true`, usa `overrideValue` diretamente — critérios automáticos são ignorados.

---

## 3. Lógica de recálculo

O recálculo é disparado nos seguintes eventos:

| Evento | Disparado por |
| ------ | ------------- |
| Página aprovada | `BusinessPagesService.approveBusinessPage` |
| Página reprovada | `BusinessPagesService.rejectBusinessPage` |
| Override aplicado | `PublisherQualificationService.applyOverride` |
| Override removido | `PublisherQualificationService.removeOverride` |

**Algoritmo `recalculate(businessPageId)`:**

1. Busca `PublisherQualification` (cria se não existir)
2. Se `overrideActive`: `isQualified = overrideValue`
3. Senão: avalia os 5 critérios
4. Se `isQualified` mudou de `false → true`: chama `autoApprovePending(businessPageId)`
5. Se `isQualified` mudou de `true → false`: atualiza `disqualifiedAt`
6. Persiste o registro atualizado

**`autoApprovePending(businessPageId)`:**
Aprova a `BusinessPage` com o `businessPageId` informado se seu status for `PENDING_REVIEW` (copia `pendingContent → approvedContent`, envia email de aprovação). No modelo atual cada negócio tem exatamente uma `BusinessPage`, portanto não há loop.

---

## 4. Endpoints — `PublishersAdminController`

Prefixo: `/admin/publishers` | Guard: `@Roles(UserRole.ADMIN)`

### `GET /admin/publishers`

Lista todos os `PublisherQualification` com dados do negócio e critérios calculados.

**Resposta (200):** array de `PublisherQualificationView`:

```typescript
interface PublisherQualificationView {
  businessPageId: string;
  businessName: string;
  slug: string;
  isQualified: boolean;
  overrideActive: boolean;
  overrideValue?: boolean;
  overrideReason?: string;
  overrideAt?: string;
  criteria: {
    approvalsCount: number;        // atual
    approvalsRequired: 3;
    emailVerified: boolean;
    accountAgeDays: number;
    accountAgeRequired: 30;
    daysSinceLastRejection: number | null; // null = nunca rejeitado
    rejectionFreeDaysRequired: 90;
    profileComplete: boolean;
  };
}
```

### `GET /admin/publishers/:businessPageId`

Detalhe de um publisher específico. Mesma estrutura de `PublisherQualificationView`.

### `POST /admin/publishers/:businessPageId/override`

Aplica override manual.

**Body:**

```typescript
interface ApplyOverrideDto {
  value: boolean;   // true = forçar qualificado, false = bloquear
  reason: string;   // obrigatório, mínimo 10 caracteres
}
```

**Regras:**

- Cria `PublisherQualification` se não existir
- Define `overrideActive = true`, `overrideValue = value`, `overrideReason = reason`, `overrideBy = adminId`, `overrideAt = now()`
- Chama `recalculate` para aplicar efeito imediato (incluindo auto-aprovação se `value = true`)

**Resposta (200):** `PublisherQualificationView` atualizado

### `DELETE /admin/publishers/:businessPageId/override`

Remove override — devolve controle aos critérios automáticos.

**Regras:**

- Define `overrideActive = false`, limpa campos de override
- Chama `recalculate` para reavaliar critérios automáticos

**Resposta (200):** `PublisherQualificationView` atualizado

---

## 5. Integração com fluxo existente

### `BusinessPagesService.submitForReview`

Antes de definir `PENDING_REVIEW`, verifica qualificação:

```text
É publisher qualificado?
├── SIM → aprova diretamente (copia pendingContent → approvedContent, email de aprovação)
└── NÃO → fluxo normal (status = PENDING_REVIEW)
```

### `BusinessPagesService.approveBusinessPage`

Após aprovar: chama `PublisherQualificationService.recalculate(businessPageId)`.

### `BusinessPagesService.rejectBusinessPage`

Após reprovar: chama `PublisherQualificationService.recalculate(businessPageId)`.

---

## 6. Módulo

```text
PublisherQualificationModule
├── PublisherQualificationService   ← recalculate, applyOverride, removeOverride, list, findOne
├── PublisherQualificationRepository ← Prisma queries
└── PublishersAdminController       ← 4 endpoints admin
```

`BusinessPagesModule` importa `PublisherQualificationModule`.
`PublisherQualificationModule` importa `EmailModule` (para auto-aprovação).

---

## 7. Frontend

### Rota

```text
app/(private)/dashboard/admin/publishers/page.tsx
```

Protegida pelo layout admin existente (`app/(private)/dashboard/admin/layout.tsx`).

### Tabela — colunas

| Coluna | Fonte |
| ------ | ----- |
| Negócio | `businessName` + slug |
| Status | Badge: "Qualificado" / "Em progresso" / "Bloqueado (override)" / "Forçado (override)" |
| Aprovações | `approvalsCount/3` |
| Última rejeição | `daysSinceLastRejection` dias ou "Nunca" |
| Email verificado | ✅ / ❌ |
| Conta | `accountAgeDays` dias |
| Ações | Botão "Override" |

### `OverridePublisherModal`

- Toggle: Qualificado / Bloqueado
- Textarea obrigatória: motivo (mínimo 10 caracteres)
- Se override já ativo: exibe motivo atual + botão "Remover override" (sem textarea)

### Estrutura de arquivos

```text
app/(private)/dashboard/admin/publishers/
└── page.tsx

components/admin/publishers/
├── AdminPublishersTable.tsx
└── OverridePublisherModal.tsx

lib/admin/publishers-api.ts          ← listPublishers, applyOverride, removeOverride
hooks/admin/
├── useAdminPublishers.ts             ← useQuery
└── usePublisherOverride.ts           ← useMutation (apply + remove)
```

---

## 8. Fora de escopo da Phase 4

- Score visual progressivo no dashboard do owner (Phase futura)
- Notificação ao owner quando qualificar (Phase futura)
- Histórico de overrides (log de auditoria) (Phase futura)
- Desqualificação automática por inatividade (Phase futura)

---

## 9. Critérios de aceitação

- [ ] `PublisherQualification` criado automaticamente na primeira aprovação ou reprovação
- [ ] Recálculo correto após aprovação: `approvalsCount` incrementa, verifica qualificação
- [ ] Recálculo correto após reprovação: `lastRejectionAt` atualizado, pode desqualificar
- [ ] Ao qualificar (`false → true`): todas as `PENDING_REVIEW` do negócio aprovadas automaticamente
- [ ] `submitForReview` com publisher qualificado: aprova diretamente sem criar `PENDING_REVIEW`
- [ ] `POST /admin/publishers/:id/override` aplica override e recalcula imediatamente
- [ ] `DELETE /admin/publishers/:id/override` remove override e recalcula critérios automáticos
- [ ] Override com `value = true` em publisher com `PENDING_REVIEW`: auto-aprova
- [ ] FE: tabela mostra critérios individuais e badge de status correto
- [ ] FE: modal com toggle + textarea obrigatória (mínimo 10 chars)
- [ ] FE: rota protegida pelo layout admin existente

# Plano: Role Management — CRUD + User-Role Assignment

## 1. Objective

Migrar o sistema de roles de enum Prisma para tabelas no banco de dados e implementar endpoints CRUD de roles e endpoints de associação user-role, todos admin-only.

## 2. Context

- **Problema**: Roles são um enum Prisma (`UserRole { user, admin }`) armazenado como array no modelo `Users`. Isso impede criar, editar ou deletar roles dinamicamente via API.
- **Código afetado**: Schema Prisma, `RolesGuard`, `UserRole` enum, `AppModule`.
- **Resultado esperado**: Tabelas `roles` e `user_roles` no banco, 8 endpoints REST admin-only, guard atualizado para consultar as novas tabelas.

## 3. Architecture Decisions

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Apps afetados | `apps/immigrant_be` apenas | Microservice e webhooks não referenciam roles |
| Novo módulo | `apps/immigrant_be/src/roles/` | Padrão feature-first |
| Libs compartilhadas | Sem mudanças em `libs/` | Guard permanece em `common/guards/` |
| Manter enum TypeScript | **Sim** | `UserRole` enum mantido para type-safety no `@Roles()` decorator. Valores devem corresponder ao `name` na tabela `roles`. |
| Junction table | `UserRoles` com unique constraint `(userId, roleId)` | Padrão M:N com tracking de `assignedAt` |
| Migração | 3 fases: (1) criar tabelas + migrar dados, (2) atualizar guard, (3) remover enum legado em PR separado | Sem data loss, permite rollback |
| Novas dependências | Nenhuma | Tudo já instalado |

## 4. Implementation Steps

### Step 1: Adicionar modelos Prisma (Roles + UserRoles)

- **What**: Criar modelos `Roles` e `UserRoles` no schema. Adicionar relação `userRoles` no modelo `Users`. Manter campo `roles UserRole[]` temporariamente.
- **Where**: `prisma/schema.prisma`

### Step 2: Gerar e aplicar migration com seed + data migration

- **What**: Gerar migration, editar SQL para incluir seed de roles e migração de dados existentes.
- **Where**: `prisma/migrations/<timestamp>_add_roles_tables/migration.sql`

### Step 3: Criar Role Repository

- **What**: Implementar `RoleRepository` com métodos: `create`, `findAll`, `findById`, `findByName`, `update`, `delete`, `assignRole`, `revokeRole`, `findUserRoles`, `countUserRoles`.
- **Where**: `apps/immigrant_be/src/roles/role.repository.ts`

### Step 4: Criar DTOs

- **What**: Criar todos os DTOs com class-validator e Swagger decorators.
- **Where**: `apps/immigrant_be/src/roles/dto/`

### Step 5: Criar Role Service

- **What**: Implementar `RoleService` com business logic para CRUD e assignment.
- **Where**: `apps/immigrant_be/src/roles/role.service.ts`

### Step 6: Criar Role Controller

- **What**: Controller admin-only com todos os endpoints.
- **Where**: `apps/immigrant_be/src/roles/role.controller.ts`

### Step 7: Criar Role Module e registrar no AppModule

- **What**: Criar `RoleModule` e importar no `AppModule`.
- **Where**: `apps/immigrant_be/src/roles/role.module.ts` e `apps/immigrant_be/src/app.module.ts`

### Step 8: Atualizar RolesGuard

- **What**: Mudar guard para consultar `userRoles` relation em vez do enum array.
- **Where**: `apps/immigrant_be/src/common/guards/roles.guard.ts`

### Step 9: Testes unitários

- **What**: Criar testes para Service, Repository e Guard.

### Step 10: Remover enum legado (PR separado)

- **What**: Remover `roles UserRole[]` de Users e `enum UserRole` do schema Prisma.
- **Note**: Deve ser feito em deploy separado.

## 5. File Inventory

```
NEW:  apps/immigrant_be/src/roles/role.module.ts
NEW:  apps/immigrant_be/src/roles/role.controller.ts
NEW:  apps/immigrant_be/src/roles/role.service.ts
NEW:  apps/immigrant_be/src/roles/role.repository.ts
NEW:  apps/immigrant_be/src/roles/dto/create-role.dto.ts
NEW:  apps/immigrant_be/src/roles/dto/update-role.dto.ts
NEW:  apps/immigrant_be/src/roles/dto/role-response.dto.ts
NEW:  apps/immigrant_be/src/roles/dto/assign-role.dto.ts
NEW:  apps/immigrant_be/src/roles/dto/revoke-role.dto.ts
NEW:  apps/immigrant_be/src/roles/dto/user-role-response.dto.ts
NEW:  apps/immigrant_be/src/roles/role.service.spec.ts
NEW:  apps/immigrant_be/src/roles/role.repository.spec.ts
NEW:  apps/immigrant_be/src/common/guards/roles.guard.spec.ts
NEW:  prisma/migrations/<timestamp>_add_roles_tables/migration.sql
MOD:  prisma/schema.prisma
MOD:  apps/immigrant_be/src/app.module.ts
MOD:  apps/immigrant_be/src/common/guards/roles.guard.ts
```

## 6. API Contract

**Todos os endpoints: admin-only, cookie auth (`better-auth.session_token`)**

### Role CRUD

| Method | Path | Request Body | Response | Status |
|--------|------|-------------|----------|--------|
| POST | `/api/v1/admin/roles` | `{ name: string, description?: string }` | `{ id, name, description, createdAt, updatedAt }` | 201 |
| GET | `/api/v1/admin/roles` | — | `[{ id, name, description, createdAt, updatedAt }]` | 200 |
| GET | `/api/v1/admin/roles/:id` | — | `{ id, name, description, createdAt, updatedAt }` | 200 |
| PATCH | `/api/v1/admin/roles/:id` | `{ name?, description? }` | `{ id, name, description, createdAt, updatedAt }` | 200 |
| DELETE | `/api/v1/admin/roles/:id` | — | — | 204 |

### User-Role Assignment

| Method | Path | Request Body | Response | Status |
|--------|------|-------------|----------|--------|
| POST | `/api/v1/admin/roles/assign` | `{ userId: uuid, roleId: uuid }` | `{ id, userId, roleId, assignedAt, role: {...} }` | 201 |
| DELETE | `/api/v1/admin/roles/revoke` | `{ userId: uuid, roleId: uuid }` | — | 204 |
| GET | `/api/v1/admin/roles/user/:userId` | — | `[{ id, userId, roleId, assignedAt, role: {...} }]` | 200 |

## 7. Testing Plan

### Unit Tests — RoleService
- create (ok / duplicate name → ConflictException)
- findAll (retorna array)
- findById (ok / 404 → NotFoundException)
- update (ok / 404)
- delete (ok / 404 / protected role → BadRequestException)
- assignRole (ok / duplicate → ConflictException / user not found / role not found)
- revokeRole (ok / last role → BadRequestException)
- findUserRoles (retorna array com role details)

### Unit Tests — RolesGuard
- Sem @Roles() → allow
- Sem session → UnauthorizedException
- User não encontrado → UnauthorizedException
- User com role necessária → allow
- User sem role necessária → ForbiddenException

### Unit Tests — RoleRepository
- Verificar chamadas Prisma corretas para cada método

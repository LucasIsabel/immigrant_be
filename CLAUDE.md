# Convenções do Projeto — Immigrant BE

## Documento de Arquitetura

**OBRIGATÓRIO**: Antes de propor ou implementar qualquer mudança arquitetural, consulte o `docs/ARCHITECTURE.md`. Este documento descreve a arquitetura completa, padrões adotados e convenções de cada camada.

**Regra**: Toda PR que altere a arquitetura (novos módulos, novas libs, novos modelos, novos guards, novas filas, novas variáveis de ambiente) **deve** incluir a atualização do `docs/ARCHITECTURE.md` correspondente. Veja a seção 14 do documento para o checklist completo.

## Padrões Rápidos

- **Estrutura de módulo**: Controller → Service → Repository → Prisma
- **Prefixo de API**: `/api/v1`
- **Endpoints admin**: sob `/admin/`
- **Endpoints públicos**: usar `@AllowAnonymous()`
- **DTOs**: class-validator + class-transformer + decorators Swagger
- **Testes**: Jest — unit tests em `*.spec.ts`, E2E em `test/*.e2e-spec.ts`
- **Package manager**: pnpm
- **Path aliases**: `@app/config`, `@app/database`, `@app/ai`

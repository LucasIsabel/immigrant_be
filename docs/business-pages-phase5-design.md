# Business Pages — Phase 5: Upload de Imagens (Logo e Capa)

**Data:** 2026-03-30
**Escopo:** Substituir campos de URL manual por upload direto de imagens (logo e foto de capa) no formulário de edição da página pública. Keys determinísticos por negócio no R2, upload disparado ao salvar.

---

## Contexto

O formulário `PublicPageForm` já tem campos `logoUrl` e `coverPhotoUrl`, mas exige que o owner cole uma URL manualmente. Phase 5 adiciona file pickers com preview local e upload automático ao salvar, mantendo a opção de colar URL como fallback.

---

## 1. Backend

### 1.1 `StorageService` — novo método

Adicionar `uploadFileAtKey(buffer, key, mimeType)` em `libs/storage/src/storage.service.ts`:

```typescript
async uploadFileAtKey(
  buffer: Buffer,
  key: string,
  mimeType: string,
): Promise<{ url: string; key: string }>
```

Faz `PutObjectCommand` com o `key` fornecido (sobrescreve se já existir). Devolve `{ url, key }`. Não gera UUID — o key é determinístico e controlado pelo chamador.

### 1.2 Endpoints novos

Adicionados a `BusinessPagesController` (prefixo `/business-pages`), autenticados (sessão obrigatória):

```
POST /business-pages/:id/upload/logo    multipart/form-data, field "file"
POST /business-pages/:id/upload/cover   multipart/form-data, field "file"
```

**Regras (ambos):**
- Ownership check via `repository.findByIdAndUserId(id, userId)` — 403 se falhar
- Tipos aceites: `image/jpeg`, `image/png`, `image/webp`
- Tamanho máximo: **5 MB**
- Key determinístico: `business-pages/{businessId}/logo.{ext}` ou `.../cover.{ext}`
- Extensão derivada do `mimetype` do ficheiro (`.jpg`, `.png`, `.webp`)
- Delega upload a `StorageService.uploadFileAtKey`

**Resposta (200):**
```typescript
{ url: string }
```

### 1.3 Módulo

`BusinessPagesModule` passa a importar `StorageLibModule` de `@app/storage`.

---

## 2. Frontend

### 2.1 `lib/business-pages/upload-api.ts`

```typescript
export async function uploadLogo(pageId: string, file: File): Promise<{ url: string }>
export async function uploadCover(pageId: string, file: File): Promise<{ url: string }>
```

Usam `api.post(...)` com `FormData`, field `"file"`.

### 2.2 `components/dashboard/ImageUploadField.tsx`

Componente controlado reutilizável:

```typescript
interface ImageUploadFieldProps {
  label: string;
  value: string;              // URL actual (vinda do form)
  onChange: (url: string) => void;
  onFileSelect: (file: File | null) => void; // notifica form de ficheiro pendente
  disabled?: boolean;
}
```

**Comportamento:**
- Mostra preview da imagem se `value` não estiver vazio
- Botão "Escolher imagem" abre file picker (accept: `image/jpeg,image/png,image/webp`, máx. 5 MB validado client-side)
- Ao selecionar ficheiro: preview local via `URL.createObjectURL`, chama `onFileSelect(file)`
- Toggle "Colar URL" expõe `<Input>` para URL manual; ao preencher chama `onChange(url)` e `onFileSelect(null)`
- Erro de validação (tipo/tamanho inválido) mostrado inline

### 2.3 `PublicPageForm` — alterações

Estado adicional:
```typescript
const [logoPendingFile, setLogoPendingFile] = useState<File | null>(null);
const [coverPendingFile, setCoverPendingFile] = useState<File | null>(null);
```

Função `handleSaveDraft` e `handleSubmit` — antes de chamar `saveDraftMutation`, fazem upload dos ficheiros pendentes:

```typescript
async function uploadPendingFiles(pageId: string): Promise<{ logoUrl?: string; coverPhotoUrl?: string }> {
  const [logoResult, coverResult] = await Promise.all([
    logoPendingFile ? uploadLogo(pageId, logoPendingFile) : null,
    coverPendingFile ? uploadCover(pageId, coverPendingFile) : null,
  ]);
  return {
    ...(logoResult ? { logoUrl: logoResult.url } : {}),
    ...(coverResult ? { coverPhotoUrl: coverResult.url } : {}),
  };
}
```

As URLs devolvidas sobrepõem os valores do form no payload antes de chamar `saveDraft`.

Campos `logoUrl` e `coverPhotoUrl` substituídos por `<ImageUploadField>` no JSX.

---

## 3. Fora de escopo da Phase 5

- Remoção de imagens antigas do R2 (o key determinístico sobrescreve automaticamente)
- Crop / redimensionamento client-side
- Upload direto para R2 via presigned URL (mantém upload server-side)
- Score de qualificação no dashboard (Phase 6)
- OG image dinâmica (Phase 7)

---

## 4. Critérios de aceitação

- [ ] `POST /business-pages/:id/upload/logo` com ficheiro válido devolve `{ url }` e sobrescreve key no R2
- [ ] `POST /business-pages/:id/upload/cover` idem para cover
- [ ] Request de outro utilizador retorna 403
- [ ] Ficheiro > 5 MB retorna 400
- [ ] Tipo inválido (ex: PDF) retorna 400
- [ ] FE: ao selecionar ficheiro, preview aparece antes de guardar
- [ ] FE: ao clicar "Salvar Rascunho", ficheiros pendentes são enviados antes do save
- [ ] FE: opção "Colar URL" funciona como antes
- [ ] FE: erro de tipo/tamanho mostrado inline sem enviar

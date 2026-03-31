# Phase 5 — Image Upload (Logo & Cover) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace manual URL fields for logo and cover photo with file pickers that upload directly to R2 when the user saves.

**Architecture:** New `StorageService.uploadFileAtKey` enables deterministic R2 keys; two new endpoints on `BusinessPagesController` handle ownership-checked multipart uploads; the FE adds a controlled `ImageUploadField` component and queues pending files until save.

**Tech Stack:** NestJS + `@nestjs/platform-express` (Multer), `@aws-sdk/client-s3`, React + ky (FormData), shadcn/ui.

---

## File Map

### Backend (`apps/immigrant_be/` + `libs/storage/`)

| File | Action |
|---|---|
| `libs/storage/src/storage.service.ts` | Modify — add `uploadFileAtKey` method |
| `libs/storage/src/storage.service.spec.ts` | Modify — add tests for `uploadFileAtKey` |
| `apps/immigrant_be/src/business-pages/business-pages.controller.ts` | Modify — add two upload endpoints |
| `apps/immigrant_be/src/business-pages/business-pages.service.ts` | Modify — add `uploadLogo` / `uploadCover` service methods |
| `apps/immigrant_be/src/business-pages/business-pages.service.spec.ts` | Modify — add tests for upload service methods |
| `apps/immigrant_be/src/business-pages/business-pages.module.ts` | Modify — import `StorageModule` |

### Frontend (`immigrant_fe/`)

| File | Action |
|---|---|
| `lib/business-pages/upload-api.ts` | Create — `uploadLogo` and `uploadCover` |
| `components/dashboard/ImageUploadField.tsx` | Create — reusable file picker + preview component |
| `components/dashboard/PublicPageForm.tsx` | Modify — pending file state + `uploadPendingFiles` + swap inputs |

---

## Task 1: `StorageService.uploadFileAtKey`

**Context:** `libs/storage/src/storage.service.ts` already has `uploadFile` which generates a random UUID key. We need a sibling method that accepts a caller-supplied deterministic key and overwrites if it already exists.

**Files:**
- Modify: `libs/storage/src/storage.service.ts`
- Modify: `libs/storage/src/storage.service.spec.ts`

- [ ] **Step 1: Add failing tests for `uploadFileAtKey`**

Open `libs/storage/src/storage.service.spec.ts` and add a new `describe` block after the existing `uploadFile` suite:

```typescript
describe('uploadFileAtKey', () => {
  it('deve fazer upload com a key fornecida e retornar url e key', async () => {
    const buffer = Buffer.from('test');
    const result = await service.uploadFileAtKey(
      buffer,
      'business-pages/biz-1/logo.jpg',
      'image/jpeg',
    );

    expect(result.key).toBe('business-pages/biz-1/logo.jpg');
    expect(result.url).toBe(
      'https://cdn.example.com/business-pages/biz-1/logo.jpg',
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    const [command] = mockSend.mock.calls[0] as [PutObjectCommand];
    expect(command.input).toMatchObject({
      Bucket: 'test-bucket',
      Key: 'business-pages/biz-1/logo.jpg',
      Body: buffer,
      ContentType: 'image/jpeg',
    });
  });

  it('deve propagar erro quando S3.send falhar', async () => {
    mockSend.mockRejectedValueOnce(new Error('S3 error'));
    await expect(
      service.uploadFileAtKey(Buffer.from('x'), 'some/key.png', 'image/png'),
    ).rejects.toThrow('S3 error');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /path/to/immigrant_be
pnpm test libs/storage/src/storage.service.spec.ts
```

Expected: FAIL — "service.uploadFileAtKey is not a function"

- [ ] **Step 3: Implement `uploadFileAtKey` in `StorageService`**

In `libs/storage/src/storage.service.ts`, add this method after `uploadFile` (before `listFiles`):

```typescript
async uploadFileAtKey(
  buffer: Buffer,
  key: string,
  mimeType: string,
): Promise<{ url: string; key: string }> {
  await this.s3.send(
    new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  const url = `${this.publicUrl}/${key}`;
  this.logger.log(`Uploaded file at key: ${key}`);
  return { url, key };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test libs/storage/src/storage.service.spec.ts
```

Expected: all tests PASS (5 existing + 2 new = 7 total)

- [ ] **Step 5: Commit**

```bash
git add libs/storage/src/storage.service.ts libs/storage/src/storage.service.spec.ts
git commit -m "feat(storage): add uploadFileAtKey for deterministic R2 keys"
```

---

## Task 2: Upload service methods in `BusinessPagesService`

**Context:** The service owns business logic: ownership check, MIME validation, size cap, key construction. The controller just wires HTTP in/out. We test the service in isolation; controller wiring is verified by the existing pattern.

**Files:**
- Modify: `apps/immigrant_be/src/business-pages/business-pages.service.ts`
- Modify: `apps/immigrant_be/src/business-pages/business-pages.service.spec.ts`

- [ ] **Step 1: Add failing tests for upload methods**

In `apps/immigrant_be/src/business-pages/business-pages.service.spec.ts`:

At the top, add a mock for `StorageService`:

```typescript
jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));
```

Add `mockStorage` to the mock objects block (after `mockRepo`, `mockQualification`):

```typescript
const mockStorage = {
  uploadFileAtKey: jest.fn(),
};
```

In the `beforeEach` module setup, add `StorageService` provider:

```typescript
// Add to providers array in Test.createTestingModule
{ provide: StorageService, useValue: mockStorage },
```

Add this import at the top of the file (after existing imports):

```typescript
import { StorageService } from '@app/storage';
```

Also update the constructor injection in the module setup — the `BusinessPagesService` constructor will now accept a 4th argument (`storageService`). Add the provider and clear `mockStorage` in `beforeEach`.

Then add this `describe` block at the end of the main suite:

```typescript
describe('uploadImage', () => {
  const pageId = 'page-1';
  const userId = 'user-1';

  beforeEach(() => {
    mockRepo.findByIdAndUserId.mockResolvedValue({ id: pageId, businessId: 'biz-1' });
    mockStorage.uploadFileAtKey.mockResolvedValue({
      url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
      key: 'business-pages/biz-1/logo.jpg',
    });
  });

  it('uploadLogo — retorna url ao fazer upload de imagem válida', async () => {
    const file = {
      buffer: Buffer.from('img'),
      mimetype: 'image/jpeg',
      size: 100,
    } as Express.Multer.File;

    const result = await service.uploadLogo(pageId, userId, file);

    expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
      file.buffer,
      'business-pages/biz-1/logo.jpg',
      'image/jpeg',
    );
    expect(result).toEqual({
      url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
    });
  });

  it('uploadCover — retorna url ao fazer upload de imagem válida', async () => {
    mockStorage.uploadFileAtKey.mockResolvedValue({
      url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
      key: 'business-pages/biz-1/cover.png',
    });
    const file = {
      buffer: Buffer.from('img'),
      mimetype: 'image/png',
      size: 200,
    } as Express.Multer.File;

    const result = await service.uploadCover(pageId, userId, file);

    expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
      file.buffer,
      'business-pages/biz-1/cover.png',
      'image/png',
    );
    expect(result).toEqual({
      url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
    });
  });

  it('uploadLogo — lança ForbiddenException quando página não pertence ao usuário', async () => {
    mockRepo.findByIdAndUserId.mockResolvedValue(null);
    const file = {
      buffer: Buffer.from('x'),
      mimetype: 'image/jpeg',
      size: 10,
    } as Express.Multer.File;

    await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
      ForbiddenException,
    );
    expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
  });

  it('uploadLogo — lança BadRequestException para tipo MIME inválido', async () => {
    const file = {
      buffer: Buffer.from('x'),
      mimetype: 'application/pdf',
      size: 10,
    } as Express.Multer.File;

    await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
  });

  it('uploadLogo — lança BadRequestException para ficheiro > 5 MB', async () => {
    const file = {
      buffer: Buffer.from('x'),
      mimetype: 'image/jpeg',
      size: 5 * 1024 * 1024 + 1,
    } as Express.Multer.File;

    await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
      BadRequestException,
    );
    expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
  });
});
```

Also add `ForbiddenException` and `BadRequestException` to the NestJS import at the top of the spec file:

```typescript
import { ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test apps/immigrant_be/src/business-pages/business-pages.service.spec.ts
```

Expected: FAIL — "service.uploadLogo is not a function"

- [ ] **Step 3: Implement `uploadLogo` and `uploadCover` in `BusinessPagesService`**

In `apps/immigrant_be/src/business-pages/business-pages.service.ts`:

Add imports at top:

```typescript
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '@app/storage';
```

Update constructor to inject `StorageService` (add as 4th parameter):

```typescript
constructor(
  private readonly repository: BusinessPagesRepository,
  private readonly emailService: EmailService,
  private readonly qualificationService: PublisherQualificationService,
  private readonly storageService: StorageService,
) {}
```

Add a private constant and two new methods at the bottom of the class (before the closing `}`):

```typescript
private static readonly ALLOWED_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);
private static readonly MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

private mimeToExt(mimeType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  };
  return map[mimeType] ?? '';
}

private async uploadImage(
  pageId: string,
  userId: string,
  file: Express.Multer.File,
  slot: 'logo' | 'cover',
): Promise<{ url: string }> {
  if (!BusinessPagesService.ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
    throw new BadRequestException('Tipo de ficheiro não permitido. Use JPEG, PNG ou WebP.');
  }
  if (file.size > BusinessPagesService.MAX_IMAGE_SIZE) {
    throw new BadRequestException('Ficheiro excede o tamanho máximo de 5 MB.');
  }

  const page = await this.repository.findByIdAndUserId(pageId, userId);
  if (!page) throw new ForbiddenException('Acesso negado');

  const ext = this.mimeToExt(file.mimetype);
  const key = `business-pages/${page.businessId}/${slot}${ext}`;
  const { url } = await this.storageService.uploadFileAtKey(
    file.buffer,
    key,
    file.mimetype,
  );
  return { url };
}

async uploadLogo(
  pageId: string,
  userId: string,
  file: Express.Multer.File,
): Promise<{ url: string }> {
  return this.uploadImage(pageId, userId, file, 'logo');
}

async uploadCover(
  pageId: string,
  userId: string,
  file: Express.Multer.File,
): Promise<{ url: string }> {
  return this.uploadImage(pageId, userId, file, 'cover');
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test apps/immigrant_be/src/business-pages/business-pages.service.spec.ts
```

Expected: all tests PASS (existing + 5 new upload tests)

- [ ] **Step 5: Commit**

```bash
git add apps/immigrant_be/src/business-pages/business-pages.service.ts \
        apps/immigrant_be/src/business-pages/business-pages.service.spec.ts
git commit -m "feat(business-pages): add uploadLogo and uploadCover service methods"
```

---

## Task 3: Upload endpoints in `BusinessPagesController` + module wiring

**Context:** Two POST endpoints on the existing controller. Multer configured with `fileSize` limit to enforce the 5 MB cap at the HTTP layer (belt-and-suspenders with service-level check). The module needs `StorageModule` imported so the injected `StorageService` is available.

**Files:**
- Modify: `apps/immigrant_be/src/business-pages/business-pages.controller.ts`
- Modify: `apps/immigrant_be/src/business-pages/business-pages.module.ts`

- [ ] **Step 1: Add upload endpoints to `BusinessPagesController`**

Add the following imports to the existing import block in `apps/immigrant_be/src/business-pages/business-pages.controller.ts`:

```typescript
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
```

(These should be merged into the existing `@nestjs/common` and `@nestjs/swagger` import lines respectively.)

At the end of the controller class (before the closing `}`), add:

```typescript
@Post(':id/upload/logo')
@HttpCode(HttpStatus.OK)
@Roles(UserRole.USER)
@UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: { file: { type: 'string', format: 'binary' } },
  },
})
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso negado' })
@ApiOkResponse({ schema: { type: 'object', properties: { url: { type: 'string' } } } })
@ApiOperation({ summary: 'Upload da logo da página pública' })
@ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
uploadLogo(
  @Param('id') id: string,
  @Session() session: UserSession,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.service.uploadLogo(id, session.user.id, file);
}

@Post(':id/upload/cover')
@HttpCode(HttpStatus.OK)
@Roles(UserRole.USER)
@UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: { file: { type: 'string', format: 'binary' } },
  },
})
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso negado' })
@ApiOkResponse({ schema: { type: 'object', properties: { url: { type: 'string' } } } })
@ApiOperation({ summary: 'Upload da foto de capa da página pública' })
@ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
uploadCover(
  @Param('id') id: string,
  @Session() session: UserSession,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.service.uploadCover(id, session.user.id, file);
}
```

- [ ] **Step 2: Update `BusinessPagesModule` to import `StorageModule`**

In `apps/immigrant_be/src/business-pages/business-pages.module.ts`, update the imports array:

```typescript
import { StorageModule } from '@app/storage';

@Module({
  imports: [DatabaseModule, EmailModule, PublisherQualificationModule, StorageModule],
  controllers: [BusinessPagesController, BusinessPagesAdminController],
  providers: [BusinessPagesService, BusinessPagesRepository],
  exports: [BusinessPagesService],
})
export class BusinessPagesModule {}
```

- [ ] **Step 3: Verify the app builds**

```bash
pnpm build
```

Expected: BUILD SUCCEEDS with no TypeScript errors.

- [ ] **Step 4: Run full test suite for business-pages**

```bash
pnpm test apps/immigrant_be/src/business-pages/
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/immigrant_be/src/business-pages/business-pages.controller.ts \
        apps/immigrant_be/src/business-pages/business-pages.module.ts
git commit -m "feat(business-pages): add upload logo and cover endpoints"
```

---

## Task 4: FE — `lib/business-pages/upload-api.ts`

**Context:** Thin API wrapper that POSTs FormData to the two upload endpoints. Uses ky's `body` option with `FormData` (not `json:`).

**Repository:** `immigrant_fe`

**Files:**
- Create: `lib/business-pages/upload-api.ts`

- [ ] **Step 1: Create `upload-api.ts`**

```typescript
import { api } from '@/lib/api';

export interface UploadImageResponse {
  url: string;
}

export async function uploadLogo(
  pageId: string,
  file: File,
): Promise<UploadImageResponse> {
  const form = new FormData();
  form.append('file', file);
  return api
    .post(`business-pages/${pageId}/upload/logo`, { body: form })
    .json<UploadImageResponse>();
}

export async function uploadCover(
  pageId: string,
  file: File,
): Promise<UploadImageResponse> {
  const form = new FormData();
  form.append('file', file);
  return api
    .post(`business-pages/${pageId}/upload/cover`, { body: form })
    .json<UploadImageResponse>();
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /path/to/immigrant_fe
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/business-pages/upload-api.ts
git commit -m "feat(business-pages): add uploadLogo and uploadCover API helpers"
```

---

## Task 5: FE — `ImageUploadField` component

**Context:** Controlled component accepting `value` (current URL), `onChange` (URL updates), and `onFileSelect` (pending file). Shows image preview when URL is non-empty. File picker validates MIME and size client-side. "Colar URL" toggle shows a plain text input as fallback.

**Repository:** `immigrant_fe`

**Files:**
- Create: `components/dashboard/ImageUploadField.tsx`

- [ ] **Step 1: Create `ImageUploadField.tsx`**

```tsx
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ACCEPTED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  onFileSelect,
  disabled,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_MIMES.includes(file.type)) {
      setError('Tipo inválido. Use JPEG, PNG ou WebP.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('Ficheiro excede 5 MB.');
      return;
    }

    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect(file);
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    onFileSelect(null);
    setPreview(null);
  }

  const displayUrl = preview ?? value;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {displayUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayUrl}
          alt={label}
          className="h-24 w-auto rounded border object-cover"
        />
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Escolher imagem
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => setShowUrlInput((v) => !v)}
        >
          Colar URL
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {showUrlInput && (
        <Input
          placeholder="https://..."
          value={value}
          onChange={handleUrlChange}
          disabled={disabled}
        />
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/ImageUploadField.tsx
git commit -m "feat(dashboard): add ImageUploadField component with preview and URL fallback"
```

---

## Task 6: FE — Update `PublicPageForm`

**Context:** Add pending-file state, `uploadPendingFiles` helper, and replace the two URL text inputs with `<ImageUploadField>`. Upload runs before `saveDraft` in both `handleSaveDraft` and `handleSubmit`. The Zod schema for `logoUrl`/`coverPhotoUrl` stays as-is (uploaded URLs are valid).

**Repository:** `immigrant_fe`

**Files:**
- Modify: `components/dashboard/PublicPageForm.tsx`

- [ ] **Step 1: Add `logoPendingFile`/`coverPendingFile` state and import `uploadLogo`/`uploadCover`**

At the top of `PublicPageForm.tsx`, add the import:

```typescript
import { uploadLogo, uploadCover } from '@/lib/business-pages/upload-api';
import { ImageUploadField } from './ImageUploadField';
```

Inside the component function, after the existing `useState` calls, add:

```typescript
const [logoPendingFile, setLogoPendingFile] = useState<File | null>(null);
const [coverPendingFile, setCoverPendingFile] = useState<File | null>(null);
```

- [ ] **Step 2: Add `uploadPendingFiles` helper**

Inside the component function, before `handleSaveDraft`, add:

```typescript
async function uploadPendingFiles(
  pageId: string,
): Promise<{ logoUrl?: string; coverPhotoUrl?: string }> {
  const [logoResult, coverResult] = await Promise.all([
    logoPendingFile ? uploadLogo(pageId, logoPendingFile) : null,
    coverPendingFile ? uploadCover(pageId, coverPendingFile) : null,
  ]);
  setLogoPendingFile(null);
  setCoverPendingFile(null);
  return {
    ...(logoResult ? { logoUrl: logoResult.url } : {}),
    ...(coverResult ? { coverPhotoUrl: coverResult.url } : {}),
  };
}
```

- [ ] **Step 3: Update `handleSaveDraft` to upload pending files before saving**

Replace the existing `handleSaveDraft` function:

```typescript
async function handleSaveDraft(values: ContentFormValues) {
  if (!page) {
    if (!slug || !businessType) return;
    await createMutation.mutateAsync({
      businessId: business.id,
      slug,
      businessType,
    });
    return;
  }
  const uploaded = await uploadPendingFiles(page.id);
  const payload = buildPayload({ ...values, ...uploaded });
  await saveDraftMutation.mutateAsync({ id: page.id, data: payload });
}
```

Wait — `buildPayload` receives `ContentFormValues`, not a partial. The uploaded URLs override the form values. Update `buildPayload` call:

```typescript
async function handleSaveDraft(values: ContentFormValues) {
  if (!page) {
    if (!slug || !businessType) return;
    await createMutation.mutateAsync({
      businessId: business.id,
      slug,
      businessType,
    });
    return;
  }
  const uploaded = await uploadPendingFiles(page.id);
  await saveDraftMutation.mutateAsync({
    id: page.id,
    data: buildPayload({ ...values, ...uploaded }),
  });
}
```

- [ ] **Step 4: Update `handleSubmit` similarly**

Replace the existing `handleSubmit` function:

```typescript
async function handleSubmit(values: ContentFormValues) {
  if (!page) {
    if (!slug || !businessType) return;
    await createMutation.mutateAsync({
      businessId: business.id,
      slug,
      businessType,
    });
    return;
  }
  const uploaded = await uploadPendingFiles(page.id);
  await saveDraftMutation.mutateAsync({
    id: page.id,
    data: buildPayload({ ...values, ...uploaded }),
  });
  const result = await submitMutation.mutateAsync(page.id);
  setModal(result.modal);
}
```

- [ ] **Step 5: Replace `logoUrl` and `coverPhotoUrl` inputs with `ImageUploadField`**

Find the two existing `<div>` blocks for `logoUrl` and `coverPhotoUrl` in the JSX:

```tsx
<div>
  <Label htmlFor="logoUrl">URL da logo</Label>
  <Input id="logoUrl" {...form.register('logoUrl')} />
  {form.formState.errors.logoUrl && (
    <p className="mt-1 text-xs text-red-500">
      {form.formState.errors.logoUrl.message}
    </p>
  )}
</div>

<div>
  <Label htmlFor="coverPhotoUrl">URL da foto de capa</Label>
  <Input id="coverPhotoUrl" {...form.register('coverPhotoUrl')} />
  {form.formState.errors.coverPhotoUrl && (
    <p className="mt-1 text-xs text-red-500">
      {form.formState.errors.coverPhotoUrl.message}
    </p>
  )}
</div>
```

Replace them with:

```tsx
<ImageUploadField
  label="Logo"
  value={form.watch('logoUrl') ?? ''}
  onChange={(url) => form.setValue('logoUrl', url)}
  onFileSelect={setLogoPendingFile}
  disabled={isPending}
/>

<ImageUploadField
  label="Foto de capa"
  value={form.watch('coverPhotoUrl') ?? ''}
  onChange={(url) => form.setValue('coverPhotoUrl', url)}
  onFileSelect={setCoverPendingFile}
  disabled={isPending}
/>
```

- [ ] **Step 6: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/dashboard/PublicPageForm.tsx
git commit -m "feat(dashboard): replace URL inputs with ImageUploadField in PublicPageForm"
```

---

## Acceptance Criteria Verification

Before marking complete, verify these against the spec:

- [ ] `POST /business-pages/:id/upload/logo` with valid file returns `{ url }` — covered by service tests (Task 2) and confirmed by build (Task 3)
- [ ] `POST /business-pages/:id/upload/cover` — same
- [ ] Different userId returns 403 — covered by service test "lança ForbiddenException"
- [ ] File > 5 MB returns 400 — covered by service test + Multer `fileSize` limit
- [ ] Type invalid (PDF) returns 400 — covered by service test "tipo MIME inválido"
- [ ] FE: selecting file shows preview before save — implemented in `ImageUploadField` via `URL.createObjectURL`
- [ ] FE: pending files uploaded before save — `uploadPendingFiles` called in `handleSaveDraft` and `handleSubmit`
- [ ] FE: "Colar URL" still works — `showUrlInput` toggle in `ImageUploadField`
- [ ] FE: type/size error shown inline — `error` state in `ImageUploadField`

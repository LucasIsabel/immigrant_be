import { BadRequestException, ForbiddenException } from '@nestjs/common';

/** Public folder prefix for restaurant dish photos (R2 key: dishes/{uuid}.ext). */
export const DISHES_STORAGE_FOLDER = 'dishes';

/** Public folder prefix for business listing photos (R2 key: business/{uuid}.ext). */
export const BUSINESS_STORAGE_FOLDER = 'business';

export const DISH_UPLOAD_ALLOWED_MIMES = new Set(['image/jpeg', 'image/png']);

/** Public folder prefix for tour guide photos. */
export const TOUR_GUIDE_STORAGE_FOLDER = 'tour-guide';

/**
 * The only folders `POST /storage/upload` accepts.
 *
 * The endpoint took whatever `folder` it was handed, so any signed-in account
 * could write anywhere in the bucket — including into the prefixes other
 * features delete by prefix, which turns "write anywhere" into "make somebody
 * else's delete take my file too".
 *
 * An allowlist and not a denylist: a folder added by a feature that forgets to
 * come here fails loudly on the first upload, while a prefix nobody thought to
 * forbid fails silently and for as long as nobody looks.
 *
 * The per-entity uploads — an event's gallery, a comment's photo — do not come
 * through here at all: they have their own routes, which know which entity the
 * key belongs to. This endpoint only serves the three the business form uses.
 */
export const UPLOAD_FOLDER_ALLOWLIST = new Set([
  DISHES_STORAGE_FOLDER,
  BUSINESS_STORAGE_FOLDER,
  TOUR_GUIDE_STORAGE_FOLDER,
]);

/**
 * Single-segment folder name, no path traversal.
 */
export function normalizeUploadFolder(folder: string): string {
  const f = folder.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  if (!f || f.includes('..') || f.includes('/')) {
    throw new BadRequestException('Pasta inválida');
  }
  if (f.length > 64) {
    throw new BadRequestException('Pasta inválida');
  }
  return f;
}

/**
 * For `dishes` and `business`, only JPEG/PNG. For any other folder, MIME must be in `defaultAllowed`.
 */
export function validateUploadMimeForFolder(
  folder: string,
  mimetype: string,
  defaultAllowed: Set<string>,
): void {
  if (folder === DISHES_STORAGE_FOLDER || folder === BUSINESS_STORAGE_FOLDER) {
    if (!DISH_UPLOAD_ALLOWED_MIMES.has(mimetype)) {
      throw new BadRequestException(
        folder === DISHES_STORAGE_FOLDER
          ? 'Para fotos de pratos use apenas imagens JPG ou PNG'
          : 'Para fotos do negócio use apenas imagens JPG ou PNG',
      );
    }
    return;
  }
  if (!defaultAllowed.has(mimetype)) {
    throw new BadRequestException(`Tipo de arquivo não permitido: ${mimetype}`);
  }
}

/**
 * Refuses a folder this endpoint does not serve.
 *
 * `ForbiddenException` and not `BadRequest`: the request is well formed and
 * the caller is authenticated — what is missing is permission to write there.
 */
export function assertUploadFolderAllowed(folder: string): void {
  if (!UPLOAD_FOLDER_ALLOWLIST.has(folder)) {
    throw new ForbiddenException('Esta pasta não aceita envios por esta rota.');
  }
}

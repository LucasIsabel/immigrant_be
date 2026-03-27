import { BadRequestException } from '@nestjs/common';

/** Public folder prefix for restaurant dish photos (R2 key: dishes/{uuid}.ext). */
export const DISHES_STORAGE_FOLDER = 'dishes';

/** Public folder prefix for business listing photos (R2 key: business/{uuid}.ext). */
export const BUSINESS_STORAGE_FOLDER = 'business';

export const DISH_UPLOAD_ALLOWED_MIMES = new Set(['image/jpeg', 'image/png']);

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

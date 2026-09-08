import { BadRequestException, ForbiddenException } from '@nestjs/common';
import {
  assertUploadFolderAllowed,
  BUSINESS_STORAGE_FOLDER,
  DISHES_STORAGE_FOLDER,
  normalizeUploadFolder,
  TOUR_GUIDE_STORAGE_FOLDER,
} from './storage-upload.util';

describe('the folders POST /storage/upload serves', () => {
  /*
   * The endpoint took whatever folder it was handed, so any signed-in account
   * could write anywhere in the bucket — including into prefixes other
   * features delete by prefix, which turns "write anywhere" into "make
   * somebody else's delete take my file too".
   */
  it('accepts the three the business form uses', () => {
    for (const folder of [
      DISHES_STORAGE_FOLDER,
      BUSINESS_STORAGE_FOLDER,
      TOUR_GUIDE_STORAGE_FOLDER,
    ]) {
      expect(() => assertUploadFolderAllowed(folder)).not.toThrow();
    }
  });

  it('refuses a folder it does not serve', () => {
    expect(() => assertUploadFolderAllowed('uploads')).toThrow(
      ForbiddenException,
    );
  });

  /*
   * These two are the sharp cases: both are prefixes another feature deletes
   * by prefix, so writing into them from here would let one entity's cleanup
   * remove a file it never owned.
   */
  it('refuses the prefixes other features own', () => {
    expect(() => assertUploadFolderAllowed('comments')).toThrow(
      ForbiddenException,
    );
    expect(() => assertUploadFolderAllowed('community-events')).toThrow(
      ForbiddenException,
    );
  });

  it('refuses a path where a folder name was asked for', () => {
    for (const folder of ['..', 'a/../b', 'a/b', '']) {
      expect(() => normalizeUploadFolder(folder)).toThrow(BadRequestException);
    }
  });

  /*
   * `normalizeUploadFolder` was never the boundary, and this is the case that
   * shows it: `/etc` loses its slash and comes out a perfectly valid folder
   * name. What refuses it is the allowlist — which is the argument for having
   * one rather than sharpening the normaliser.
   */
  it('normalises a leading slash away, and the allowlist is what refuses it', () => {
    expect(normalizeUploadFolder('/etc')).toBe('etc');
    expect(() => assertUploadFolderAllowed('etc')).toThrow(ForbiddenException);
  });

  it('still trims a folder somebody wrote with slashes around it', () => {
    expect(normalizeUploadFolder('/business/')).toBe(BUSINESS_STORAGE_FOLDER);
  });
});

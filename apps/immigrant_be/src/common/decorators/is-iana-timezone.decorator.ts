import { registerDecorator, type ValidationOptions } from 'class-validator';

/**
 * A valid IANA timezone, decided by the runtime instead of by a list we would
 * have to maintain: `Intl.DateTimeFormat` throws `RangeError` for anything the
 * ICU database does not know.
 *
 * Lived in the community events module until a business needed one too. It is
 * the same question in both places — "is this a zone the runtime can resolve" —
 * and two copies would be two answers the day one of them is patched.
 */
export function IsIanaTimeZone(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isIanaTimeZone',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'string' || value.length === 0) return false;
          try {
            new Intl.DateTimeFormat(undefined, { timeZone: value });
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage: () => 'timezone deve ser um fuso IANA válido',
      },
    });
  };
}

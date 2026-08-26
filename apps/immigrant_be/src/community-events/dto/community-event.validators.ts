import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

/**
 * A valid IANA timezone, decided by the runtime instead of by a list we would
 * have to maintain: `Intl.DateTimeFormat` throws `RangeError` for anything the
 * ICU database does not know.
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

/** An instant that has not happened yet. */
export function IsFutureDate(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'string') return false;
          const parsed = new Date(value);
          return (
            !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now()
          );
        },
        defaultMessage: (args: ValidationArguments) =>
          `${args.property} deve ser uma data no futuro`,
      },
    });
  };
}

/**
 * Class-level: an event that nobody can be contacted about is an event the
 * moderator cannot check and the visitor cannot ask about.
 *
 * Only the create DTO carries it. `PartialType` copies property metadata but
 * not class-level constraints, so the update path re-checks the *merged*
 * contacts in the service — which is the only place where "the event still has
 * a contact after this edit" can be answered.
 */
export function HasAtLeastOneContact(options?: ValidationOptions) {
  return function (target: new (...args: never[]) => object) {
    registerDecorator({
      name: 'hasAtLeastOneContact',
      target,
      propertyName: undefined as unknown as string,
      options,
      validator: {
        validate(_value: unknown, args: ValidationArguments): boolean {
          const object = args.object as {
            contactEmail?: string;
            contactPhone?: string;
          };
          return Boolean(object.contactEmail || object.contactPhone);
        },
        defaultMessage: () =>
          'Informe contactEmail ou contactPhone para o evento',
      },
    });
  };
}

/** Class-level: an event cannot end before it starts. */
export function EndsAtNotBeforeStartsAt(options?: ValidationOptions) {
  return function (target: new (...args: never[]) => object) {
    registerDecorator({
      name: 'endsAtNotBeforeStartsAt',
      target,
      propertyName: undefined as unknown as string,
      options,
      validator: {
        validate(_value: unknown, args: ValidationArguments): boolean {
          const object = args.object as { startsAt?: string; endsAt?: string };
          if (!object.startsAt || !object.endsAt) return true;
          const startsAt = new Date(object.startsAt).getTime();
          const endsAt = new Date(object.endsAt).getTime();
          if (Number.isNaN(startsAt) || Number.isNaN(endsAt)) return true;
          return endsAt >= startsAt;
        },
        defaultMessage: () => 'endsAt não pode ser anterior a startsAt',
      },
    });
  };
}

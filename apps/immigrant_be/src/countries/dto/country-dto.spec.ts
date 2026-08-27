import 'reflect-metadata';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { plainToInstance } from 'class-transformer';
import { getMetadataStorage, validateSync } from 'class-validator';
import { CreateCountryDto } from './create-country.dto';
import { UpdateCountryDto } from './update-country.dto';

/**
 * These DTOs are spread straight into `prisma.country.create` / `.update` by
 * `CountryRepository`, with no field mapping in between. That makes the
 * property names part of the database contract, not just of the HTTP one — and
 * Prisma reports an unknown field as a thrown `PrismaClientValidationError`,
 * which reaches the client as an opaque 500.
 *
 * The service spec cannot catch this: it mocks the repository, so a misspelled
 * field passes through happily. Hence a structural check.
 */
const SCALAR_TYPES = [
  'String',
  'Int',
  'Float',
  'Boolean',
  'DateTime',
  'Decimal',
  'Json',
  'BigInt',
  'Bytes',
];

/**
 * Reads the scalar columns of `model Country` out of the schema.
 *
 * Parsed rather than imported from `generated/prisma` so the test does not drag
 * the Prisma runtime — and a stale `prisma generate` — into a check about
 * spelling. Relation fields are skipped by type: they are the ones whose type
 * is not a Prisma scalar.
 */
function countryScalarColumns(): Set<string> {
  const schema = readFileSync(
    join(__dirname, '../../../../../prisma/schema.prisma'),
    'utf8',
  );
  const model = /model Country \{([\s\S]*?)\n\}/.exec(schema);

  if (!model) {
    throw new Error('model Country not found in prisma/schema.prisma');
  }

  const columns = model[1]
    .split('\n')
    .map((line) => line.trim().split(/\s+/))
    .filter(([, type]) => SCALAR_TYPES.includes(type?.replace(/[[\]?]/g, '')))
    .map(([field]) => field);

  return new Set(columns);
}

const countryColumns = countryScalarColumns();

/** Property names carrying class-validator metadata, own and inherited. */
function validatedProperties(target: new () => object): string[] {
  const metadata = getMetadataStorage().getTargetValidationMetadatas(
    target,
    '',
    true,
    false,
  );

  return [...new Set(metadata.map((entry) => entry.propertyName))];
}

const validPayload = {
  name: 'Canada',
  flag: 'https://example.com/canada-flag.png',
  region: 'North America',
  difficulty: 'Medium',
  difficulty_score: 8,
  visa_options: ['Express Entry'],
  job_market: 'Strong in tech',
  popular_cities: ['Toronto'],
  background_image: 'https://example.com/canada-background.png',
};

describe('country DTOs', () => {
  it('parsed the country columns out of the schema', () => {
    expect([...countryColumns].sort()).toEqual([
      'background_image',
      'created_at',
      'difficulty',
      'difficulty_score',
      'flag',
      'id',
      // Filled by the seed for all 62 destinations. Deliberately absent from
      // the two DTOs below: the admin panel has no field for it, and a country
      // created there is not a freedom-of-movement destination until the seed
      // gives it a code.
      'iso2',
      'job_market',
      'name',
      'popular_cities',
      'region',
      'updated_at',
      'visa_options',
    ]);
  });

  describe.each([
    ['CreateCountryDto', CreateCountryDto, ['translations']],
    ['UpdateCountryDto', UpdateCountryDto, []],
  ])('%s', (_name, dto, relations: string[]) => {
    it('declares no field that the countries table does not have', () => {
      const unknown = validatedProperties(dto as new () => object)
        .filter((property) => !relations.includes(property))
        .filter((property) => !countryColumns.has(property));

      expect(unknown).toEqual([]);
    });
  });

  describe('UpdateCountryDto', () => {
    const properties = validatedProperties(UpdateCountryDto);

    /**
     * The admin dialog collects a background image; before this DTO was derived
     * from `CreateCountryDto` there was nowhere to send it, so it was dropped
     * at submit time and the field looked broken in the UI.
     */
    it('accepts every editable column of the country', () => {
      expect(properties.sort()).toEqual(Object.keys(validPayload).sort());
    });

    /**
     * Translations are written through `PUT /countries/:id/translations/:language`.
     * Accepting them here would hand Prisma a plain array where it wants a
     * nested write.
     */
    it('does not accept translations', () => {
      expect(properties).not.toContain('translations');
    });

    it('validates a full snake_case payload', () => {
      const instance = plainToInstance(UpdateCountryDto, validPayload);

      expect(validateSync(instance, { whitelist: true })).toEqual([]);
    });

    it('validates a partial payload — every field is optional', () => {
      const instance = plainToInstance(UpdateCountryDto, { name: 'Canada' });

      expect(validateSync(instance, { whitelist: true })).toEqual([]);
    });

    /**
     * The exact regression. `main.ts` runs the pipe with
     * `forbidNonWhitelisted: true`, so a camelCase payload is now a 400 instead
     * of the 500 it used to be — which is why the frontend has to ship in step
     * with this change.
     */
    it('rejects the camelCase spelling that used to reach Prisma', () => {
      const instance = plainToInstance(UpdateCountryDto, {
        name: 'Canada',
        difficultyScore: 8,
        visaOptions: ['Express Entry'],
        jobMarket: 'Strong in tech',
        popularCities: ['Toronto'],
      });

      const rejected = validateSync(instance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      }).map((error) => error.property);

      expect(rejected.sort()).toEqual([
        'difficultyScore',
        'jobMarket',
        'popularCities',
        'visaOptions',
      ]);
    });
  });
});

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateCommunityEventDto } from './update-community-event.dto';

const failingRules = async (payload: Record<string, unknown>) => {
  const errors = await validate(
    plainToInstance(UpdateCommunityEventDto, payload),
  );
  return errors.flatMap((error) => Object.keys(error.constraints ?? {}));
};

const photo = (n: number) =>
  `https://cdn.example.com/community-events/event-1/gallery/${n}.jpg`;

describe('UpdateCommunityEventDto', () => {
  it('accepts an edit that touches a single field', async () => {
    expect(await failingRules({ title: 'Outro título' })).toEqual([]);
  });

  it('accepts null on every field an edit may clear', async () => {
    expect(
      await failingRules({
        endsAt: null,
        businessId: null,
        contactEmail: null,
        contactPhone: null,
        priceNote: null,
        externalUrl: null,
        minAge: null,
      }),
    ).toEqual([]);
  });

  it('still checks the format of a field that was actually filled', async () => {
    expect(await failingRules({ contactEmail: 'não-é-email' })).toContain(
      'isEmail',
    );
  });

  it('refuses a description carrying HTML', async () => {
    expect(
      await failingRules({
        description: '<p>Uma tarde de artesanato na cidade toda.</p>',
      }),
    ).toContain('isHtmlFree');
  });

  it('accepts a reordered gallery', async () => {
    expect(await failingRules({ images: [photo(2), photo(1)] })).toEqual([]);
  });

  it('refuses a gallery longer than the cap', async () => {
    expect(
      await failingRules({
        images: Array.from({ length: 9 }, (_, index) => photo(index)),
      }),
    ).toContain('arrayMaxSize');
  });
});

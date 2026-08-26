import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCommunityEventDto } from './create-community-event.dto';
import { COMMUNITY_EVENT_TERMS_VERSION } from '../community-events.constants';

const inDays = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString();

const validPayload = (overrides: Record<string, unknown> = {}) => ({
  title: 'Feira de artesanato',
  description: 'Uma tarde de artesanato feito por imigrantes da cidade.',
  category: 'FAIR',
  startsAt: inDays(7),
  timezone: 'Europe/Lisbon',
  countryCode: 'PT',
  city: 'Lisbon',
  venueName: 'Mercado de Campo de Ourique',
  venueAddress: 'Rua Coelho da Rocha 104',
  lat: 38.7169,
  lng: -9.1662,
  contactEmail: 'eventos@exemplo.pt',
  isFree: true,
  acceptTerms: true,
  termsVersion: COMMUNITY_EVENT_TERMS_VERSION,
  ...overrides,
});

const failingRules = async (payload: Record<string, unknown>) => {
  const errors = await validate(
    plainToInstance(CreateCommunityEventDto, payload),
  );
  return errors.flatMap((error) => Object.keys(error.constraints ?? {}));
};

describe('CreateCommunityEventDto', () => {
  it('accepts a complete event', async () => {
    expect(await failingRules(validPayload())).toEqual([]);
  });

  it('refuses a timezone the runtime does not know', async () => {
    expect(
      await failingRules(validPayload({ timezone: 'Europe/Lisboa' })),
    ).toContain('isIanaTimeZone');
  });

  it('refuses an event that ends before it starts', async () => {
    expect(
      await failingRules(
        validPayload({ startsAt: inDays(7), endsAt: inDays(6) }),
      ),
    ).toContain('endsAtNotBeforeStartsAt');
  });

  it('refuses an event that already happened', async () => {
    expect(
      await failingRules(validPayload({ startsAt: inDays(-1) })),
    ).toContain('isFutureDate');
  });

  it('refuses a link without a protocol', async () => {
    expect(
      await failingRules(validPayload({ externalUrl: 'exemplo.pt/ingressos' })),
    ).toContain('isUrl');
  });

  it('refuses an event nobody can be contacted about', async () => {
    const payload = validPayload();
    delete (payload as Record<string, unknown>).contactEmail;

    expect(await failingRules(payload)).toContain('hasAtLeastOneContact');
  });

  it('refuses a form submitted without accepting the terms', async () => {
    expect(await failingRules(validPayload({ acceptTerms: false }))).toContain(
      'equals',
    );
  });

  it('refuses a minimum age outside the range the product allows', async () => {
    expect(await failingRules(validPayload({ minAge: 40 }))).toContain('max');
  });

  it('refuses a lowercase country code', async () => {
    expect(await failingRules(validPayload({ countryCode: 'pt' }))).toContain(
      'matches',
    );
  });

  it('refuses a description carrying HTML', async () => {
    expect(
      await failingRules(
        validPayload({
          description:
            'Uma tarde de artesanato <script>alert(1)</script> na cidade.',
        }),
      ),
    ).toContain('isHtmlFree');
  });

  it('accepts Markdown in the description', async () => {
    expect(
      await failingRules(
        validPayload({
          description:
            '## Programa\n\n- 18h **abertura**\n- 20h música ao vivo\n\nEntrada por [aqui](https://exemplo.pt). 5 < 10 e a > b.',
        }),
      ),
    ).toEqual([]);
  });

  it('refuses coordinates outside the globe', async () => {
    expect(await failingRules(validPayload({ lat: 120 }))).toContain(
      'isLatitude',
    );
  });
});

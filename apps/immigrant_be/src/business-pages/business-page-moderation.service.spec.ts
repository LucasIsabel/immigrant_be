jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { AiRouterService, MODERATION_FIELD_MAX_CHARS } from '@app/ai';
import {
  BusinessPageModerationService,
  collectPhotos,
} from './business-page-moderation.service';

describe('BusinessPageModerationService', () => {
  let aiRouter: { generateJson: jest.Mock; analyseImages: jest.Mock };
  let service: BusinessPageModerationService;

  beforeEach(() => {
    aiRouter = { generateJson: jest.fn(), analyseImages: jest.fn() };
    service = new BusinessPageModerationService(
      aiRouter as unknown as AiRouterService,
    );
  });

  it('moderates through the business_moderation scenario', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    const result = await service.moderateContent(
      { description: 'A bakery' },
      'RESTAURANT',
    );

    expect(aiRouter.generateJson).toHaveBeenCalledWith(
      'business_moderation',
      expect.any(String),
      expect.anything(),
      { entityType: 'business_page', entityId: undefined },
    );
    expect(result.result.recommendation).toBe('approve');
  });

  it('defaults to manual review when the chain returns nothing usable', async () => {
    // A moderation that answers "approve" on a parse failure would wave
    // through exactly the content it exists to catch.
    aiRouter.generateJson.mockResolvedValue({ data: null, result: {} });

    const result = await service.moderateContent({}, 'RESTAURANT');

    expect(result.result.recommendation).toBe('review');
    expect(result.result.riskLevel).toBe('medium');
  });

  it('sends the page sections to the model, named by their path', async () => {
    // typeData holds the tours, the menu and the itinerary — most of what a
    // page publishes — and none of it used to reach the moderator.
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent(
      {
        name: 'Rita Andrade',
        typeData: {
          tours: [
            {
              name: 'Ribeira a pé',
              description: 'Do Infante à Sé pelas escadas.',
              imageUrl: 'https://cdn.example.com/ribeira.jpg',
            },
          ],
          itinerary: [
            {
              name: 'Cais',
              photos: [{ url: 'https://cdn.example.com/stop.jpg' }],
            },
          ],
        },
      },
      'guia-turistico',
    );

    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).toContain('tours[0].description');
    expect(prompt).toContain('Do Infante à Sé pelas escadas.');
    expect(prompt).toContain('itinerary[0].photos[0].url');
    expect(prompt).toContain('https://cdn.example.com/ribeira.jpg');
  });

  it('sends restaurant menu dishes the same way', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent(
      {
        typeData: {
          menu: [{ name: 'Bacalhau à Brás', description: 'Com azeitona.' }],
        },
      },
      'restaurante',
    );

    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).toContain('menu[0].name');
    expect(prompt).toContain('Bacalhau à Brás');
  });

  it('omits the typeData sections when there is nothing to send', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      result: {},
    });

    await service.moderateContent({ description: 'A bakery' }, 'restaurante');

    // The rules always name the sections; what must be absent is the key in
    // the content payload itself.
    const prompt = aiRouter.generateJson.mock.calls[0][1] as string;
    expect(prompt).not.toContain('"typeDataText"');
    expect(prompt).not.toContain('"typeDataLinks"');
  });

  it('never approves on its own when part of the content went unread', async () => {
    // Something was too long to analyse, so a human has to look. Approving
    // here would sign off on text nobody read.
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'low',
        flags: [],
        summary: 'Tudo certo.',
        recommendation: 'approve',
      },
      result: {},
    });

    const result = await service.moderateContent(
      {
        typeData: {
          itinerary: [
            { description: 'x'.repeat(MODERATION_FIELD_MAX_CHARS + 10) },
          ],
        },
      },
      'guia-turistico',
    );

    expect(result.result.riskLevel).toBe('medium');
    expect(result.result.recommendation).toBe('review');
    expect(result.result.summary).toContain('não foi analisada');
  });

  it('leaves a worse verdict alone when the content was truncated', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'high',
        flags: [],
        summary: 'Violação clara.',
        recommendation: 'reject',
      },
      result: {},
    });

    const result = await service.moderateContent(
      {
        typeData: {
          itinerary: [
            { description: 'x'.repeat(MODERATION_FIELD_MAX_CHARS + 10) },
          ],
        },
      },
      'guia-turistico',
    );

    expect(result.result.riskLevel).toBe('high');
    expect(result.result.recommendation).toBe('reject');
  });
});

describe('collectPhotos', () => {
  it('puts the logo and the cover first, then the rest', () => {
    const photos = collectPhotos(
      {
        logoUrl: 'https://r2.example.com/business/logo.jpg',
        coverPhotoUrl: 'https://r2.example.com/business/cover.png',
      },
      { 'menu[0].imageUrl': 'https://r2.example.com/dishes/a.webp' },
    );

    expect(photos.map((p) => p.field)).toEqual([
      'logoUrl',
      'coverPhotoUrl',
      'menu[0].imageUrl',
    ]);
  });

  /**
   * The field is what a reviewer searches the screen for. "Image 2" is not
   * something anybody can find.
   */
  it('keeps the path so a reviewer can locate the picture', () => {
    const photos = collectPhotos(
      {},
      { 'tours[2].photos[1].url': 'https://r2.example.com/business/x.jpg' },
    );

    expect(photos[0]).toEqual({
      field: 'tours[2].photos[1].url',
      url: 'https://r2.example.com/business/x.jpg',
    });
  });

  it('ignores links that are not images', () => {
    const photos = collectPhotos(
      { website: 'https://example.com' },
      { 'tours[0].bookingUrl': 'https://example.com/book' },
    );

    expect(photos).toEqual([]);
  });

  it('sends the same picture once, however many fields hold it', () => {
    const url = 'https://r2.example.com/business/same.jpg';
    const photos = collectPhotos(
      { logoUrl: url, coverPhotoUrl: url },
      { 'menu[0].imageUrl': url },
    );

    expect(photos).toHaveLength(1);
  });

  /**
   * A restaurant really does upload a photo per dish. The collector hands
   * over all of them; the service is what batches.
   */
  it('does not drop the tail of a long menu', () => {
    const links = Object.fromEntries(
      Array.from({ length: 40 }, (_, i) => [
        `menu[${i}].imageUrl`,
        `https://r2.example.com/dishes/${i}.jpg`,
      ]),
    );

    expect(collectPhotos({}, links)).toHaveLength(40);
  });
});

describe('BusinessPageModerationService — the photos themselves', () => {
  let aiRouter: { generateJson: jest.Mock; analyseImages: jest.Mock };
  let service: BusinessPageModerationService;

  const CLEAN_TEXT = {
    riskLevel: 'low' as const,
    flags: [],
    summary: 'Texto ok.',
    recommendation: 'approve' as const,
  };

  function contentWith(count: number) {
    return {
      typeData: {
        menu: Array.from({ length: count }, (_, i) => ({
          imageUrl: `https://r2.example.com/dishes/${i}.jpg`,
        })),
      },
    };
  }

  beforeEach(() => {
    aiRouter = { generateJson: jest.fn(), analyseImages: jest.fn() };
    aiRouter.generateJson.mockResolvedValue({ data: CLEAN_TEXT, result: {} });
    service = new BusinessPageModerationService(
      aiRouter as unknown as AiRouterService,
    );
  });

  it('does not call the vision model for a page with no photos', async () => {
    await service.moderateContent({ description: 'A bakery' }, 'RESTAURANT');

    expect(aiRouter.analyseImages).not.toHaveBeenCalled();
  });

  /**
   * The whole point of the feature. Until this existed the text was moderated
   * and the pictures never were: `business_moderation` is handed photo URLs,
   * but an R2 key is `business/{uuid}.jpg` and says nothing about the image.
   */
  it('sends the photos to the vision model', async () => {
    aiRouter.analyseImages.mockResolvedValue({
      data: { riskLevel: 'low', findings: [], summary: 'Fotos ok.' },
      result: {},
    });

    await service.moderateContent(
      { logoUrl: 'https://r2.example.com/business/logo.jpg' },
      'RESTAURANT',
      'page-1',
    );

    expect(aiRouter.analyseImages).toHaveBeenCalledWith(
      'image_moderation',
      expect.any(String),
      ['https://r2.example.com/business/logo.jpg'],
      expect.anything(),
      { entityType: 'business_page', entityId: 'page-1' },
    );
  });

  it('lets a photo condemn a page whose text was clean', async () => {
    aiRouter.analyseImages.mockResolvedValue({
      data: {
        riskLevel: 'high',
        findings: [{ index: 0, category: 'pornography', reason: 'ato sexual' }],
        summary: 'Foto imprópria.',
      },
      result: {},
    });

    const { result } = await service.moderateContent(
      { logoUrl: 'https://r2.example.com/business/logo.jpg' },
      'RESTAURANT',
    );

    expect(result.riskLevel).toBe('high');
    expect(result.recommendation).toBe('reject');
    expect(result.flags).toContainEqual(
      expect.objectContaining({ category: 'pornography', field: 'logoUrl' }),
    );
  });

  /** A picture cannot argue a flagged description back down. */
  it('never lowers a verdict the text already earned', async () => {
    aiRouter.generateJson.mockResolvedValue({
      data: {
        riskLevel: 'high',
        flags: [],
        summary: 'Texto proibido.',
        recommendation: 'reject',
      },
      result: {},
    });
    aiRouter.analyseImages.mockResolvedValue({
      data: { riskLevel: 'low', findings: [], summary: 'Fotos ok.' },
      result: {},
    });

    const { result } = await service.moderateContent(
      { logoUrl: 'https://r2.example.com/business/logo.jpg' },
      'RESTAURANT',
    );

    expect(result.riskLevel).toBe('high');
  });

  it('will not call a page clean when nobody could look at the photos', async () => {
    aiRouter.analyseImages.mockRejectedValue(new Error('provider down'));

    const { result } = await service.moderateContent(
      { logoUrl: 'https://r2.example.com/business/logo.jpg' },
      'RESTAURANT',
    );

    expect(result.riskLevel).toBe('medium');
    expect(result.recommendation).toBe('review');
    expect(result.summary).toContain('não pôde ser analisada');
  });

  /**
   * A restaurant uploads a photo per dish, so a long menu means more calls and
   * a slower submit — never a silently unchecked tail.
   */
  it('splits a long menu into batches instead of dropping the tail', async () => {
    aiRouter.analyseImages.mockResolvedValue({
      data: { riskLevel: 'low', findings: [], summary: 'ok' },
      result: {},
    });

    await service.moderateContent(contentWith(20), 'RESTAURANT');

    expect(aiRouter.analyseImages).toHaveBeenCalledTimes(3);
    const sent = aiRouter.analyseImages.mock.calls.flatMap(
      (call) => call[2] as string[],
    );
    expect(sent).toHaveLength(20);
    expect(new Set(sent).size).toBe(20);
  });

  it('says so when a page has more photos than it will read', async () => {
    aiRouter.analyseImages.mockResolvedValue({
      data: { riskLevel: 'low', findings: [], summary: 'ok' },
      result: {},
    });

    const { result } = await service.moderateContent(
      contentWith(100),
      'RESTAURANT',
    );

    expect(aiRouter.analyseImages).toHaveBeenCalledTimes(8);
    expect(result.summary).toContain('Apenas as primeiras 64 fotos');
    expect(result.riskLevel).toBe('medium');
    expect(result.recommendation).toBe('review');
  });

  /** A flag pinned to the wrong photo sends a reviewer hunting for nothing. */
  it('drops a finding whose index is outside the batch', async () => {
    aiRouter.analyseImages.mockResolvedValue({
      data: {
        riskLevel: 'high',
        findings: [{ index: 7, category: 'nudity', reason: 'inventado' }],
        summary: 'Confuso.',
      },
      result: {},
    });

    const { result } = await service.moderateContent(
      { logoUrl: 'https://r2.example.com/business/logo.jpg' },
      'RESTAURANT',
    );

    expect(result.flags).toHaveLength(0);
    // The summary still carries it, and the risk level still stands.
    expect(result.riskLevel).toBe('high');
  });
});

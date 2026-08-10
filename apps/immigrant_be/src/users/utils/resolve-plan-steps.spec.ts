import {
  intersectWithTemplate,
  parseStoredSteps,
  resolvePlanSteps,
  type StoredSteps,
} from './resolve-plan-steps';

const step = (
  key: string,
  overrides: Partial<{ name: string; required: boolean }> = {},
) => ({
  key,
  name: overrides.name ?? `Step ${key}`,
  notes: `Notes for ${key}`,
  checked: false,
  priority: '1',
  required: overrides.required ?? true,
});

const template: StoredSteps = {
  core_documents: [step('valid-passport'), step('application-form')],
  submission_fees: [step('pay-the-fee', { required: false })],
};

describe('resolvePlanSteps', () => {
  it('marks exactly the steps whose key is in the plan', () => {
    const { steps } = resolvePlanSteps(template, ['application-form']);

    expect(steps.core_documents.map((s) => [s.key, s.completed])).toEqual([
      ['valid-passport', false],
      ['application-form', true],
    ]);
  });

  it('counts progress over required steps only', () => {
    // The optional fee is completed, the two required ones are not. The bar the
    // user sees has always counted only required steps; the backend used to
    // count everything and report 33% for this exact state.
    const { progress } = resolvePlanSteps(template, ['pay-the-fee']);

    expect(progress).toBe(0);
  });

  it('reaches 1 when every required step is done, optional ones aside', () => {
    const { progress } = resolvePlanSteps(template, [
      'valid-passport',
      'application-form',
    ]);

    expect(progress).toBe(1);
  });

  it('falls back to counting everything when nothing is required', () => {
    const optionalOnly: StoredSteps = {
      extras: [step('a', { required: false }), step('b', { required: false })],
    };

    expect(resolvePlanSteps(optionalOnly, ['a']).progress).toBe(0.5);
  });

  it('reports 0 for an empty template instead of dividing by zero', () => {
    expect(resolvePlanSteps({}, []).progress).toBe(0);
  });

  it('collects every key in the template', () => {
    expect(resolvePlanSteps(template, []).allKeys).toEqual([
      'valid-passport',
      'application-form',
      'pay-the-fee',
    ]);
  });

  it('ignores a completed key the template does not declare', () => {
    const { progress, steps } = resolvePlanSteps(template, [
      'valid-passport',
      'step-from-a-visa-type-the-user-switched-away-from',
    ]);

    expect(progress).toBe(0.5);
    expect(Object.values(steps).flat()).toHaveLength(3);
  });

  it('keeps the category order of the template', () => {
    expect(Object.keys(resolvePlanSteps(template, []).steps)).toEqual([
      'core_documents',
      'submission_fees',
    ]);
  });
});

describe('intersectWithTemplate', () => {
  it('drops keys the template does not know', () => {
    expect(intersectWithTemplate(['a', 'ghost'], ['a', 'b'])).toEqual(['a']);
  });

  it('de-duplicates a repeated key', () => {
    expect(intersectWithTemplate(['a', 'a'], ['a'])).toEqual(['a']);
  });

  it('returns nothing when the template is empty', () => {
    expect(intersectWithTemplate(['a'], [])).toEqual([]);
  });
});

describe('parseStoredSteps', () => {
  it('reads a well-formed blob', () => {
    expect(parseStoredSteps(template).core_documents).toHaveLength(2);
  });

  it('drops items with no key — they could be ticked but never persisted', () => {
    const blob = {
      core_documents: [step('ok'), { name: 'Legacy step, no key' }],
    };

    expect(parseStoredSteps(blob).core_documents).toHaveLength(1);
  });

  it('drops a category that is not an array', () => {
    expect(parseStoredSteps({ core_documents: 'nope' })).toEqual({});
  });

  it.each([null, undefined, 'string', 42, []])(
    'returns an empty template for %p',
    (value) => {
      expect(parseStoredSteps(value)).toEqual({});
    },
  );
});

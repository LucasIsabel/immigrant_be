import { placeTextsAiSchema } from './place-texts.schema';

const textos = (over: Record<string, unknown> = {}) => ({
  description:
    'Torre manuelina do século XVI na margem do Tejo, erguida para guardar a entrada do porto de Lisboa.',
  tip: 'Chegue antes das 10h para evitar a fila da escada em caracol.',
  ...over,
});

const resposta = (over: Record<string, unknown> = {}) => ({
  pt: textos(),
  en: textos(),
  es: textos(),
  ...over,
});

describe('placeTextsAiSchema', () => {
  it('aceita os três idiomas completos', () => {
    expect(placeTextsAiSchema.safeParse(resposta()).success).toBe(true);
  });

  it('aceita dica nula', () => {
    // Um bairro raramente sustenta uma dica prática, e inventar uma é
    // exatamente o que este pipeline existe para não fazer.
    const r = placeTextsAiSchema.safeParse(
      resposta({ pt: textos({ tip: null }) }),
    );
    expect(r.success).toBe(true);
  });

  it('recusa quando falta um idioma', () => {
    const semEspanhol: Record<string, unknown> = resposta();
    delete semEspanhol.es;
    expect(placeTextsAiSchema.safeParse(semEspanhol).success).toBe(false);
  });

  it('recusa descrição curta demais', () => {
    // "Um museu." passaria sem o mínimo, e o card ficaria vazio.
    const r = placeTextsAiSchema.safeParse(
      resposta({ en: textos({ description: 'A museum.' }) }),
    );
    expect(r.success).toBe(false);
  });

  it('recusa descrição longa demais', () => {
    // O card corta em três linhas; texto de artigo não caberia.
    const r = placeTextsAiSchema.safeParse(
      resposta({ en: textos({ description: 'a'.repeat(401) }) }),
    );
    expect(r.success).toBe(false);
  });

  it('recusa dica longa demais', () => {
    const r = placeTextsAiSchema.safeParse(
      resposta({ pt: textos({ tip: 'a'.repeat(201) }) }),
    );
    expect(r.success).toBe(false);
  });

  it('recusa dica ausente — nula é explícito, faltando é resposta incompleta', () => {
    const semDica: Record<string, unknown> = textos();
    delete semDica.tip;
    const r = placeTextsAiSchema.safeParse(resposta({ pt: semDica }));
    expect(r.success).toBe(false);
  });
});

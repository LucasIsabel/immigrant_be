import { contentHasVisualMarkers } from './blog-visual-markers';

describe('contentHasVisualMarkers', () => {
  it('detecta marcador de visual sugerido', () => {
    const content =
      '# Título\n\n> 📊 **[Visual sugerido]:** Gráfico de vistos\n\nFim.';
    expect(contentHasVisualMarkers(content)).toBe(true);
  });

  it('retorna false sem marcadores', () => {
    expect(contentHasVisualMarkers('# Título\n\nSem visuais.')).toBe(false);
  });
});

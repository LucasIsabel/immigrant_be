import { DocumentBuilder } from '@nestjs/swagger';

/**
 * A configuração do documento OpenAPI, num lugar só.
 *
 * Existe porque o `scripts/dump-openapi.ts` precisa gerar exatamente o mesmo
 * documento que o servidor publica. Uma cópia do builder no script tornaria o
 * diff antes/depois não confiável: a diferença poderia vir da config, não da
 * mudança em análise.
 */
export function buildSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Aloravia API')
    .setDescription(
      'The Aloravia API documentation. Protected endpoints require authentication via the session cookie **better-auth.session_token**. Use the "Authorize" button to send the cookie when testing.',
    )
    .setVersion('1.0')
    .addCookieAuth('better-auth.session_token')
    .build();
}

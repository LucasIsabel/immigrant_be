import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * O plugin do `@nestjs/swagger` é aplicado pelo compilador do Nest CLI, não em
 * tempo de execução — então não há como afirmar sobre o documento gerado a partir
 * de um teste (o ts-jest não roda o plugin, e o schema sairia diferente do que o
 * build produz). O que dá para garantir é que ele continua declarado.
 *
 * Vale o teste porque a ausência dele é invisível: nada falha, nada avisa. O
 * contrato apenas volta a tipar 47 campos anuláveis como `object`, e o cliente
 * gerado no front volta a ser inutilizável para eles — foi assim que o defeito
 * passou despercebido até a #96.
 */
describe('nest-cli.json', () => {
  const config = JSON.parse(
    readFileSync(join(process.cwd(), 'nest-cli.json'), 'utf8'),
  ) as {
    compilerOptions?: {
      plugins?: Array<string | { name?: string; options?: unknown }>;
      webpack?: boolean;
    };
  };

  const plugins = config.compilerOptions?.plugins ?? [];
  const nomes = plugins.map((p) => (typeof p === 'string' ? p : p.name));

  it('declara o plugin do @nestjs/swagger', () => {
    // Sem ele o Nest não resolve tipos de união por reflexão: o `design:type` de
    // `string | null` é `Object`, e todo `@ApiProperty` anulável sem `type:`
    // explícito sai como `"type": "object"` no OpenAPI.
    expect(nomes).toContain('@nestjs/swagger');
  });

  it('mantém o webpack ligado, que é o compilador que aplica o plugin', () => {
    expect(config.compilerOptions?.webpack).toBe(true);
  });
});

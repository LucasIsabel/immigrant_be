import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { findEnvFile, loadEnvFile } from './env-file';

/**
 * O carregamento mora fora de `env.ts` justamente para caber num teste: aquele
 * módulo valida `process.env` no import e derrubaria o processo antes da
 * primeira assertiva.
 */
describe('env-file', () => {
  let dir: string;
  let file: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'aloravia-env-'));
    file = join(dir, '.env');
    writeFileSync(file, 'DATABASE_URL=postgres://local\nLOG_LEVEL=debug\n');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  describe('loadEnvFile', () => {
    it('preenche o que o ambiente não tem', () => {
      const target: NodeJS.ProcessEnv = {};

      const applied = loadEnvFile(file, target);

      expect(target.DATABASE_URL).toBe('postgres://local');
      expect(target.LOG_LEVEL).toBe('debug');
      expect(applied.sort()).toEqual(['DATABASE_URL', 'LOG_LEVEL']);
    });

    it('não sobrescreve o que já veio do ambiente', () => {
      // É a trava que torna seguro carregar o arquivo em qualquer ambiente: em
      // produção quem manda é o que o Coolify injeta no container.
      const target: NodeJS.ProcessEnv = { DATABASE_URL: 'postgres://producao' };

      const applied = loadEnvFile(file, target);

      expect(target.DATABASE_URL).toBe('postgres://producao');
      expect(applied).toEqual(['LOG_LEVEL']);
    });

    it('respeita variável declarada e vazia', () => {
      // `FOO=` no deploy é uma decisão de quem configurou, não um buraco para o
      // arquivo preencher.
      const target: NodeJS.ProcessEnv = { LOG_LEVEL: '' };

      loadEnvFile(file, target);

      expect(target.LOG_LEVEL).toBe('');
    });

    it('não faz nada sem arquivo', () => {
      const target: NodeJS.ProcessEnv = {};

      expect(loadEnvFile(null, target)).toEqual([]);
      expect(Object.keys(target)).toHaveLength(0);
    });
  });

  describe('findEnvFile', () => {
    it('acha o arquivo subindo a partir de um subdiretório', () => {
      const nested = join(dir, 'apps', 'immigrant_be');
      mkdirSync(nested, { recursive: true });

      expect(findEnvFile(nested)).toBe(file);
    });

    it('devolve null quando não existe até a raiz', () => {
      const isolated = mkdtempSync(join(tmpdir(), 'aloravia-sem-env-'));

      try {
        // Só vale se a raiz do sistema também não tiver um `.env`, o que é o
        // caso em qualquer máquina sã — e é o cenário que o retorno null cobre.
        expect(findEnvFile(isolated)).toBeNull();
      } finally {
        rmSync(isolated, { recursive: true, force: true });
      }
    });
  });
});

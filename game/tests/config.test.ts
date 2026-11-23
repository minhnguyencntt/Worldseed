import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Config files are read straight from disk; no tooling is started.
const gitignorePath = fileURLToPath(new URL('../../.gitignore', import.meta.url));
const vitestConfigPath = fileURLToPath(new URL('../vitest.config.ts', import.meta.url));
const tsconfigPath = fileURLToPath(new URL('../tsconfig.json', import.meta.url));

describe('repository gitignore', () => {
  it('gitignore targets game/node_modules', () => {
    // Given the root .gitignore file
    const lines = readFileSync(gitignorePath, 'utf8').split('\n').map((line) => line.trim());
    // When the ignore rules are inspected
    // Then game/node_modules/ is ignored
    expect(lines).toContain('game/node_modules/');
    // And no rule refers to the old backend/game location
    expect(lines.some((line) => line.includes('backend/game'))).toBe(false);
  });
});

describe('module config path globs', () => {
  it('vitest and tsconfig use relative globs', () => {
    // Given the vitest config and tsconfig in game/
    const vitest = readFileSync(vitestConfigPath, 'utf8');
    const ts = readFileSync(tsconfigPath, 'utf8');
    // When the test include glob and tsconfig include are read
    // Then vitest uses the relative tests glob
    expect(vitest).toContain('tests/**/*.test.ts');
    // And tsconfig includes the relative src and tests directories
    expect(JSON.parse(ts).include).toEqual(['src', 'tests']);
  });
});

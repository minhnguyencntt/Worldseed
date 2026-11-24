import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Source check: useGame must reach state only through the store, never through runtime/storage.
const source = readFileSync(path.resolve(__dirname, '../src/runtime/useGame.ts'), 'utf8');

describe('useGame single owner', () => {
  it('useGame does not touch storage or cast state', () => {
    expect(source).not.toMatch(/runtime\/storage|\.\/storage/);
    expect(source).not.toMatch(/as GameState/);
    expect(source).not.toMatch(/writeSaved|readSaved/);
  });
});

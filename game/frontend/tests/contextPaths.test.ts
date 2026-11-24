import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contextModulePaths } from '../src/lib/contextDoc';
import { missingPaths } from '../src/lib/docsCheck';

describe('context.md module paths', () => {
  // Repo root is three levels above this test file: game/frontend/tests -> repo root.
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
  const text = readFileSync(join(root, 'context.md'), 'utf8');

  it('lists the four required module paths in the real context.md', () => {
    const paths = contextModulePaths(text);
    expect(paths).toEqual(
      expect.arrayContaining(['game/src/', 'game/frontend/src/', 'game/docs/GDD.md', 'backend/']),
    );
    expect(paths).toContain('game/docs/GDD.md');
    expect(existsSync(join(root, 'game/docs/GDD.md'))).toBe(true);
  });

  it('has every context.md module path existing on disk', () => {
    const paths = contextModulePaths(text);
    expect(missingPaths(paths, (p) => existsSync(join(root, p)))).toEqual([]);
  });
});

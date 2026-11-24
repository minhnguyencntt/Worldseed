import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('type-check config', () => {
  const tsconfig = JSON.parse(readFileSync(join(process.cwd(), 'tsconfig.json'), 'utf8'));
  const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));

  it('tsconfig types include node', () => {
    expect(tsconfig.compilerOptions.types).toEqual(
      expect.arrayContaining(['node', 'vite/client', 'vitest/globals']),
    );
  });

  it('package declares @types/node', () => {
    expect(pkg.devDependencies['@types/node']).toBeDefined();
  });
});

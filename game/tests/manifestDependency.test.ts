import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The manifest is read straight from disk; no tooling is started.
const packageJsonPath = fileURLToPath(new URL('../package.json', import.meta.url));

describe('zod dependency declaration', () => {
  it('declares zod with a semver range in game/package.json', () => {
    // Given the game package manifest read from disk
    const manifest = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
      dependencies?: Record<string, string>;
    };
    // When the zod entry in dependencies is inspected
    const zodRange = manifest.dependencies?.zod;
    // Then zod is declared with a major.minor.patch version range
    expect(zodRange).toBeDefined();
    expect(zodRange).toMatch(/^\^?\d+\.\d+\.\d+/);
  });

  it('makes zod importable and exposes z.object as a function', async () => {
    // Given the zod package resolved from game/node_modules
    // When the module is imported
    const mod = await import('zod');
    // Then z.object is available as a function
    expect(typeof mod.z.object).toBe('function');
  });
});

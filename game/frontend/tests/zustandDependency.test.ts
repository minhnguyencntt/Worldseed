import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { describe, expect, it } from 'vitest';

const readJson = (relativePath: string): any =>
  JSON.parse(readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8'));

describe('zustand dependency declaration', () => {
  const pkg = readJson('../package.json');
  const lock = readJson('../package-lock.json');

  it('declares a semver-pinned zustand version in package.json', () => {
    // Given the frontend package.json on disk,
    // when the zustand dependency is read,
    // then it is declared with an exact major.minor.patch range (optionally ^ or ~).
    expect(pkg.dependencies.zustand).toMatch(/^[\^~]?\d+\.\d+\.\d+/);
  });

  it('records the same zustand range in package-lock.json root entry', () => {
    // Given the package-lock.json root package entry,
    // when its zustand dependency is read,
    // then it equals the range declared in package.json.
    expect(lock.packages[''].dependencies.zustand).toBe(pkg.dependencies.zustand);
  });

  it('resolves zustand to a concrete version in package-lock.json', () => {
    // Given the package-lock.json node_modules/zustand entry,
    // when its version is read,
    // then it is a non-empty string.
    expect(lock.packages['node_modules/zustand'].version).toBeTruthy();
  });
});

describe('zustand dependency resolution', () => {
  it('resolves the zustand import', async () => {
    // Given the zustand package installed in node_modules,
    // when the module is dynamically imported,
    // then its create export is a function.
    const mod = await import('zustand');
    expect(typeof mod.create).toBe('function');
  });
});

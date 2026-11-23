import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The tsconfig is read from disk; no app, server or browser is started.
const tsconfigPath = fileURLToPath(new URL('../tsconfig.json', import.meta.url));
const gameRoot = fileURLToPath(new URL('..', import.meta.url));

describe('tsconfig @game alias', () => {
  it('maps @game/* to ./src/*', () => {
    // Given the game tsconfig.json on disk
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
    // When the compilerOptions.paths entry for @game/* is read
    const mapping = tsconfig.compilerOptions?.paths?.['@game/*'];
    // Then it maps to ./src/*
    expect(mapping).toEqual(['./src/*']);
  });

  it('resolves the mapped ./src target to an existing directory', () => {
    // Given the game tsconfig.json mapping for @game/*
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
    const target = tsconfig.compilerOptions.paths['@game/*'][0] as string;
    // When the mapped target is resolved relative to the game folder
    const resolved = resolve(gameRoot, target.replace(/\*$/, ''));
    // Then the src directory exists on disk
    expect(existsSync(resolved)).toBe(true);
  });
});

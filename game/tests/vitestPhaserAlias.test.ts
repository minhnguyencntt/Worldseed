import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import config from '../vitest.config';

// The config and scene source are read from disk; no app, server or browser is started.
const bootScenePath = fileURLToPath(new URL('../frontend/src/phaser/BootScene.ts', import.meta.url));

describe('vitest phaser alias', () => {
  it('resolves the phaser alias to the frontend node_modules package', () => {
    // Given the default export of the vitest config
    // When the phaser alias is read
    const alias = config.resolve!.alias as Record<string, string>;
    // Then it points at frontend/node_modules/phaser
    expect(alias.phaser).toMatch(/frontend\/node_modules\/phaser$/);
  });

  it('keeps the @game alias pointing at the src folder', () => {
    // Given the default export of the vitest config
    // When the @game alias is read
    const alias = config.resolve!.alias as Record<string, string>;
    // Then it still points at the game src folder
    expect(alias['@game']).toMatch(/\/src$/);
  });

  it('imports Phaser by its package name in BootScene source', () => {
    // Given the BootScene source file on disk
    const source = readFileSync(bootScenePath, 'utf8');
    // When the import statements are inspected
    // Then BootScene imports Phaser from 'phaser', which the alias resolves
    expect(source).toContain("import Phaser from 'phaser'");
  });
});

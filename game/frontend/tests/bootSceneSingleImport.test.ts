import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Reads the BootScene source text so the import list can be checked without loading Phaser.
// fileURLToPath(new URL(..., import.meta.url)) is not usable here: the jsdom environment gives an http:// import.meta.url.
const src = readFileSync(resolve(__dirname, '../src/phaser/BootScene.ts'), 'utf8');

describe('BootScene imports', () => {
  it('imports SceneObject exactly once', () => {
    const matches = src.match(/^import type \{ SceneObject \}/gm) ?? [];
    expect(matches).toHaveLength(1);
  });

  it('still imports createPhaserRenderContext', () => {
    expect(src).toContain("import { createPhaserRenderContext } from './renderContext';");
  });
});

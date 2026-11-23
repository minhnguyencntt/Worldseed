import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Reads the BootScene source directly: the guard is about the declared field, not runtime behaviour.
const src = readFileSync(resolve(__dirname, '../src/phaser/BootScene.ts'), 'utf8');

describe('BootScene fields', () => {
  it('declares sceneObjects exactly once', () => {
    const matches = src.match(/^\s*private sceneObjects:/gm) ?? [];
    expect(matches).toHaveLength(1);
  });
});

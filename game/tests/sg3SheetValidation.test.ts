import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseManifest } from '../src/assets/manifest';

// Builds an in-memory version 1 manifest holding a single spritesheet asset.
const sheetManifest = (asset: Record<string, unknown>) => ({
  version: 1,
  assets: [
    {
      id: 'sheet',
      path: 'characters/sheet.png',
      type: 'spritesheet',
      ...asset,
    },
  ],
});

const paths = (result: unknown): string[] => {
  const r = result as { ok: boolean; errors?: { path: string }[] };
  return (r.errors ?? []).map((e) => e.path);
};

describe('spritesheet validation', () => {
  it('rejects a sheet whose frameCount overflows the sheet width', () => {
    // Given a 64x48 sheet with 32px frames and 3 frames (96px wide)
    const manifest = sheetManifest({
      dimensions: { width: 64, height: 48 },
      frames: { frameWidth: 32, frameHeight: 48, frameCount: 3 },
    });
    // When the manifest is parsed
    const result = parseManifest(manifest);
    // Then validation fails at the frameCount field
    expect(result.ok).toBe(false);
    expect(paths(result)).toContain('assets.0.frames.frameCount');
  });

  it('rejects an animation that references a frame outside frameCount', () => {
    // Given a 64x48 sheet with 2 frames and an idle animation using frame 5
    const manifest = sheetManifest({
      dimensions: { width: 64, height: 48 },
      frames: { frameWidth: 32, frameHeight: 48, frameCount: 2 },
      animations: {
        idle: { frames: [0, 5], frameRate: 8 },
      },
    });
    // When the manifest is parsed
    const result = parseManifest(manifest);
    // Then validation fails at the idle animation frames field
    expect(result.ok).toBe(false);
    expect(paths(result)).toContain('assets.0.animations.idle.frames');
  });

  it('rejects a frameHeight larger than the sheet height', () => {
    // Given a 64x48 sheet with 60px tall frames
    const manifest = sheetManifest({
      dimensions: { width: 64, height: 48 },
      frames: { frameWidth: 32, frameHeight: 60, frameCount: 2 },
    });
    // When the manifest is parsed
    const result = parseManifest(manifest);
    // Then validation fails at a path containing frameHeight
    expect(result.ok).toBe(false);
    expect(paths(result).some((p) => p.includes('frameHeight'))).toBe(true);
  });

  it('accepts the committed the-boys-room manifest', () => {
    // Given the committed the-boys-room manifest JSON on disk
    const url = new URL('../public/assets/worlds/the-boys-room/manifest.json', import.meta.url);
    const raw = JSON.parse(readFileSync(fileURLToPath(url), 'utf8'));
    // When it is validated with parseManifest
    const result = parseManifest(raw);
    // Then validation succeeds
    expect(result.ok).toBe(true);
  });
});

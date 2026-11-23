import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks against the real manifest and static SVG files.
// Nothing is written, no app is started, and there is no network access.
const publicRoot = fileURLToPath(new URL('../public/assets', import.meta.url));

interface ManifestAsset {
  id: string;
  path: string;
  type: string;
  dimensions?: { width: number; height: number };
  frames?: { frameWidth: number; frameHeight: number; frameCount: number };
  animations?: Record<string, { frames: number[]; frameRate: number; repeat: number }>;
}

const manifest = JSON.parse(
  readFileSync(join(publicRoot, 'worlds/the-boys-room/manifest.json'), 'utf8'),
) as { assets: ManifestAsset[] };

const findAsset = (id: string): ManifestAsset => {
  const asset = manifest.assets.find((entry) => entry.id === id);
  if (!asset) {
    throw new Error(`manifest is missing asset id ${id}`);
  }
  return asset;
};

const readSvgSize = (asset: ManifestAsset) => {
  const content = readFileSync(join(publicRoot, asset.path), 'utf8');
  const width = Number(/<svg[^>]*\swidth="(\d+)"/.exec(content)?.[1]);
  const height = Number(/<svg[^>]*\sheight="(\d+)"/.exec(content)?.[1]);
  return { width, height };
};

const SHEETS: Array<{ id: string; animation: string }> = [
  { id: 'character:boy', animation: 'idle' },
  { id: 'character:boy-walk', animation: 'walk' },
  { id: 'character:boy-interact', animation: 'interact' },
];

describe('boy spritesheets', () => {
  for (const { id, animation } of SHEETS) {
    describe(id, () => {
      const asset = findAsset(id);

      it('manifest entry is a spritesheet with a file on disk', () => {
        expect(asset.type).toBe('spritesheet');
        expect(existsSync(join(publicRoot, asset.path))).toBe(true);
      });

      it('svg width equals frameWidth * frameCount and svg height equals frameHeight', () => {
        expect(asset.frames).toBeDefined();
        const frames = asset.frames!;
        const size = readSvgSize(asset);

        expect(size.width).toBe(frames.frameWidth * frames.frameCount);
        expect(size.height).toBe(frames.frameHeight);
      });

      it(`declares a "${animation}" animation whose frame indices are all below frameCount`, () => {
        const frameCount = asset.frames!.frameCount;
        const anim = asset.animations?.[animation];

        expect(anim).toBeDefined();
        expect(anim!.frames.length).toBeGreaterThan(0);
        for (const index of anim!.frames) {
          expect(index).toBeLessThan(frameCount);
          expect(index).toBeGreaterThanOrEqual(0);
        }
      });
    });
  }

  it('manifest contains effect:glow with a file on disk', () => {
    const glow = findAsset('effect:glow');

    expect(glow.type).toBe('image');
    expect(existsSync(join(publicRoot, glow.path))).toBe(true);
  });
});

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
}

const manifest = JSON.parse(
  readFileSync(join(publicRoot, 'worlds/the-boys-room/manifest.json'), 'utf8'),
) as { assets: ManifestAsset[] };

const NEW_IDS = [
  'background:wall',
  'background:floor',
  'background:window-view',
  'background:lighting',
  'furniture:chair',
  'furniture:wardrobe',
];

describe('background layers and furniture', () => {
  for (const id of NEW_IDS) {
    describe(id, () => {
      const entry = manifest.assets.find((asset) => asset.id === id);

      it('has a manifest entry', () => {
        expect(entry).toBeDefined();
      });

      it('points at an existing svg file', () => {
        expect(entry).toBeDefined();
        expect(existsSync(join(publicRoot, entry!.path))).toBe(true);
      });

      it('svg width and height match manifest dimensions', () => {
        expect(entry).toBeDefined();
        const content = readFileSync(join(publicRoot, entry!.path), 'utf8');
        const width = /<svg[^>]*\swidth="(\d+)"/.exec(content)?.[1];
        const height = /<svg[^>]*\sheight="(\d+)"/.exec(content)?.[1];

        expect(entry!.dimensions).toBeDefined();
        expect({ width: Number(width), height: Number(height) }).toEqual(
          entry!.dimensions,
        );
      });

      it('uses at least two distinct fill colours', () => {
        expect(entry).toBeDefined();
        const content = readFileSync(join(publicRoot, entry!.path), 'utf8');
        const fills = new Set(
          [...content.matchAll(/fill="(#[0-9A-Fa-f]{3,8})"/g)].map((m) => m[1]),
        );

        expect(fills.size).toBeGreaterThanOrEqual(2);
      });
    });
  }
});

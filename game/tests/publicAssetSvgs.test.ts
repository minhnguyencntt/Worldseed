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

const svgAssets = manifest.assets.filter(
  (asset) => asset.path.endsWith('.svg') && asset.path.startsWith('worlds/'),
);

describe('the-boys-room SVG assets', () => {
  it('every svg path exists under public/assets', () => {
    const missing = svgAssets
      .filter((asset) => !existsSync(join(publicRoot, asset.path)))
      .map((asset) => asset.path);

    expect(missing).toEqual([]);
  });

  it('svg width and height match manifest dimensions', () => {
    const mismatches: string[] = [];

    for (const asset of svgAssets) {
      const content = readFileSync(join(publicRoot, asset.path), 'utf8');
      const width = /<svg[^>]*\swidth="(\d+)"/.exec(content)?.[1];
      const height = /<svg[^>]*\sheight="(\d+)"/.exec(content)?.[1];
      const expected = asset.dimensions;

      if (
        !expected ||
        Number(width) !== expected.width ||
        Number(height) !== expected.height
      ) {
        mismatches.push(
          `${asset.path}: svg ${width}x${height} vs manifest ${expected?.width}x${expected?.height}`,
        );
      }
    }

    expect(mismatches).toEqual([]);
  });

  it('svg is crispEdges', () => {
    const notCrisp = svgAssets
      .filter((asset) => {
        const content = readFileSync(join(publicRoot, asset.path), 'utf8');
        return !(
          content.includes('<svg') &&
          content.includes('shape-rendering="crispEdges"')
        );
      })
      .map((asset) => asset.path);

    expect(notCrisp).toEqual([]);
  });
});

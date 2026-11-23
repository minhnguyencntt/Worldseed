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

const TARGET_IDS = [
  'objects/books',
  'objects/secret-door-closed',
  'objects/secret-door-open',
] as const;

const targets = TARGET_IDS.map((id) => {
  const asset = manifest.assets.find((entry) => entry.id === id);
  if (!asset) {
    throw new Error(`manifest is missing asset id ${id}`);
  }
  return asset;
});

const readSvg = (asset: ManifestAsset) =>
  readFileSync(join(publicRoot, asset.path), 'utf8');

describe('books and secret door states', () => {
  it('manifest contains objects/books, objects/secret-door-closed and objects/secret-door-open', () => {
    const ids = manifest.assets.map((asset) => asset.id);

    for (const id of TARGET_IDS) {
      expect(ids).toContain(id);
    }
  });

  it('every books and secret door file exists under public/assets', () => {
    const missing = targets
      .filter((asset) => !existsSync(join(publicRoot, asset.path)))
      .map((asset) => asset.path);

    expect(missing).toEqual([]);
  });

  it('svg width and height match the manifest dimensions for books and both door states', () => {
    const mismatches: string[] = [];

    for (const asset of targets) {
      const content = readSvg(asset);
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

  it('secret door closed and open entries have equal dimensions', () => {
    const closed = targets.find((asset) => asset.id === 'objects/secret-door-closed');
    const open = targets.find((asset) => asset.id === 'objects/secret-door-open');

    expect(closed?.dimensions).toBeDefined();
    expect(open?.dimensions).toEqual(closed?.dimensions);
  });

  it('secret door closed and open SVG files have different contents', () => {
    const closed = targets.find((asset) => asset.id === 'objects/secret-door-closed');
    const open = targets.find((asset) => asset.id === 'objects/secret-door-open');

    expect(closed).toBeDefined();
    expect(open).toBeDefined();
    expect(readSvg(closed!)).not.toEqual(readSvg(open!));
  });
});

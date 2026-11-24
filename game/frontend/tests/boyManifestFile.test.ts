import { describe, it, expect } from 'vitest';
// The committed app manifest lives under game/public (the generator's assetsRoot), not game/frontend/public.
import manifest from '../../public/assets/worlds/the-boys-room/manifest.json';
import { generateAssets } from '../src/lib/generateAssets';
import { BOY_SOURCES } from '../src/art/boy';

// Manifest spec (committed boy entries): every generated boy entry is committed verbatim,
// and the pre-existing boy sheet entry (character:boy) is still present and still an SVG.
describe('new: committed manifest boy entries', () => {
  const { entries } = generateAssets(BOY_SOURCES);

  it('generates at least one boy entry', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries.map((entry) => [entry.id, entry] as const))(
    'commits the generated entry for %s unchanged',
    (id, entry) => {
      const committed = manifest.assets.find((asset) => asset.id === id);
      expect(committed).toEqual(entry);
    },
  );

  it.each(entries.map((entry) => [entry.id, entry.path] as const))(
    'commits a PNG path for generated entry %s',
    (id, path) => {
      const committed = manifest.assets.find((asset) => asset.id === id);
      expect(committed?.path, `path of ${id}`).toMatch(/\.png$/);
      expect(committed?.path).toBe(path);
    },
  );

  it('has no character:boy entry left over from the removed SVG sheet', () => {
    // Given the committed manifest after the placeholder SVGs were removed
    // When the entry with id character:boy is looked up
    const boy = manifest.assets.find((asset) => asset.id === 'character:boy');
    // Then no such entry exists
    expect(boy, 'character:boy entry').toBeUndefined();
  });
});

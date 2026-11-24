import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseManifest } from '../src/assets/manifest';
import { findMissingAssetPaths } from '../src/assets/loaders/manifestLoader';

// node:fs is mocked so the committed manifest text is served from the mock.
// The real committed file is read once, inside the factory, via vi.importActual.
vi.mock('node:fs', async () => {
  const actual = await vi.importActual<typeof import('node:fs')>('node:fs');
  const committedManifestText = actual.readFileSync(
    new URL('../public/assets/worlds/the-boys-room/manifest.json', import.meta.url),
    'utf8',
  );
  return {
    ...actual,
    readFileSync: vi.fn(() => committedManifestText),
    existsSync: vi.fn(() => true),
  };
});

const MANIFEST_PATH = '/virtual/world/manifest.json';

function loadCommittedManifest() {
  const raw = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const parsed = parseManifest(raw);
  if (!parsed.ok) {
    throw new Error(`committed manifest failed to parse: ${JSON.stringify(parsed.errors)}`);
  }
  return parsed.data;
}

describe('committed manifest paths against a mocked file list', () => {
  it('committed manifest paths are all in the file list', () => {
    // Given the committed manifest text served through the mocked readFileSync
    const manifest = loadCommittedManifest();
    // And a file list built from every asset path in that manifest
    const files = manifest.assets.map((a) => a.path);
    // When the missing paths are computed against that file list
    const missing = findMissingAssetPaths(manifest, files);
    // Then no manifest path is reported as missing
    expect(missing).toEqual([]);
  });

  it('reports a path missing from the file list', () => {
    // Given the committed manifest and a file list without the bed furniture asset
    const manifest = loadCommittedManifest();
    const files = manifest.assets
      .map((a) => a.path)
      .filter((p) => p !== 'worlds/the-boys-room/furniture/bed.svg');
    // When the missing paths are computed
    const missing = findMissingAssetPaths(manifest, files);
    // Then exactly the bed asset path is reported
    expect(missing).toEqual(['worlds/the-boys-room/furniture/bed.svg']);
  });

  it('checks a non-empty manifest so the missing-path check is not vacuous', () => {
    // Given the committed manifest served through the mocked readFileSync
    const manifest = loadCommittedManifest();
    // Then it contains at least one asset, so the empty-result assertion is meaningful
    expect(manifest.assets.length).toBeGreaterThan(0);
  });
});

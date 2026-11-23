import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { loadManifestWithFallback, checkAssetRefs } from '../src/assets/loaders/manifestLoader';

// node:fs is fully mocked so no real disk or asset tree is touched.
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

const ASSETS_ROOT = '/fake/assets';
const MANIFEST_PATH = '/fake/manifest.json';

const twoAssetManifest = {
  version: 1,
  assets: [
    { id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } },
    { id: 'b', path: 'b.svg', type: 'image', dimensions: { width: 10, height: 10 } },
  ],
};

describe('dangling asset references after a fallback load', () => {
  beforeEach(() => {
    vi.mocked(readFileSync).mockReset();
    vi.mocked(existsSync).mockReset();
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(twoAssetManifest));
    // Only b's file is absent; a's file exists.
    vi.mocked(existsSync).mockImplementation((p) => !String(p).endsWith('b.svg'));
  });

  it('reports one issue per dangling ref, naming both the missing asset b and the unknown ghost', () => {
    // Given a manifest with assets 'a' and 'b', where b's file is missing on disk
    // When the manifest is loaded with fallback and refs ['a', 'b', 'ghost'] are checked
    const result = loadManifestWithFallback(MANIFEST_PATH, ASSETS_ROOT);
    const issues = checkAssetRefs(result.manifest, ['a', 'b', 'ghost']);
    // Then exactly two issues are reported and their messages name 'b' and 'ghost'
    expect(issues).toHaveLength(2);
    expect(issues.some((i) => i.message.includes('b'))).toBe(true);
    expect(issues.some((i) => i.message.includes('ghost'))).toBe(true);
  });

  it('reports no issues when every ref resolves to a loaded asset', () => {
    // Given a manifest with assets 'a' and 'b', where b's file is missing on disk
    // When the manifest is loaded with fallback and only ref ['a'] is checked
    const result = loadManifestWithFallback(MANIFEST_PATH, ASSETS_ROOT);
    const issues = checkAssetRefs(result.manifest, ['a']);
    // Then no issues are returned
    expect(issues).toEqual([]);
  });
});

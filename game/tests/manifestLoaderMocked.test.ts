import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { loadManifestFile, loadManifestWithFallback, FALLBACK_ASSET_ID } from '../src/assets/loaders/manifestLoader';

// node:fs is fully mocked so no real file is read or written by these tests.
vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

const MANIFEST_PATH = '/virtual/world/manifest.json';
const ASSETS_ROOT = '/virtual/world/assets';

const twoImageManifest = {
  version: 1,
  assets: [
    { id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } },
    { id: 'b', path: 'b.svg', type: 'image', dimensions: { width: 10, height: 10 } },
  ],
};

const oneImageManifest = {
  version: 1,
  assets: [{ id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
};

describe('loadManifestFile with mocked fs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('loads successfully when the manifest is valid and the asset file exists', () => {
    // Given a valid manifest JSON string and an asset file that exists
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(oneImageManifest));
    vi.mocked(existsSync).mockReturnValue(true);
    // When the manifest is loaded
    const result = loadManifestFile(MANIFEST_PATH, ASSETS_ROOT);
    // Then the load succeeds and returns the parsed asset
    expect(result).toMatchObject({ ok: true, data: { assets: [{ id: 'a', path: 'a.svg' }] } });
    expect(existsSync).toHaveBeenCalledWith(`${ASSETS_ROOT}/a.svg`);
  });

  it('fails with a path naming the dimension when a dimension is zero', () => {
    // Given a manifest JSON string whose asset width is zero
    const invalid = {
      version: 1,
      assets: [{ id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 0, height: 10 } }],
    };
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(invalid));
    vi.mocked(existsSync).mockReturnValue(true);
    // When the manifest is loaded
    const result = loadManifestFile(MANIFEST_PATH, ASSETS_ROOT);
    // Then the load fails and the error path names the width dimension
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toEqual([
      expect.objectContaining({ path: 'assets.0.dimensions.width' }),
    ]);
  });

  it('reports the manifest as unreadable when readFileSync throws', () => {
    // Given the manifest read throws an I/O error
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error('EACCES');
    });
    // When the manifest is loaded
    // Then it returns a failure on the manifest path without throwing
    expect(() => loadManifestFile(MANIFEST_PATH, ASSETS_ROOT)).not.toThrow();
    expect(loadManifestFile(MANIFEST_PATH, ASSETS_ROOT)).toMatchObject({
      ok: false,
      errors: [{ path: 'manifest' }],
    });
  });

  it('reports a missing asset file when existsSync returns false', () => {
    // Given a valid manifest whose asset file does not exist
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(oneImageManifest));
    vi.mocked(existsSync).mockReturnValue(false);
    // When the manifest is loaded
    const result = loadManifestFile(MANIFEST_PATH, ASSETS_ROOT);
    // Then the load fails with a missing asset file error on the asset path
    expect(result).toMatchObject({
      ok: false,
      errors: [{ path: 'assets.0.path', message: 'missing asset file: a.svg' }],
    });
  });
});

describe('loadManifestWithFallback with mocked fs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('keeps the present asset and reports the absent one as missing', () => {
    // Given a two-asset manifest where only a.svg exists
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(twoImageManifest));
    vi.mocked(existsSync).mockImplementation((p) => String(p).endsWith('/a.svg'));
    // When the manifest is loaded with fallback
    const result = loadManifestWithFallback(MANIFEST_PATH, ASSETS_ROOT);
    // Then one missing entry is reported and only one asset remains
    expect(result.missing).toHaveLength(1);
    expect(result.missing).toEqual([{ id: 'b', path: 'b.svg' }]);
    expect(result.manifest.assets).toHaveLength(1);
    expect(result.manifest.assets[0].id).toBe('a');
    expect(result.errors).toEqual([]);
  });

  it('falls back to an empty manifest when the manifest is schema-invalid', () => {
    // Given a manifest JSON string with an unsupported version
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ version: 2, assets: [] }));
    vi.mocked(existsSync).mockReturnValue(true);
    // When the manifest is loaded with fallback
    const result = loadManifestWithFallback(MANIFEST_PATH, ASSETS_ROOT);
    // Then the manifest is empty, errors are reported, and the fallback id is set
    expect(result.manifest.assets).toEqual([]);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.fallbackAssetId).toBe(FALLBACK_ASSET_ID);
  });

  it('falls back to an empty manifest with one error when readFileSync throws', () => {
    // Given the manifest read throws an I/O error
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error('EACCES');
    });
    // When the manifest is loaded with fallback
    let result: ReturnType<typeof loadManifestWithFallback> | undefined;
    // Then it returns an empty manifest and exactly one error, without throwing
    expect(() => {
      result = loadManifestWithFallback(MANIFEST_PATH, ASSETS_ROOT);
    }).not.toThrow();
    expect(result?.manifest.assets).toEqual([]);
    expect(result?.errors).toHaveLength(1);
    expect(existsSync).not.toHaveBeenCalled();
  });
});

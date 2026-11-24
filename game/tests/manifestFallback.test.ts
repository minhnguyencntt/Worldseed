import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadManifestWithFallback, FALLBACK_ASSET_ID } from '../src/assets/loaders/manifestLoader';

// Each case gets its own temporary assets root so no real asset tree is needed.
let dir: string;
let manifestPath: string;

const twoImageManifest = {
  version: 1,
  assets: [
    { id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } },
    { id: 'b', path: 'b.svg', type: 'image', dimensions: { width: 10, height: 10 } },
  ],
};

describe('loadManifestWithFallback', () => {
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'manifest-fallback-'));
    manifestPath = join(dir, 'manifest.json');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('keeps assets whose files exist and reports the missing ones without throwing', () => {
    // Given a manifest with assets a and b, where only a.svg exists under the assets root
    writeFileSync(manifestPath, JSON.stringify(twoImageManifest));
    writeFileSync(join(dir, 'a.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    // When the manifest is loaded with fallback
    const result = loadManifestWithFallback(manifestPath, dir);
    // Then only asset a is kept, asset b is reported missing, and the fallback id is set
    expect(result.manifest.assets.map((a) => a.id)).toEqual(['a']);
    expect(result.missing).toEqual([{ id: 'b', path: 'b.svg' }]);
    expect(result.fallbackAssetId).toBe(FALLBACK_ASSET_ID);
  });

  it('falls back to an empty manifest with one error when the manifest file does not exist', () => {
    // Given a manifest path that was never written
    // When the manifest is loaded with fallback
    // Then it returns no assets and exactly one error, without throwing
    let result: ReturnType<typeof loadManifestWithFallback> | undefined;
    expect(() => {
      result = loadManifestWithFallback(manifestPath, dir);
    }).not.toThrow();
    expect(result?.manifest.assets).toEqual([]);
    expect(result?.errors).toHaveLength(1);
  });

  it('falls back to an empty manifest with one error when the manifest is not valid JSON', () => {
    // Given a manifest file whose contents are not valid JSON
    writeFileSync(manifestPath, '{ not json');
    // When the manifest is loaded with fallback
    // Then it returns no assets and exactly one error, without throwing
    let result: ReturnType<typeof loadManifestWithFallback> | undefined;
    expect(() => {
      result = loadManifestWithFallback(manifestPath, dir);
    }).not.toThrow();
    expect(result?.manifest.assets).toEqual([]);
    expect(result?.errors).toHaveLength(1);
  });

  it('reports no missing assets when every referenced file exists', () => {
    // Given a manifest with assets a and b, and both files present under the assets root
    writeFileSync(manifestPath, JSON.stringify(twoImageManifest));
    writeFileSync(join(dir, 'a.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    writeFileSync(join(dir, 'b.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    // When the manifest is loaded with fallback
    const result = loadManifestWithFallback(manifestPath, dir);
    // Then both assets are kept and the missing list is empty
    expect(result.manifest.assets.map((a) => a.id)).toEqual(['a', 'b']);
    expect(result.missing).toEqual([]);
  });
});

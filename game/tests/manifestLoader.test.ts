import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadManifestFile } from '../src/assets/loaders/manifestLoader';

// Each case gets its own temporary assets root so no real asset tree is needed.
let dir: string;
let manifestPath: string;

const manifestWithOneImage = {
  version: 1,
  assets: [
    {
      id: 'a',
      path: 'a.svg',
      type: 'image',
      dimensions: { width: 10, height: 10 },
    },
  ],
};

describe('loadManifestFile', () => {
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'manifest-loader-'));
    manifestPath = join(dir, 'manifest.json');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('reports the asset path as an error when the referenced file is missing', () => {
    // Given a valid manifest whose image asset file does not exist under the assets root
    writeFileSync(manifestPath, JSON.stringify(manifestWithOneImage));
    // When the manifest is loaded
    // Then the load fails and points at the missing asset's path field
    expect(loadManifestFile(manifestPath, dir)).toMatchObject({
      ok: false,
      errors: [{ path: 'assets.0.path' }],
    });
  });

  it('loads successfully once the referenced asset file exists', () => {
    // Given a valid manifest and the referenced a.svg file present under the assets root
    writeFileSync(manifestPath, JSON.stringify(manifestWithOneImage));
    writeFileSync(join(dir, 'a.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    // When the manifest is loaded
    // Then the load succeeds and returns the parsed assets
    expect(loadManifestFile(manifestPath, dir)).toMatchObject({
      ok: true,
      data: { assets: [{ id: 'a', path: 'a.svg' }] },
    });
  });

  it('reports the manifest itself as unreadable when the manifest file does not exist', () => {
    // Given a manifest path that points at a file which was never written
    // When the manifest is loaded
    // Then it returns a failure on the manifest path without throwing
    expect(() => loadManifestFile(manifestPath, dir)).not.toThrow();
    expect(loadManifestFile(manifestPath, dir)).toMatchObject({
      ok: false,
      errors: [{ path: 'manifest' }],
    });
  });

  it('reports the manifest itself as unreadable when the manifest file is not valid JSON', () => {
    // Given a manifest file whose contents are not JSON
    writeFileSync(manifestPath, 'not json');
    // When the manifest is loaded
    // Then it returns a failure on the manifest path without throwing
    expect(() => loadManifestFile(manifestPath, dir)).not.toThrow();
    expect(loadManifestFile(manifestPath, dir)).toMatchObject({
      ok: false,
      errors: [{ path: 'manifest' }],
    });
  });
});

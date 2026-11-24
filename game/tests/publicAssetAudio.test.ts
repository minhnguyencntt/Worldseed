import { describe, it, expect } from 'vitest';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only checks against the real the-boys-room manifest and the WAV it points at.
// Nothing is written or started. Manifest asset paths are relative to the public
// assets root, which holds the real files under game/frontend/public/assets
// (same root used by assetManifestFile.test.ts).
const manifestPath = fileURLToPath(
  new URL('../public/assets/worlds/the-boys-room/manifest.json', import.meta.url),
);
const publicDir = fileURLToPath(new URL('../frontend/public/assets', import.meta.url));

type RawManifest = {
  assets: Array<{ id: string; path: string; type: string }>;
};

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as RawManifest;
const asset = manifest.assets.find((a) => a.id === 'audio:ambient-room');

describe('the-boys-room audio asset', () => {
  it('file exists and is non-empty', () => {
    // Given the manifest entry for audio:ambient-room
    expect(asset, 'manifest must define audio:ambient-room').toBeDefined();
    // When its path is resolved under the public assets root and stat'ed
    const size = statSync(join(publicDir, asset!.path)).size;
    // Then the file has a non-zero size
    expect(size).toBeGreaterThan(0);
  });

  it('has RIFF WAVE header', () => {
    // Given the manifest entry for audio:ambient-room
    expect(asset, 'manifest must define audio:ambient-room').toBeDefined();
    // When the first 12 bytes of the WAV are read
    const buf = readFileSync(join(publicDir, asset!.path));
    // Then the container is RIFF and the form type is WAVE
    expect(buf.toString('ascii', 0, 4)).toBe('RIFF');
    expect(buf.toString('ascii', 8, 12)).toBe('WAVE');
  });
});

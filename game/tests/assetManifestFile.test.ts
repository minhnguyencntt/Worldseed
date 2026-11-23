import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { parseManifest } from '../src/assets/manifest';

// Read-only checks against the real the-boys-room manifest and scene file.
// Nothing is written or started. Manifest asset paths are relative to the
// public assets root, which holds the real files under game/frontend/public/assets
// (the step's game/public/assets only holds manifest.json).
const manifestPath = fileURLToPath(
  new URL('../public/assets/worlds/the-boys-room/manifest.json', import.meta.url),
);
const publicDir = fileURLToPath(new URL('../frontend/public/assets', import.meta.url));
const scenePath = fileURLToPath(
  new URL('../src/content/worlds/the-boys-room/scenes/bedroom.yaml', import.meta.url),
);

type RawManifest = {
  assets: Array<{
    id: string;
    path: string;
    frames?: { frameCount?: number };
    animations?: Record<string, unknown>;
  }>;
};

describe('the-boys-room manifest.json', () => {
  it('parses through parseManifest without errors', () => {
    // Given the real manifest.json read from disk
    const raw = JSON.parse(readFileSync(manifestPath, 'utf8'));
    // When it is validated with parseManifest
    const result = parseManifest(raw);
    // Then the manifest is accepted
    expect(result.ok).toBe(true);
  });

  it('points every asset path at a file that exists on disk', () => {
    // Given the real manifest.json and the public assets root
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as RawManifest;
    // When each asset path is resolved under the public assets root
    const missing = manifest.assets
      .filter((asset) => !existsSync(join(publicDir, asset.path)))
      .map((asset) => asset.path);
    // Then no asset path is missing
    expect(missing).toEqual([]);
  });

  it('gives every asset ref in bedroom.yaml a matching manifest id', () => {
    // Given the manifest ids and the bedroom.yaml scene objects
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as RawManifest;
    const ids = new Set(manifest.assets.map((asset) => asset.id));
    const scene = parse(readFileSync(scenePath, 'utf8')) as {
      objects?: Array<{ id?: string; asset?: unknown }>;
    };
    // When the object asset refs are collected
    const refs = (scene.objects ?? [])
      .map((object) => object.asset)
      .filter((asset): asset is string => typeof asset === 'string');
    // Then the scene has refs to check, and each one is a manifest id
    expect(refs.length).toBeGreaterThan(0);
    expect(refs.filter((ref) => !ids.has(ref))).toEqual([]);
  });

  it('describes character:boy as a 2-frame spritesheet with an idle animation', () => {
    // Given the character:boy entry in the real manifest
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as RawManifest;
    const boy = manifest.assets.find((asset) => asset.id === 'character:boy');
    // When its frames and animations are inspected
    // Then it has 2 frames and an idle animation
    expect(boy).toBeDefined();
    expect(boy?.frames?.frameCount).toBe(2);
    expect(boy?.animations).toHaveProperty('idle');
  });
});

import { describe, it, expect } from 'vitest';
import { planPreload, resolveTextureKey } from '../src/engine/planPreload';
import type { AssetManifest } from '../src/assets/manifest';
import type { SceneDef } from '../src/state/types';
import { validScene } from './fixtures/valid-world';

// In-memory manifest only: no filesystem, loader or real asset tree.
const manifest: AssetManifest = {
  version: 1,
  assets: [{ id: 'A', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
};

const baseObject = validScene.objects[0];

describe('planPreload', () => {
  it('dedupes: an asset referenced by two objects is planned for load once', () => {
    // Given a scene with two objects that both use asset 'A', which is in the manifest
    const scene: SceneDef = {
      ...validScene,
      objects: [
        { ...baseObject, id: 'one', asset: 'A' },
        { ...baseObject, id: 'two', asset: 'A' },
      ],
    };
    // When planning the preload
    const plan = planPreload(scene, manifest);
    // Then 'A' is loaded exactly once and nothing is unknown
    expect(plan.load).toEqual(['A']);
    expect(plan.unknown).toEqual([]);
  });

  it('reports unknown: assets missing from the manifest are reported, not loaded', () => {
    // Given one object using asset 'Z' and one dust effect using asset 'Y', neither in the manifest
    const scene: SceneDef = {
      ...validScene,
      objects: [{ ...baseObject, id: 'obj', asset: 'Z' }],
      effects: [{ type: 'dust', asset: 'Y', count: 3, area: { x: 0, y: 0, width: 10, height: 10 } }],
    };
    // When planning the preload
    const plan = planPreload(scene, manifest);
    // Then both assets are unknown, in reference order, and none are loaded
    expect(plan.unknown).toEqual(['Z', 'Y']);
    expect(plan.load).toEqual([]);
  });
});

describe('resolveTextureKey', () => {
  it('returns the id itself when the manifest contains it', () => {
    // Given a manifest containing asset 'A'
    // When resolving id 'A' with a fallback
    // Then the id itself is returned
    expect(resolveTextureKey('A', manifest, 'fallback:missing')).toBe('A');
  });

  it('returns the fallback when the id is not in the manifest', () => {
    // Given a manifest that does not contain 'nope'
    // When resolving id 'nope' with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey('nope', manifest, 'fallback:missing')).toBe('fallback:missing');
  });

  it('returns the fallback when the id is undefined', () => {
    // Given no texture id
    // When resolving undefined with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey(undefined, manifest, 'fallback:missing')).toBe('fallback:missing');
  });
});

import { describe, it, expect } from 'vitest';
import { resolveTextureKey } from '../src/engine/planPreload';
import type { AssetManifest } from '../src/assets/manifest';

// In-memory manifest only: no filesystem, loader or real asset tree.
const manifest: AssetManifest = {
  version: 1,
  assets: [{ id: 'A', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
};

describe('resolveTextureKey', () => {
  it('known', () => {
    // Given a manifest containing asset 'A'
    // When resolving id 'A' with a fallback
    // Then the id itself is returned
    expect(resolveTextureKey('A', manifest, 'fallback:missing')).toBe('A');
  });

  it('unknown', () => {
    // Given a manifest that does not contain 'nope'
    // When resolving id 'nope' with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey('nope', manifest, 'fallback:missing')).toBe('fallback:missing');
  });

  it('undefined', () => {
    // Given no texture id
    // When resolving undefined with a fallback
    // Then the fallback id is returned
    expect(resolveTextureKey(undefined, manifest, 'fallback:missing')).toBe('fallback:missing');
  });
});

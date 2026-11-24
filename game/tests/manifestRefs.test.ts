import { describe, it, expect } from 'vitest';
import { checkAssetRefs } from '../src/assets/loaders/manifestLoader';
import type { AssetManifest } from '../src/assets/manifest';

// In-memory manifest with a single asset whose id is 'a'. No disk access.
const manifest: AssetManifest = {
  version: 1,
  assets: [{ id: 'a', path: 'a.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
} as AssetManifest;

describe('checkAssetRefs', () => {
  it('reports one issue naming the unknown ref when a ref has no matching asset id', () => {
    // Given a manifest that only defines asset 'a'
    // When the refs ['a', 'ghost'] are checked
    const issues = checkAssetRefs(manifest, ['a', 'ghost']);
    // Then exactly one issue is returned and its message names 'ghost'
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('ghost');
  });

  it('returns no issues when every ref matches an asset id', () => {
    // Given a manifest that defines asset 'a'
    // When the refs ['a'] are checked
    const issues = checkAssetRefs(manifest, ['a']);
    // Then no issues are returned
    expect(issues).toEqual([]);
  });

  it('returns no issues when there are no refs to check', () => {
    // Given a manifest that defines asset 'a'
    // When an empty ref list is checked
    const issues = checkAssetRefs(manifest, []);
    // Then no issues are returned
    expect(issues).toEqual([]);
  });
});

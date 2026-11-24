import { describe, it, expect } from 'vitest';
import { parseManifest, parseAsset } from '../src/assets/manifest';

const validImage = {
  id: 'bookshelf',
  path: 'objects/bookshelf.png',
  type: 'image',
  dimensions: { width: 32, height: 64 },
};

// Serialise a validator result so error text can be searched regardless of the
// exact shape of the error object (errors array, message, issues, ...).
const errorText = (result: unknown): string => JSON.stringify(result);

describe('parseManifest', () => {
  it('returns ok true with the parsed assets for a valid manifest', () => {
    // Given a version 1 manifest containing one valid image asset
    const manifest = { version: 1, assets: [validImage] };
    // When the manifest is parsed
    const result = parseManifest(manifest) as { ok: boolean; data?: { assets: { id: string }[] } };
    // Then the result is ok and the first asset id is preserved
    expect(result.ok).toBe(true);
    expect(result.data?.assets[0].id).toBe('bookshelf');
  });

  it('returns ok false with the failing field path when a dimension is zero', () => {
    // Given a manifest whose first asset has dimensions width 0
    const manifest = {
      version: 1,
      assets: [{ ...validImage, dimensions: { width: 0, height: 64 } }],
    };
    // When the manifest is parsed
    const result = parseManifest(manifest);
    // Then the result is not ok and the error points at assets.0.dimensions.width
    expect((result as { ok: boolean }).ok).toBe(false);
    expect(errorText(result)).toContain('assets.0.dimensions.width');
  });

  it('returns ok false with a duplicate id error when two assets share an id', () => {
    // Given a manifest with two assets that both use the id 'bed'
    const manifest = {
      version: 1,
      assets: [
        { ...validImage, id: 'bed' },
        { ...validImage, id: 'bed', path: 'objects/bed-2.png' },
      ],
    };
    // When the manifest is parsed
    const result = parseManifest(manifest);
    // Then the result is not ok and reports the duplicate id
    expect((result as { ok: boolean }).ok).toBe(false);
    expect(errorText(result)).toContain('duplicate asset id: bed');
  });

  it.each([
    ['null', null],
    ['a string', 'x'],
    ['a number', 42],
  ])('returns ok false without throwing when the input is %s', (_label, input) => {
    // Given an input that is not an object manifest
    // When the input is parsed
    // Then parsing does not throw and reports ok false
    let result: unknown;
    expect(() => {
      result = parseManifest(input);
    }).not.toThrow();
    expect((result as { ok: boolean }).ok).toBe(false);
  });
});

describe('parseAsset', () => {
  it('returns ok true for a valid image asset', () => {
    // Given a valid image asset entry
    // When the single asset is parsed
    const result = parseAsset(validImage) as { ok: boolean };
    // Then the result is ok
    expect(result.ok).toBe(true);
  });
});

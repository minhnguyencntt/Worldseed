import { describe, it, expect } from 'vitest';
import { assetSchema } from '../src/assets/manifest/schema';

describe('assetSchema', () => {
  it('accepts a valid image asset with dimensions, origin and interaction bounds', () => {
    // Given an image asset entry with valid dimensions, origin and bounds
    const asset = {
      id: 'bookshelf',
      path: 'objects/bookshelf.png',
      type: 'image',
      dimensions: { width: 32, height: 64 },
      origin: { x: 0.5, y: 1 },
      interactionBounds: { x: 0, y: 0, width: 32, height: 64 },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation succeeds
    expect(result.success).toBe(true);
  });

  it('accepts a spritesheet with frames, dimensions and named animations', () => {
    // Given a spritesheet with frame layout, 64x16 dimensions and an idle animation
    const asset = {
      id: 'hero',
      path: 'characters/hero.png',
      type: 'spritesheet',
      dimensions: { width: 64, height: 16 },
      frames: { frameWidth: 16, frameHeight: 16, frameCount: 4 },
      animations: { idle: { frames: [0, 1], frameRate: 4 } },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation succeeds
    expect(result.success).toBe(true);
  });

  it('rejects a spritesheet that lacks frames', () => {
    // Given a spritesheet with dimensions but no frame layout
    const asset = {
      id: 'hero',
      path: 'characters/hero.png',
      type: 'spritesheet',
      dimensions: { width: 64, height: 16 },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation fails because spritesheets require frames
    expect(result.success).toBe(false);
  });

  it('rejects dimensions with a width of zero', () => {
    // Given an image asset whose dimensions width is 0
    const asset = {
      id: 'bookshelf',
      path: 'objects/bookshelf.png',
      type: 'image',
      dimensions: { width: 0, height: 64 },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation fails because width must be positive
    expect(result.success).toBe(false);
  });

  it('rejects an asset whose type is not a supported kind', () => {
    // Given an asset with the unsupported type 'video'
    const asset = {
      id: 'intro',
      path: 'media/intro.mp4',
      type: 'video',
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation fails because the type is not in the enum
    expect(result.success).toBe(false);
  });

  it('rejects an origin whose x value is greater than 1', () => {
    // Given an image asset with origin.x set to 1.5
    const asset = {
      id: 'bookshelf',
      path: 'objects/bookshelf.png',
      type: 'image',
      origin: { x: 1.5, y: 1 },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation fails because origin is normalised to the 0..1 range
    expect(result.success).toBe(false);
  });

  it('rejects interaction bounds with a negative width', () => {
    // Given an image asset with interactionBounds width -1
    const asset = {
      id: 'bookshelf',
      path: 'objects/bookshelf.png',
      type: 'image',
      interactionBounds: { x: 0, y: 0, width: -1, height: 64 },
    };
    // When the asset is validated against assetSchema
    const result = assetSchema.safeParse(asset);
    // Then validation fails because bounds width must be positive
    expect(result.success).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import { scene, sceneSpec, manifest } from '../src/runtime/content';
import { planPreload } from '@game/engine/planPreload';
import { resolveCharacterAnimation, type CharacterAnimationName } from '@game/engine/characterAnimation';
import { generateAssets } from '../src/lib/generateAssets';
import { ART_SOURCES } from '../src/art/sources';

const ROOM_WIDTH = 480;
const ROOM_HEIGHT = 270;

describe('scene content uses only PNGs', () => {
  it('manifest and scene spec contain no svg references', () => {
    // Given the bundled bedroom scene spec and the the-boys-room manifest
    // When both are serialised
    const manifestText = JSON.stringify(manifest);
    const sceneText = JSON.stringify(sceneSpec);
    // Then neither contains a .svg reference
    expect(manifestText).not.toContain('.svg');
    expect(sceneText).not.toContain('.svg');
  });

  it('every non-audio manifest path ends with .png', () => {
    // Given the the-boys-room manifest
    // When each non-audio asset path is checked
    const imagePaths = manifest.assets.filter((a) => a.type !== 'audio').map((a) => a.path);
    // Then every path is a PNG
    expect(imagePaths.length).toBeGreaterThan(0);
    for (const path of imagePaths) {
      expect(path.endsWith('.png'), path).toBe(true);
    }
  });

  it('every scene reference resolves to a manifest id', () => {
    // Given the bedroom scene and the manifest
    // When the preload plan is computed
    const plan = planPreload(scene, manifest);
    // Then no scene asset reference is unknown to the manifest
    expect(plan.unknown).toEqual([]);
  });

  it('every object stays inside the 480x270 room at its manifest size', () => {
    // Given each object in the bedroom scene and its manifest dimensions
    for (const obj of scene.objects) {
      if (!obj.asset) continue;
      const entry = manifest.assets.find((a) => a.id === obj.asset);
      expect(entry, `manifest entry for ${obj.asset}`).toBeDefined();
      const { width, height } = entry!.dimensions!;
      // When its right and bottom edges are computed from its position
      const right = obj.position.x + width;
      const bottom = obj.position.y + height;
      // Then both edges stay within the room
      expect(right, `${obj.id} right edge`).toBeLessThanOrEqual(ROOM_WIDTH);
      expect(bottom, `${obj.id} bottom edge`).toBeLessThanOrEqual(ROOM_HEIGHT);
    }
  });

  it.each<CharacterAnimationName>(['idle', 'walk', 'interact'])(
    'the boy %s animation resolves to the boy sheet with the expected frame count',
    (name) => {
      // Given the boy character in the bedroom spec and the manifest
      const character = sceneSpec.characters[0];
      // When the animation is resolved
      const ref = resolveCharacterAnimation(character, name, manifest);
      // Then it points at the boy sprite sheet
      expect(ref.asset).toBe('character:boy-sheet');
      // And the manifest defines it with the expected frame count
      const sheet = manifest.assets.find((a) => a.id === 'character:boy-sheet');
      const expected: Record<CharacterAnimationName, number> = { idle: 4, walk: 6, interact: 4 };
      expect(sheet?.animations?.[ref.animation]?.frames.length).toBe(expected[name]);
    },
  );

  it('the dust effect covers the full 480x270 room', () => {
    // Given the bedroom scene effects
    const dust = scene.effects?.find((e) => e.type === 'dust');
    expect(dust).toBeDefined();
    // Then the dust area is the full room
    expect(dust && 'area' in dust ? dust.area.width : undefined).toBe(ROOM_WIDTH);
    expect(dust && 'area' in dust ? dust.area.height : undefined).toBe(ROOM_HEIGHT);
  });

  it('manifest image dimensions match the generated art sources', () => {
    // Given the art sources rendered by the pure generator
    const generated = generateAssets(ART_SOURCES);
    expect(generated.entries.length).toBeGreaterThan(0);
    // When each generated entry is compared with the manifest
    for (const entry of generated.entries) {
      const manifestEntry = manifest.assets.find((a) => a.id === entry.id);
      expect(manifestEntry, `manifest entry for ${entry.id}`).toBeDefined();
      // Then the declared dimensions match
      expect(manifestEntry!.dimensions, entry.id).toEqual(entry.dimensions);
    }
  });
});

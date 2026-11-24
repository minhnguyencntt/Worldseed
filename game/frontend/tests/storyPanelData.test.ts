import { describe, expect, it } from 'vitest';
// The committed app manifest lives under game/public (same source as src/runtime/content.ts).
import manifest from '../../public/assets/worlds/the-boys-room/manifest.json';
import { buildInventorySlots, portraitPath } from '../src/lib/storyPanelData';

describe('portraitPath', () => {
  it('returns the public URL of the boy portrait listed in the committed manifest', () => {
    // Given the committed manifest entry character:boy-portrait,
    const entry = manifest.assets.find((asset) => asset.id === 'character:boy-portrait');
    expect(entry, 'manifest entry character:boy-portrait').toBeDefined();
    // When portraitPath is called for the boy speaker,
    // then it returns the manifest path served under /assets/.
    expect(portraitPath('boy')).toBe(`/assets/${entry!.path}`);
    expect(portraitPath('boy')).toBe('/assets/worlds/the-boys-room/characters/boy-portrait.png');
  });

  it('returns undefined for a speaker with no manifest portrait', () => {
    // Given a speaker 'ghost' that has no portrait entry,
    // when portraitPath is called for it,
    // then it returns undefined.
    expect(portraitPath('ghost')).toBeUndefined();
  });
});

describe('buildInventorySlots', () => {
  it('returns six empty slots with null ids when the inventory is empty', () => {
    // Given an empty inventory,
    // when buildInventorySlots is called,
    // then it returns six slots and every slot id is null.
    const slots = buildInventorySlots([]);
    expect(slots).toHaveLength(6);
    for (const slot of slots) {
      expect(slot.id).toBeNull();
    }
  });

  it('shows the humanised name and manifest icon for a known item, leaving the other slots empty', () => {
    // Given an inventory holding the item 'old-key' from the committed manifest,
    // when buildInventorySlots is called,
    // then slot 0 is named 'Old Key' with the manifest icon and the other five slots are empty.
    const entry = manifest.assets.find((asset) => asset.id === 'item/old-key');
    expect(entry, 'manifest entry item/old-key').toBeDefined();
    const slots = buildInventorySlots(['old-key']);
    expect(slots[0].id).toBe('old-key');
    expect(slots[0].name).toBe('Old Key');
    expect(slots[0].icon).toBe(`/assets/${entry!.path}`);
    expect(slots[0].icon).toMatch(/items\/old-key\.png$/);
    expect(slots.slice(1).filter((slot) => slot.id === null)).toHaveLength(5);
  });

  it('gives an unknown item a humanised name and no icon', () => {
    // Given an inventory holding 'mystery-thing', which has no manifest entry,
    // when buildInventorySlots is called,
    // then slot 0 is named 'Mystery Thing' and has no icon.
    const slots = buildInventorySlots(['mystery-thing']);
    expect(slots[0].name).toBe('Mystery Thing');
    expect(slots[0].icon).toBeUndefined();
  });
});

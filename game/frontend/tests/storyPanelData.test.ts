import { describe, expect, it } from 'vitest';
// The committed app manifest lives under game/public (same source as src/runtime/content.ts).
import manifest from '../../public/assets/worlds/the-boys-room/manifest.json';
import { portraitPath } from '../src/lib/storyPanelData';

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

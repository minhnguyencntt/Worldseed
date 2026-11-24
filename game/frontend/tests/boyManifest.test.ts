import { describe, expect, it } from 'vitest';
import { parseManifest } from '@game/assets/manifest';
import { BOY_SOURCES } from '../src/art/boy';
import { ART_SOURCES, type ArtSource } from '../src/art/sources';
import { generateAssets } from '../src/lib/generateAssets';

describe('generateAssets generator animations and origin', () => {
  it('carries animations and origin from a source into its generated entry', () => {
    // Given a two-frame inline source with an idle animation and an origin,
    // when generateAssets renders it,
    // then the entry has the same animations and origin.
    const source: ArtSource = {
      id: 'test:two-frame',
      path: 'test/two-frame.png',
      frames: [
        [
          [0, 1],
          [1, 0],
        ],
        [
          [0, 0],
          [1, 1],
        ],
      ],
      animations: { idle: { frames: [0, 1], frameRate: 2, repeat: -1 } },
      origin: { x: 0.5, y: 1 },
    };

    const { entries } = generateAssets([source]);

    expect(entries).toHaveLength(1);
    expect(entries[0].animations).toEqual({ idle: { frames: [0, 1], frameRate: 2, repeat: -1 } });
    expect(entries[0].origin).toEqual({ x: 0.5, y: 1 });
  });

  it('omits animations and origin from the entry when the source does not define them', () => {
    // Given a single-frame inline source with no animations and no origin,
    // when generateAssets renders it,
    // then the entry has neither an 'animations' nor an 'origin' property.
    const source: ArtSource = {
      id: 'test:plain',
      path: 'test/plain.png',
      frames: [
        [
          [0, 1],
          [1, 0],
        ],
      ],
    };

    const { entries } = generateAssets([source]);

    expect(entries).toHaveLength(1);
    expect(entries[0]).not.toHaveProperty('animations');
    expect(entries[0]).not.toHaveProperty('origin');
  });

  it('registers character:boy-sheet and character:boy-portrait exactly once each in ART_SOURCES', () => {
    // Given the shipped ART_SOURCES list,
    // when the ids are counted,
    // then character:boy-sheet and character:boy-portrait each appear exactly once.
    const ids = ART_SOURCES.map((source) => source.id);

    expect(ids.filter((id) => id === 'character:boy-sheet')).toHaveLength(1);
    expect(ids.filter((id) => id === 'character:boy-portrait')).toHaveLength(1);
  });

  it('generates the boy sheet with 448x48 size, 14 frames and the idle, walk and interact animations', () => {
    // Given the boy sources rendered by generateAssets,
    // when the character:boy-sheet entry is inspected,
    // then it is 448x48 with 14 frames, idle [0..3], walk [4..9], interact [10..13] and a positive frameRate.
    const { entries } = generateAssets(BOY_SOURCES);
    const sheet = entries.find((entry) => entry.id === 'character:boy-sheet');

    expect(sheet).toBeDefined();
    expect(sheet?.dimensions).toEqual({ width: 448, height: 48 });
    expect(sheet?.frames?.frameCount).toBe(14);
    expect(sheet?.animations?.idle?.frames).toEqual([0, 1, 2, 3]);
    expect(sheet?.animations?.walk?.frames).toEqual([4, 5, 6, 7, 8, 9]);
    expect(sheet?.animations?.interact?.frames).toEqual([10, 11, 12, 13]);
    expect(sheet?.animations?.idle?.frameRate).toBeGreaterThan(0);
    expect(sheet?.animations?.walk?.frameRate).toBeGreaterThan(0);
    expect(sheet?.animations?.interact?.frameRate).toBeGreaterThan(0);
  });

  it('generates the boy portrait with 32x32 dimensions', () => {
    // Given the boy sources rendered by generateAssets,
    // when the character:boy-portrait entry is inspected,
    // then its dimensions are 32x32.
    const { entries } = generateAssets(BOY_SOURCES);
    const portrait = entries.find((entry) => entry.id === 'character:boy-portrait');

    expect(portrait).toBeDefined();
    expect(portrait?.dimensions).toEqual({ width: 32, height: 32 });
  });

  it('produces boy entries that parse as a valid manifest', () => {
    // Given the boy entries produced by generateAssets,
    // when they are wrapped in a version 1 manifest and parsed,
    // then parseManifest reports ok.
    const { entries } = generateAssets(BOY_SOURCES);

    expect(parseManifest({ version: 1, assets: entries }).ok).toBe(true);
  });
});

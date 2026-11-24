// Art sources: palette-indexed pixel grids that generateAssets turns into PNG files.
// Each frame is a row-major grid of PALETTE indices (see src/lib/palette.ts).

import type { ArtSource, Grid } from './types';
import { BOY_SOURCES } from './boy';
import { ROOM_SOURCES } from './roomSources';
import { SCENE_EXTRA_SOURCES } from './sceneExtras';
import { ITEM_SOURCES } from './itemIcons';
import { UI_FRAME_SOURCES } from './uiFrames';

export type { ArtSource };

const PALETTE_INDEX_BY_CHAR: Record<string, number> = {
  '.': 0, // background
  O: 36, // outline
  F: 29, // fill
};

// Converts character rows into a palette-index grid, failing loudly on bad input.
function rowsToGrid(rows: readonly string[]): Grid {
  return rows.map((row, y) => {
    if (row.length !== rows[0].length) throw new Error(`art row ${y} has width ${row.length}`);
    return Array.from(row, (ch) => {
      const idx = PALETTE_INDEX_BY_CHAR[ch];
      if (idx === undefined) throw new Error(`unknown art char '${ch}' at row ${y}`);
      return idx;
    });
  });
}

const HAND_CURSOR_ROWS = [
  '................',
  '.....OO.........',
  '....OFFO........',
  '....OFFO........',
  '....OFFOOO......',
  '....OFFOFFOO....',
  '....OFFOFFOFOO..',
  '.OOOOFFOFFOFFOFO',
  'OFFOOFFFFFFFFFFO',
  'OFFFOFFFFFFFFFFO',
  '.OFFFFFFFFFFFFO.',
  '..OFFFFFFFFFFFO.',
  '...OFFFFFFFFFO..',
  '...OFFFFFFFFFO..',
  '....OFFFFFFFO...',
  '.....OOOOOOOO...',
];

export const ART_SOURCES: ArtSource[] = [
  {
    id: 'ui/cursor-hand',
    path: 'ui/cursors/hand.png',
    frames: [rowsToGrid(HAND_CURSOR_ROWS)],
  },
  ...UI_FRAME_SOURCES,
  ...BOY_SOURCES,
  ...ROOM_SOURCES,
  ...SCENE_EXTRA_SOURCES,
  ...ITEM_SOURCES,
];

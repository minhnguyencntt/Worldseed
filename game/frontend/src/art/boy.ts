// Boy character art for worlds/the-boys-room: portrait grid built with the helpers in ./draw.
// Each grid is row-major palette indices (see src/lib/palette.ts).

import type { ArtSource } from './sources';
import { createGrid, fillRect, outlineRect, rampIndex, shadeRect, type Grid } from './draw';

const PORTRAIT_SIZE = 32;

export function boyPortraitGrid(): Grid {
  const grid = createGrid(PORTRAIT_SIZE, PORTRAIT_SIZE, 0);

  // Face: a parchment block in the middle of the portrait.
  shadeRect(grid, 9, 6, 14, 18, 'parchment', 3, 4);

  // Hair: wood across the top rows, drawn over the top of the face as a fringe.
  shadeRect(grid, 7, 0, 18, 8, 'wood', 1, 2);

  // Eyes: two indigo 2x2 blocks.
  fillRect(grid, 12, 13, 2, 2, rampIndex('indigo', 1));
  fillRect(grid, 18, 13, 2, 2, rampIndex('indigo', 1));

  // Hoodie collar: the bottom eight rows.
  shadeRect(grid, 4, 24, 24, 8, 'hoodie', 3, 2);

  // Outline around the face.
  outlineRect(grid, 9, 6, 14, 18, rampIndex('indigo', 1));

  return grid;
}

export const BOY_PORTRAIT_SOURCE: ArtSource = {
  id: 'character:boy-portrait',
  path: 'worlds/the-boys-room/characters/boy-portrait.png',
  frames: [boyPortraitGrid()],
};

// The boy sheet source (BOY_SHEET_SOURCE) named in the ticket does not exist in src/art,
// so only the portrait is listed here.
export const BOY_SOURCES: ArtSource[] = [BOY_PORTRAIT_SOURCE];

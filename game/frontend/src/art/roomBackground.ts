// Room background art for worlds/the-boys-room: wall, wainscot, floor and window grids.
// Each grid is row-major palette indices (see src/lib/palette.ts) built with the helpers in ./draw.

import type { ArtSource } from './sources';
import { createGrid, dither, fillRect, outlineRect, rampIndex, shadeRect, type Grid } from './draw';
import { ROOM_ART_SIZES } from './roomSizes';

const WALL_STRIPE_WIDTH = 12;
const WALL_CAP_ROWS = 8;

export function wallGrid(): Grid {
  const { width, height } = ROOM_ART_SIZES.wall;
  const grid = createGrid(width, height, rampIndex('plum', 2));
  for (let x = 0; x < width; x++) {
    if (Math.floor(x / WALL_STRIPE_WIDTH) % 2 === 0) {
      fillRect(grid, x, 0, 1, height, rampIndex('plum', 3));
    }
  }
  dither(grid, 0, 0, width, WALL_CAP_ROWS, rampIndex('indigo', 1), rampIndex('plum', 2));
  return grid;
}

const PANEL_PITCH = 60;
const PANEL_X_OFFSET = 4;
const PANEL_Y = 8;
const PANEL_W = 52;
const PANEL_H = 28;

export function wainscotGrid(): Grid {
  const { width, height } = ROOM_ART_SIZES.wainscot;
  const grid = createGrid(width, height, rampIndex('wood', 3));
  shadeRect(grid, 0, 0, width, height, 'wood', 3, 2);
  fillRect(grid, 0, 0, width, 3, rampIndex('brass', 3));
  fillRect(grid, 0, 3, width, 1, rampIndex('wood', 0));
  for (let x = PANEL_X_OFFSET; x + PANEL_W <= width; x += PANEL_PITCH) {
    outlineRect(grid, x, PANEL_Y, PANEL_W, PANEL_H, rampIndex('wood', 1));
    fillRect(grid, x + 1, PANEL_Y + 1, PANEL_W - 2, 1, rampIndex('wood', 4));
  }
  return grid;
}

const FLOOR_BAND_HEIGHT = 16;
const PLANK_LENGTH = 48;
const GRAIN_EVERY_N_PLANKS = 4;

export function floorGrid(): Grid {
  const { width, height } = ROOM_ART_SIZES.floor;
  const grid = createGrid(width, height, rampIndex('wood', 3));
  for (let band = 0, y = 0; y < height; band++, y += FLOOR_BAND_HEIGHT) {
    fillRect(grid, 0, y, width, 1, rampIndex('wood', 1));
    const offset = (band * FLOOR_BAND_HEIGHT) % PLANK_LENGTH;
    for (let plank = 0, x = offset; x < width; plank++, x += PLANK_LENGTH) {
      fillRect(grid, x, y, 1, FLOOR_BAND_HEIGHT, rampIndex('wood', 1));
      if (plank % GRAIN_EVERY_N_PLANKS === 0) {
        dither(grid, x + 1, y + 1, PLANK_LENGTH - 1, FLOOR_BAND_HEIGHT - 1, rampIndex('wood', 3), rampIndex('wood', 4));
      }
    }
  }
  return grid;
}

export function windowGrid(): Grid {
  const { width, height } = ROOM_ART_SIZES.window;
  const grid = createGrid(width, height, rampIndex('indigo', 1));
  const halfHeight = Math.floor(height / 2);
  dither(grid, 0, halfHeight, width, height - halfHeight, rampIndex('indigo', 2), rampIndex('indigo', 1));

  for (const [x, y] of [[10, 8], [40, 14], [24, 30]]) {
    fillRect(grid, x, y, 3, 3, rampIndex('moon', 5));
  }

  // Crescent moon: a full disc, then an offset sky-coloured disc overpaints part of it.
  fillRect(grid, 36, 6, 14, 14, rampIndex('moon', 5));
  fillRect(grid, 40, 4, 12, 12, rampIndex('indigo', 1));

  outlineRect(grid, 0, 0, width, height, rampIndex('brass', 1));
  outlineRect(grid, 1, 1, width - 2, height - 2, rampIndex('brass', 4));
  fillRect(grid, Math.floor(width / 2) - 1, 1, 2, height - 2, rampIndex('brass', 3));
  fillRect(grid, 1, Math.floor(height / 2) - 1, width - 2, 2, rampIndex('brass', 3));

  const curtainWidth = 6;
  for (const x of [0, width - curtainWidth]) {
    fillRect(grid, x, 0, curtainWidth, height, rampIndex('plum', 3));
    fillRect(grid, x + 2, 0, 1, height, rampIndex('plum', 1));
  }
  return grid;
}

export const BACKGROUND_SOURCES: ArtSource[] = [
  {
    id: 'room/wall',
    path: 'worlds/the-boys-room/room/wall.png',
    frames: [wallGrid()],
  },
  {
    id: 'room/wainscot',
    path: 'worlds/the-boys-room/room/wainscot.png',
    frames: [wainscotGrid()],
  },
  {
    id: 'room/floor',
    path: 'worlds/the-boys-room/room/floor.png',
    frames: [floorGrid()],
  },
  {
    id: 'room/window',
    path: 'worlds/the-boys-room/room/window.png',
    frames: [windowGrid()],
  },
];

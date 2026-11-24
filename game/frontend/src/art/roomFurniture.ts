// Furniture pixel grids for the boys-room scene. Each grid is a palette-index grid
// (see src/lib/palette.ts) built from draw.ts helpers at the size in ROOM_ART_SIZES.
// Index 0 is the empty background.

import type { ArtSource } from './sources';
import { createGrid, dither, fillRect, outlineRect, rampIndex, shadeRect, type Grid } from './draw';
import { ROOM_ART_SIZES } from './roomSizes';

const OUTLINE = rampIndex('indigo', 0);

export function deskGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.desk;
  const g = createGrid(w, h, 0);
  // Top slab (rows 0-5), front body, then legs at both ends.
  shadeRect(g, 0, 0, w, 6, 'wood', 5, 4);
  shadeRect(g, 1, 6, w - 2, 18, 'wood', 3, 2);
  fillRect(g, 4, 24, 4, h - 24, rampIndex('wood', 1));
  fillRect(g, w - 8, 24, 4, h - 24, rampIndex('wood', 1));
  outlineRect(g, 0, 0, w, h, OUTLINE);
  return g;
}

export function computerGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.computer;
  const g = createGrid(w, h, 0);
  // Monitor body with screen, neck and base.
  fillRect(g, 0, 0, w, 24, rampIndex('parchment', 2));
  outlineRect(g, 0, 0, w, 24, OUTLINE);
  fillRect(g, 3, 3, w - 6, 16, rampIndex('moon', 3));
  fillRect(g, 3, 3, w - 6, 1, rampIndex('moon', 5));
  fillRect(g, 12, 24, 6, 6, rampIndex('brass', 1));
  fillRect(g, 6, 30, w - 12, h - 30, rampIndex('brass', 1));
  return g;
}

export function lampGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.lamp;
  const g = createGrid(w, h, 0);
  // Shade on top 10 rows with a highlight column, stem, then a wooden base.
  fillRect(g, 0, 0, w, 10, rampIndex('lamp', 4));
  fillRect(g, 2, 0, 2, 10, rampIndex('lamp', 5));
  outlineRect(g, 0, 0, w, 10, OUTLINE);
  fillRect(g, 7, 10, 2, 12, rampIndex('brass', 2));
  fillRect(g, 3, 22, 10, 4, rampIndex('wood', 2));
  outlineRect(g, 3, 22, 10, 4, OUTLINE);
  return g;
}

export function plantGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.plant;
  const g = createGrid(w, h, 0);
  // Foliage: moon 2 and moon 3 blocks with a dithered band between them.
  fillRect(g, 3, 1, 14, 14, rampIndex('moon', 2));
  fillRect(g, 1, 5, 18, 12, rampIndex('moon', 3));
  dither(g, 3, 13, 14, 7, rampIndex('moon', 3), rampIndex('moon', 2));
  // Pot.
  fillRect(g, 5, 22, 10, h - 22, rampIndex('wood', 3));
  outlineRect(g, 5, 22, 10, h - 22, OUTLINE);
  return g;
}

export function posterGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.poster;
  const g = createGrid(w, h, 0);
  // Parchment sheet with a plum figure and a brass title bar.
  fillRect(g, 0, 0, w, h, rampIndex('parchment', 4));
  outlineRect(g, 0, 0, w, h, rampIndex('wood', 1));
  fillRect(g, 11, 6, 6, 5, rampIndex('plum', 3)); // head
  fillRect(g, 8, 11, 12, 15, rampIndex('plum', 3)); // body
  fillRect(g, 4, 29, 20, 3, rampIndex('brass', 4)); // title bar
  return g;
}

export function bookshelfGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.bookshelf;
  const g = createGrid(w, h, 0);
  // Wooden body, then three shelf boards with a highlight on top and shadow underneath.
  shadeRect(g, 0, 0, w, h, 'wood', 3, 2);
  outlineRect(g, 0, 0, w, h, OUTLINE);
  const shelfRows = [30, 60, 90];
  for (const y of shelfRows) {
    fillRect(g, 1, y, w - 2, 1, rampIndex('wood', 5));
    fillRect(g, 1, y + 1, w - 2, 1, rampIndex('wood', 1));
  }
  // Books on the top two shelves: 3-wide vertical blocks resting on each board.
  const bookColours = [rampIndex('plum', 3), rampIndex('hoodie', 3), rampIndex('lamp', 3)];
  const bookHeights = [14, 16, 12, 15, 13, 16, 12, 14, 15, 13, 16];
  for (const shelfY of [30, 60]) {
    bookHeights.forEach((bh, i) => {
      const x = 2 + i * 4;
      const topRow = shelfY - bh;
      fillRect(g, x, topRow, 3, bh, bookColours[i % bookColours.length]);
    });
  }
  // Globe on the bottom shelf: a 12x12 moon block with cut corners and a brass stand.
  const gx = 18;
  const gy = 76;
  for (let dy = 0; dy < 12; dy++) {
    for (let dx = 0; dx < 12; dx++) {
      const corner = (dx < 2 || dx > 9) && (dy < 2 || dy > 9);
      if (!corner) fillRect(g, gx + dx, gy + dy, 1, 1, rampIndex('moon', 3));
    }
  }
  fillRect(g, 22, 88, 8, 2, rampIndex('brass', 3));
  return g;
}

export function bedGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.bed;
  const g = createGrid(w, h, 0);
  // Wooden frame, parchment mattress and a checkered hoodie blanket with a lamp trim row.
  fillRect(g, 0, 0, w, h, rampIndex('wood', 3));
  fillRect(g, 3, 3, w - 6, 34, rampIndex('parchment', 4));
  const blanketTop = 14;
  const blanketBottom = 36;
  for (let by = blanketTop; by < blanketBottom; by += 6) {
    for (let bx = 3; bx < w - 3; bx += 6) {
      const colour = ((bx - 3) / 6 + (by - blanketTop) / 6) % 2 === 0 ? rampIndex('hoodie', 3) : rampIndex('hoodie', 2);
      fillRect(g, bx, by, Math.min(6, w - 3 - bx), Math.min(6, blanketBottom - by), colour);
    }
  }
  fillRect(g, 3, blanketTop, w - 6, 1, rampIndex('lamp', 4));
  fillRect(g, 8, 5, 22, 8, rampIndex('parchment', 5)); // pillow
  outlineRect(g, 0, 0, w, h, OUTLINE);
  return g;
}

export function doorGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.door;
  const g = createGrid(w, h, 0);
  // Shaded wooden door with two inset panels, a brass knob and a light strip underneath.
  shadeRect(g, 0, 0, w, h, 'wood', 3, 2);
  outlineRect(g, 5, 6, 30, 30, rampIndex('wood', 1));
  outlineRect(g, 5, 44, 30, 30, rampIndex('wood', 1));
  fillRect(g, 31, 38, 3, 3, rampIndex('brass', 4));
  outlineRect(g, 0, 0, w, h, OUTLINE);
  fillRect(g, 0, h - 1, w, 1, rampIndex('lamp', 5));
  return g;
}

export function rugGrid(): Grid {
  const { width: w, height: h } = ROOM_ART_SIZES.rug;
  const g = createGrid(w, h, 0);
  // Plum field with a double brass border and a dithered centre.
  fillRect(g, 0, 0, w, h, rampIndex('plum', 3));
  outlineRect(g, 0, 0, w, h, rampIndex('brass', 3));
  outlineRect(g, 2, 2, w - 4, h - 4, rampIndex('brass', 3));
  dither(g, 6, 6, w - 12, h - 12, rampIndex('plum', 4), rampIndex('plum', 3));
  return g;
}

export const FURNITURE_SOURCES: ArtSource[] = [
  { id: 'room/desk', path: 'worlds/the-boys-room/room/desk.png', frames: [deskGrid()] },
  { id: 'room/computer', path: 'worlds/the-boys-room/room/computer.png', frames: [computerGrid()] },
  { id: 'room/lamp', path: 'worlds/the-boys-room/room/lamp.png', frames: [lampGrid()] },
  { id: 'room/plant', path: 'worlds/the-boys-room/room/plant.png', frames: [plantGrid()] },
  { id: 'room/poster', path: 'worlds/the-boys-room/room/poster.png', frames: [posterGrid()] },
  { id: 'room/bookshelf', path: 'worlds/the-boys-room/room/bookshelf.png', frames: [bookshelfGrid()] },
  { id: 'room/bed', path: 'worlds/the-boys-room/room/bed.png', frames: [bedGrid()] },
  { id: 'room/door', path: 'worlds/the-boys-room/room/door.png', frames: [doorGrid()] },
  { id: 'room/rug', path: 'worlds/the-boys-room/room/rug.png', frames: [rugGrid()] },
];

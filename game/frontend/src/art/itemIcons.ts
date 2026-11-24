// Item icons for worlds/the-boys-room: six 16x16 inventory icons built from draw.ts helpers.
// Each grid is a palette-index grid (see src/lib/palette.ts); index 0 is the background.

import type { ArtSource } from './sources';
import { createGrid, fillRect, outlineRect, rampIndex, type Grid } from './draw';

export const ITEM_ICON_SIZE = 16;
const OUTLINE = rampIndex('indigo', 0);

// Old key: brass ring at the top, a shaft down the middle, and two teeth on the right.
function oldKeyGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 4, 1, 8, 8, rampIndex('brass', 3));
  fillRect(g, 6, 3, 4, 4, 0);
  fillRect(g, 5, 2, 1, 2, rampIndex('brass', 5));
  outlineRect(g, 4, 1, 8, 8, OUTLINE);
  outlineRect(g, 6, 3, 4, 4, OUTLINE);
  fillRect(g, 7, 9, 2, 5, rampIndex('brass', 3));
  outlineRect(g, 6, 9, 4, 6, OUTLINE);
  fillRect(g, 10, 11, 2, 2, rampIndex('brass', 2));
  fillRect(g, 10, 13, 2, 2, rampIndex('brass', 2));
  outlineRect(g, 10, 11, 2, 2, OUTLINE);
  outlineRect(g, 10, 13, 2, 2, OUTLINE);
  return g;
}

// Note: a parchment sheet with two moon-ramp text lines.
function noteGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 3, 2, 10, 12, rampIndex('parchment', 4));
  fillRect(g, 4, 3, 8, 1, rampIndex('parchment', 5));
  fillRect(g, 5, 6, 6, 1, rampIndex('moon', 2));
  fillRect(g, 5, 9, 6, 1, rampIndex('moon', 2));
  outlineRect(g, 3, 2, 10, 12, OUTLINE);
  return g;
}

// Book: a plum cover with a parchment page edge along the right side.
function bookGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 2, 2, 11, 13, rampIndex('plum', 3));
  fillRect(g, 2, 2, 2, 13, rampIndex('plum', 1));
  fillRect(g, 11, 3, 2, 11, rampIndex('parchment', 4));
  outlineRect(g, 2, 2, 11, 13, OUTLINE);
  return g;
}

// Coin: a brass disc with a step 5 highlight in the upper left.
function coinGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 3, 3, 10, 10, rampIndex('brass', 3));
  fillRect(g, 4, 4, 3, 3, rampIndex('brass', 5));
  outlineRect(g, 3, 3, 10, 10, OUTLINE);
  return g;
}

// Flashlight: a moon-ramp body with a lamp step 5 lens at the head.
function flashlightGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 1, 6, 9, 4, rampIndex('moon', 2));
  fillRect(g, 2, 7, 7, 1, rampIndex('moon', 4));
  outlineRect(g, 1, 6, 9, 4, OUTLINE);
  fillRect(g, 10, 4, 5, 8, rampIndex('moon', 3));
  outlineRect(g, 10, 4, 5, 8, OUTLINE);
  fillRect(g, 12, 5, 2, 6, rampIndex('lamp', 5));
  return g;
}

// Photo: a parchment frame around a moon-ramp picture with a hoodie step 3 figure.
function photoGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 1, 2, 14, 12, rampIndex('parchment', 4));
  outlineRect(g, 1, 2, 14, 12, OUTLINE);
  fillRect(g, 3, 4, 10, 8, rampIndex('moon', 4));
  fillRect(g, 6, 5, 4, 2, rampIndex('parchment', 5));
  fillRect(g, 5, 7, 6, 5, rampIndex('hoodie', 3));
  outlineRect(g, 3, 4, 10, 8, OUTLINE);
  return g;
}

export const ITEM_SOURCES: ArtSource[] = [
  { id: 'item/old-key', path: 'worlds/the-boys-room/items/old-key.png', frames: [oldKeyGrid()] },
  { id: 'item/note', path: 'worlds/the-boys-room/items/note.png', frames: [noteGrid()] },
  { id: 'item/book', path: 'worlds/the-boys-room/items/book.png', frames: [bookGrid()] },
  { id: 'item/coin', path: 'worlds/the-boys-room/items/coin.png', frames: [coinGrid()] },
  { id: 'item/flashlight', path: 'worlds/the-boys-room/items/flashlight.png', frames: [flashlightGrid()] },
  { id: 'item/photo', path: 'worlds/the-boys-room/items/photo.png', frames: [photoGrid()] },
];

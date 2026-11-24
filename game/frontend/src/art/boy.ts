// Boy character art for worlds/the-boys-room: portrait grid built with the helpers in ./draw.
// Each grid is row-major palette indices (see src/lib/palette.ts).

import type { ArtSource } from './types';
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

// Boy sheet: 14 frames of 32 wide by 48 tall. Frames 0-3 idle, 4-9 walk, 10-13 interact.
const SHEET_W = 32;
const SHEET_H = 48;
const OUTLINE = rampIndex('indigo', 0);

export type BoyPose = 'idle' | 'walk' | 'interact';

// Leg stride offset (in pixels) per walk step; the left and right legs move in opposite directions.
const WALK_STRIDE = [-1, 0, 1, 0, -1, 0];

// Upper-body offset (in pixels) over a 4-step idle breathing cycle. Every step differs from the
// step two before it, so idle frames 0 and 2 are distinct poses rather than duplicates.
const BREATH = [0, 1, 2, 1];

export function boyFrame(pose: BoyPose, step: number): Grid {
  const g = createGrid(SHEET_W, SHEET_H, 0);
  // Upper body bobs on the idle breathing cycle or alternate walk steps; the feet never move.
  const bob = pose === 'interact' ? 0 : pose === 'idle' ? BREATH[step % BREATH.length] : step % 2;
  const stride = pose === 'walk' ? WALK_STRIDE[step % WALK_STRIDE.length] : 0;

  // Legs and shoes (moon jeans, wood shoes) on fixed ground rows 34-46.
  const leftLegX = 10 + stride;
  const rightLegX = 17 - stride;
  fillRect(g, leftLegX, 34, 5, 10, rampIndex('moon', 1));
  fillRect(g, rightLegX, 34, 5, 10, rampIndex('moon', 1));
  outlineRect(g, leftLegX, 34, 5, 10, OUTLINE);
  outlineRect(g, rightLegX, 34, 5, 10, OUTLINE);
  fillRect(g, leftLegX - 1, 44, 6, 3, rampIndex('wood', 1));
  fillRect(g, rightLegX - 1, 44, 6, 3, rampIndex('wood', 1));

  // Hoodie torso with a collar band.
  shadeRect(g, 8, 18 - bob, 16, 16, 'hoodie', 3, 1);
  fillRect(g, 11, 17 - bob, 10, 2, rampIndex('hoodie', 4));
  outlineRect(g, 8, 17 - bob, 16, 17, OUTLINE);

  // Arms: left arm swings with the stride; right arm rests, or rises when interacting.
  const leftArmX = 4 + stride;
  shadeRect(g, leftArmX, 19 - bob, 4, 11, 'hoodie', 3, 2);
  outlineRect(g, leftArmX, 19 - bob, 4, 11, OUTLINE);
  fillRect(g, leftArmX, 30 - bob, 4, 2, rampIndex('parchment', 3));

  if (pose === 'interact') {
    const raiseTop = 8 + BREATH[step % BREATH.length];
    shadeRect(g, 24, raiseTop + 2, 4, 20 - raiseTop, 'hoodie', 3, 2);
    outlineRect(g, 24, raiseTop + 2, 4, 20 - raiseTop, OUTLINE);
    fillRect(g, 24, raiseTop, 4, 2, rampIndex('parchment', 4));
  } else {
    const rightArmX = 24 - stride;
    shadeRect(g, rightArmX, 19 - bob, 4, 11, 'hoodie', 3, 2);
    outlineRect(g, rightArmX, 19 - bob, 4, 11, OUTLINE);
    fillRect(g, rightArmX, 30 - bob, 4, 2, rampIndex('parchment', 3));
  }

  // Head with wood-brown hair across the top and two eyes.
  shadeRect(g, 10, 4 - bob, 12, 13, 'parchment', 5, 3);
  fillRect(g, 10, 4 - bob, 12, 4, rampIndex('wood', 1));
  fillRect(g, 13, 11 - bob, 2, 2, OUTLINE);
  fillRect(g, 18, 11 - bob, 2, 2, OUTLINE);
  outlineRect(g, 10, 4 - bob, 12, 13, OUTLINE);

  return g;
}

export const BOY_SHEET_SOURCE: ArtSource = {
  id: 'character:boy-sheet',
  path: 'worlds/the-boys-room/characters/boy-sheet.png',
  frames: [
    ...[0, 1, 2, 3].map((step) => boyFrame('idle', step)),
    ...[0, 1, 2, 3, 4, 5].map((step) => boyFrame('walk', step)),
    ...[0, 1, 2, 3].map((step) => boyFrame('interact', step)),
  ],
  animations: {
    idle: { frames: [0, 1, 2, 3], frameRate: 4, repeat: -1 },
    walk: { frames: [4, 5, 6, 7, 8, 9], frameRate: 10, repeat: -1 },
    interact: { frames: [10, 11, 12, 13], frameRate: 8, repeat: 0 },
  },
  origin: { x: 0.5, y: 1 },
};

export const BOY_SOURCES: ArtSource[] = [BOY_SHEET_SOURCE, BOY_PORTRAIT_SOURCE];

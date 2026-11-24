// Scene extras for worlds/the-boys-room: the open secret door and the dust mote effect.
// Each grid is a palette-index grid (see src/lib/palette.ts) built from draw.ts helpers.

import type { ArtSource } from './sources';
import { createGrid, fillRect, outlineRect, rampIndex, shadeRect, type Grid } from './draw';

const SECRET_DOOR_WIDTH = 32;
const SECRET_DOOR_HEIGHT = 64;

// Open secret door: indigo interior, brass frame, and a lamp-lit strip along the bottom row.
export function secretDoorGrid(): Grid {
  const g = createGrid(SECRET_DOOR_WIDTH, SECRET_DOOR_HEIGHT, 0);
  shadeRect(g, 0, 0, SECRET_DOOR_WIDTH, SECRET_DOOR_HEIGHT, 'indigo', 3, 1);
  outlineRect(g, 0, 0, SECRET_DOOR_WIDTH, SECRET_DOOR_HEIGHT, rampIndex('brass', 3));
  fillRect(g, 0, SECRET_DOOR_HEIGHT - 1, SECRET_DOOR_WIDTH, 1, rampIndex('lamp', 3));
  return g;
}

// Dust mote: a 4x4 moon-ramp dot with transparent corners.
export function dustGrid(): Grid {
  const g = createGrid(4, 4, rampIndex('moon', 4));
  fillRect(g, 0, 0, 1, 1, 0);
  fillRect(g, 3, 0, 1, 1, 0);
  fillRect(g, 0, 3, 1, 1, 0);
  fillRect(g, 3, 3, 1, 1, 0);
  return g;
}

export const SCENE_EXTRA_SOURCES: ArtSource[] = [
  { id: 'objects/secret-door-open', path: 'worlds/the-boys-room/objects/secret-door-open.png', frames: [secretDoorGrid()] },
  { id: 'effect:dust', path: 'worlds/the-boys-room/effects/dust.png', frames: [dustGrid()] },
];

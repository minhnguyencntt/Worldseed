// Nine-slice UI frame sources: each frame is a small bordered bitmap whose corners stay fixed
// while the edges and centre stretch. Built from palette ramps so art and UI share one palette.

import type { PALETTE_RAMPS } from '../lib/palette';
import type { ArtSource } from './sources';
import { createGrid, fillRect, outlineRect, rampIndex, shadeRect, type Grid } from './draw';

type RampName = keyof typeof PALETTE_RAMPS;

export interface FrameSpec {
  w: number;
  h: number;
  slice: number;
  ramp: RampName;
  border: RampName;
  lightStep: number;
  darkStep: number;
}

export interface FrameKitEntry extends FrameSpec {
  id: string;
  file: string;
}

// Builds one frame grid: shaded body, 1px highlight/shadow bevel, 1px outline, and 2px brass corner brackets.
export function buildFrameGrid(spec: FrameSpec): Grid {
  const { w, h, slice, ramp, border, lightStep, darkStep } = spec;
  if (!Number.isInteger(w) || !Number.isInteger(h) || w <= 0 || h <= 0) throw new Error(`bad frame size ${w}x${h}`);
  if (!Number.isInteger(slice) || slice <= 0 || slice * 2 >= w || slice * 2 >= h) {
    throw new Error(`slice ${slice} must be an integer under half of ${w}x${h}`);
  }

  const g = createGrid(w, h, rampIndex(ramp, darkStep));
  shadeRect(g, 1, 1, w - 2, h - 2, ramp, lightStep, darkStep);

  // Bevel: highlight on top/left, shadow on bottom/right, inside the outline.
  fillRect(g, 1, 1, w - 2, 1, rampIndex(ramp, 5));
  fillRect(g, 1, 1, 1, h - 2, rampIndex(ramp, 5));
  fillRect(g, 1, h - 2, w - 2, 1, rampIndex(ramp, 0));
  fillRect(g, w - 2, 1, 1, h - 2, rampIndex(ramp, 0));

  outlineRect(g, 0, 0, w, h, rampIndex(border, 0));

  // Brass 2px corner brackets, each arm `slice` long, drawn inside the outline.
  const brass = rampIndex('brass', 3);
  fillRect(g, 1, 1, slice, 2, brass);
  fillRect(g, 1, 1, 2, slice, brass);
  fillRect(g, w - 1 - slice, 1, slice, 2, brass);
  fillRect(g, w - 3, 1, 2, slice, brass);
  fillRect(g, 1, h - 3, slice, 2, brass);
  fillRect(g, 1, h - 1 - slice, 2, slice, brass);
  fillRect(g, w - 1 - slice, h - 3, slice, 2, brass);
  fillRect(g, w - 3, h - 1 - slice, 2, slice, brass);

  return g;
}

const BORDER: RampName = 'indigo';

export const FRAME_KIT: FrameKitEntry[] = [
  { id: 'ui/frame-bar', file: 'bar', w: 32, h: 24, slice: 8, ramp: 'wood', border: BORDER, lightStep: 3, darkStep: 1 },
  { id: 'ui/frame-panel', file: 'panel', w: 24, h: 24, slice: 8, ramp: 'wood', border: BORDER, lightStep: 3, darkStep: 1 },
  { id: 'ui/frame-plaque', file: 'plaque', w: 32, h: 16, slice: 6, ramp: 'brass', border: BORDER, lightStep: 3, darkStep: 1 },
  { id: 'ui/frame-parchment', file: 'parchment', w: 24, h: 24, slice: 8, ramp: 'parchment', border: BORDER, lightStep: 5, darkStep: 2 },
  { id: 'ui/frame-slot', file: 'slot', w: 20, h: 20, slice: 6, ramp: 'indigo', border: BORDER, lightStep: 1, darkStep: 0 },
  { id: 'ui/frame-button-normal', file: 'button-normal', w: 24, h: 16, slice: 6, ramp: 'brass', border: BORDER, lightStep: 3, darkStep: 1 },
  { id: 'ui/frame-button-hover', file: 'button-hover', w: 24, h: 16, slice: 6, ramp: 'brass', border: BORDER, lightStep: 4, darkStep: 2 },
  { id: 'ui/frame-button-pressed', file: 'button-pressed', w: 24, h: 16, slice: 6, ramp: 'brass', border: BORDER, lightStep: 2, darkStep: 0 },
  { id: 'ui/frame-button-disabled', file: 'button-disabled', w: 24, h: 16, slice: 6, ramp: 'parchment', border: BORDER, lightStep: 3, darkStep: 2 },
];

export const UI_FRAME_SOURCES: ArtSource[] = FRAME_KIT.map((f) => ({ id: f.id, path: `ui/frames/${f.file}.png`, frames: [buildFrameGrid(f)] }));

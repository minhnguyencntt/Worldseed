// Shared art types: imported by the art modules so none of them needs to import sources.ts.

import type { AnimationDef, Origin } from '@game/assets/manifest';

export type Grid = number[][];

export interface ArtSource {
  id: string;
  path: string;
  frames: Grid[];
  animations?: Record<string, AnimationDef>;
  origin?: Origin;
}

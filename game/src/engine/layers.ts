import type { Layer } from '../content/schema';
export const LAYER_ORDER: readonly Layer[] = ['background','furniture','objects','characters','effects','ui'];
export function layerDepth(layer?: string): number {
  const i = LAYER_ORDER.indexOf(layer as Layer);
  return (i === -1 ? LAYER_ORDER.indexOf('objects') : i) * 100;
}

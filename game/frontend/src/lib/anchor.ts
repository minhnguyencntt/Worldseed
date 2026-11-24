export interface AnchorInput {
  position: { x: number; y: number };
  bounds?: { x: number; y: number; width: number; height: number };
  scale: number;
  zoom: number;
  offset: { left: number; top: number };
  dpr: number;
}

export interface Anchor {
  top: { x: number; y: number };
  bottom: { x: number; y: number };
}

/**
 * Converts an object's world-space bounds into CSS-pixel anchor points
 * (top-centre and bottom-centre) relative to the viewport.
 * Returns null when the object has no bounds.
 */
export function anchorFor(input: AnchorInput): Anchor | null {
  const { position, bounds, scale, zoom, offset, dpr } = input;
  if (!bounds) return null;

  const z = zoom / dpr;
  const x = offset.left + (position.x + (bounds.x + bounds.width / 2) * scale) * z;
  const topY = offset.top + (position.y + bounds.y * scale) * z;
  const bottomY = offset.top + (position.y + (bounds.y + bounds.height) * scale) * z;

  return {
    top: { x, y: topY },
    bottom: { x, y: bottomY },
  };
}

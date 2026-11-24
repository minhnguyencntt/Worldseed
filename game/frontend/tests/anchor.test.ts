import { describe, expect, it } from 'vitest';
import { anchorFor, type AnchorInput } from '../src/lib/anchor';

const base: AnchorInput = {
  position: { x: 150, y: 60 },
  bounds: { x: 0, y: 0, width: 48, height: 96 },
  scale: 1,
  zoom: 2,
  offset: { left: 10, top: 20 },
  dpr: 1,
};

describe('anchorFor maths', () => {
  it('Given position (150,60), bounds 48x96 at origin, zoom 2 and offset (10,20), when anchored, then top and bottom centre points are (358,140) and (358,332)', () => {
    const result = anchorFor(base);

    expect(result).toEqual({
      top: { x: 358, y: 140 },
      bottom: { x: 358, y: 332 },
    });
  });

  it('Given zoom 4 with dpr 2, when anchored, then the result equals the zoom 2 dpr 1 result', () => {
    const result = anchorFor({ ...base, zoom: 4, dpr: 2 });

    expect(result).toEqual(anchorFor(base));
  });

  it('Given no bounds, when anchored, then the result is null', () => {
    expect(anchorFor({ ...base, bounds: undefined })).toBeNull();
  });

  it('Given scale 2, when anchored, then the bounds offsets from position double compared with scale 1', () => {
    const scale1 = anchorFor(base);
    const scale2 = anchorFor({ ...base, scale: 2 });

    expect(scale1).not.toBeNull();
    expect(scale2).not.toBeNull();

    // Offsets are measured from the object position, in screen pixels (zoom 2, offset 10,20).
    const xOffset1 = (scale1!.top.x - base.offset.left) / base.zoom - base.position.x;
    const xOffset2 = (scale2!.top.x - base.offset.left) / base.zoom - base.position.x;
    const yBottom1 = (scale1!.bottom.y - base.offset.top) / base.zoom - base.position.y;
    const yBottom2 = (scale2!.bottom.y - base.offset.top) / base.zoom - base.position.y;

    expect(xOffset2).toBe(xOffset1 * 2);
    expect(yBottom2).toBe(yBottom1 * 2);
    // Top edge stays at the object's y, since bounds.y is 0.
    expect(scale2!.top.y).toBe(scale1!.top.y);
  });
});

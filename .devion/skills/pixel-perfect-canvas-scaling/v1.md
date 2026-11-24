# pixel perfect canvas scaling

Render a fixed low-resolution canvas at whole-number scale with nearest-neighbour sampling that accounts for device pixel ratio.

## When to use

Showing low-resolution pixel graphics in a resizable container without blur or uneven pixels.

## How to apply

1. Fix one native resolution and compute the scale as the floor of the available size divided by native size.
2. Centre the canvas and letterbox the remainder.
3. Set the renderer to pixelArt and nearest filtering, and disable antialiasing and rounding drift.
4. Fold device pixel ratio into the scale so one image pixel maps to a whole number of device pixels.
5. Convert pointer coordinates back through the same scale.

## Pitfalls

- CSS fractional scaling blurs pixels, so use integer factors.
- Smoothing left on in some texture paths blurs only some sprites, so set filtering globally.
- Sub-pixel camera or sprite positions shimmer, so round positions.

## Self-check

- The scale function always returns an integer of at least 1.
- Screenshots at several window sizes show crisp edges.

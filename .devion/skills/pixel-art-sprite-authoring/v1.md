# pixel art sprite authoring

Author small raster sprites as palette-indexed grids with clear silhouettes, outlines, ramp shading and selective dithering.

## When to use

Creating characters, props, tiles or icons from source data at native resolution, where readability at tiny sizes matters.

## How to apply

1. Store each sprite as a grid of palette indices, with one index reserved for transparent.
2. Block the silhouette first and check that it reads in a single flat colour.
3. Add a darker outline, or a selective outline tinted by the neighbouring colour.
4. Shade with 3 to 5 step colour ramps and one fixed light direction for the whole set.
5. Use dithering only on large gradients, and use clean pixel clusters elsewhere.
6. Build animation frames from a shared base with small offsets so volume and the foot anchor stay stable.

## Pitfalls

- Single-pixel noise clutters the sprite, so merge it into clusters.
- Pillow shading, where the light comes from the middle, flattens the form, so keep one light direction.
- Mixed pixel scales break the style, so draw everything at the same native resolution.
- Jittering anchor points between frames makes the sprite shake, so fix the pivot.

## Self-check

- The sprite is recognisable as a flat silhouette.
- Every pixel index resolves to a palette entry.
- Frame dimensions are identical across an animation.

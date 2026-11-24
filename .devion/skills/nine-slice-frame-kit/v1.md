# nine slice frame kit

Build resizable bordered interface frames from a single small image using nine-slice scaling with state variants.

## When to use

Skinning panels, buttons and plaques with bitmap art that must stretch without distorting its corners.

## How to apply

1. Cut each frame into fixed corners, stretched edges and a stretched or tiled centre, and record the slice insets.
2. Apply the image with border-image or a nine-slice component, with pixelated rendering and whole-pixel insets.
3. Define normal, hover, pressed and disabled variants as sibling images with identical slice geometry.
4. Keep the content padding at least as large as the border insets.

## Pitfalls

- Fractional insets blur the borders, so use integers.
- Variants with different borders make content jump, so keep the geometry identical.
- Stretching a patterned centre looks wrong, so tile it or use a flat fill.

## Self-check

- Resizing the frame leaves the corners unchanged.
- Every variant uses the same insets.

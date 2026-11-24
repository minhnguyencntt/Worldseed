# dom overlay canvas anchoring

Position DOM elements over canvas objects by converting world coordinates to screen coordinates.

## When to use

Showing labels, menus or buttons attached to objects inside a canvas scene.

## How to apply

1. Convert object bounds to screen pixels using the canvas bounding rect, the display scale and the camera offset.
2. Publish the anchor rectangle through a typed event or store, and recompute it on resize, camera change and object movement.
3. Render the overlay in a positioned layer above the canvas and flip it near the edges.
4. Remove the anchor when the selection clears.

## Pitfalls

- Stale rectangles after resize misplace the overlay, so subscribe to resize.
- An overlay that captures pointer events blocks the canvas, so limit pointer events to its controls.
- Updating on every frame wastes work, so update only on change.

## Self-check

- The overlay stays attached through a resize.
- Edge cases keep the overlay inside the viewport.

# layered 2d lighting particles

Compose cheap 2D lighting and ambient particles as blended sprite layers over a scene.

## When to use

Adding mood lighting, glows, shafts, vignettes and drifting motes to a 2D engine without a full lighting system.

## How to apply

1. Draw glows and shafts as pre-baked soft sprites with additive or screen blending on a layer above the world.
2. Draw the vignette as one multiply-blended overlay.
3. Use a particle emitter with a low count, slow speed, alpha fade and a bounded zone.
4. Add a slow sine flicker or pulse to the intensity of each light.
5. Derive light positions and colours from the content data.

## Pitfalls

- Too many full-screen blended layers hurt fill rate, so merge them where possible.
- Lights tinted outside the palette break the style, so use palette colours.
- Particles that never die leak memory, so give each a lifespan.

## Self-check

- Removing the effects layer leaves a valid scene.
- Particle counts stay bounded over time.

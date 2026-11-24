---
id: "01M85RGSG9FBM4NCZ48Q28GFYK"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.3 Add the PNG generation script and manifest update

Context: gridToRgba (frontend/src/lib/gridToRgba.ts), buildSpriteSheet (frontend/src/lib/spriteSheet.ts) and the shared PALETTE (frontend/src/lib/palette.ts) exist, but there is no PNG encoder, no grid source files, no script and no npm script. The manifest at game/public/assets/worlds/the-boys-room/manifest.json only lists SVGs. Desired behavior: a script reads grid sources, encodes PNGs with no timestamps, writes them under game/frontend/public/assets and rewrites manifest entries with path, size and frame data. Why: later cycles replace placeholder art with generated PNGs.

## Acceptance criteria
- Given the grid sources, when the script runs twice, then every PNG file has identical bytes
- Given a generated PNG, when its IHDR is read, then width and height equal the manifest entry dimensions
- Given a sheet source, when the manifest is rewritten, then the entry holds path, dimensions and frameWidth, frameHeight, frameCount
- Given package.json, when scripts are read, then an art:generate npm script runs the generator


## Scope
- In scope: PNG encoder
- In scope: grid source registry
- In scope: generator plan and manifest merge
- In scope: script and npm script
- Out of scope: new rooms
- Out of scope: story content
- Out of scope: backend
- Out of scope: audio
- Out of scope: deployment
- Out of scope: repository clean-up
- Out of scope: redrawing the room art
- Preserve: Phaser ~3.90.0 pin and guard tests
- Preserve: existing manifest entries not produced by a source
- Preserve: gridToRgba and buildSpriteSheet behavior


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay
- All art is raster pixel art generated in-repo from source data; no downloaded art, image services or CDN links
- One shared palette of at most 48 colours; sources use palette indices only
- Scene content stays data-driven
- Tests are unit tests with dependencies mocked


## Dependencies
- SG-1.1 palette (done)
- SG-1.2 gridToRgba and buildSpriteSheet (done)


## Definition of done
- All requirements delivered with passing unit tests


## Non-functional requirements
- Output is byte-identical across runs on the same Node version


## Clarifying questions
- None

---
id: "01M85QW2EA0XY4GZ16JRJP5BE5"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2 Write pure grid-to-pixels and sprite-sheet functions

Context: game/frontend/src/lib/palette.ts exports PALETTE, a 48-entry list of '#rrggbb' strings. No art code exists yet. Desired behaviour: pure, deterministic functions convert a palette-indexed grid to RGBA bytes and arrange frames into a sheet. Expected result: unit tests check width, height, frame count, palette-only colours and that an out-of-range index throws. Why: SG-1.3 builds the PNG script on top of these functions.

## Acceptance criteria
- Given a grid of palette indices, when gridToRgba runs, then it returns RGBA bytes of width*height*4 whose colours all come from PALETTE.
- Given an index outside the palette, when gridToRgba runs, then it throws.
- Given N equal-size frames, when buildSpriteSheet runs, then width, height and frameCount describe the sheet and every pixel colour is in PALETTE.


## Scope
- In scope: New pure modules under game/frontend/src/art
- In scope: Unit tests in game/frontend/tests
- Out of scope: PNG writing script and manifest update (SG-1.3)
- Out of scope: Authoring sprite grids
- Out of scope: New rooms, story content, backend, audio, deployment, repository clean-up
- Preserve: game/frontend/src/lib/palette.ts exports and its tests
- Preserve: Phaser ~3.90.0 pin
- Preserve: Go API contracts


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay.
- Shared palette of at most 48 colours defined once in src/lib/palette.ts; reuse it, do not redefine colours.
- All art is generated in-repo and deterministically; no downloaded art or CDN.
- Tests are unit tests with all dependencies mocked.


## Definition of done
- Both requirements are met and their Verify units pass.


## Non-functional requirements
- Functions are pure and deterministic: identical input gives identical bytes.


## Clarifying questions
- None

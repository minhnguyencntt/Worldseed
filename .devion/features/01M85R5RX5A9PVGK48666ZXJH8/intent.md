---
id: "01M85R5RX5A9PVGK48666ZXJH8"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2 Write pure grid-to-pixels and sprite-sheet functions

Context: SG-1.1 is done (game/frontend/src/lib/palette.ts exports PALETTE, 48 colours or fewer). The last check found that neither gridToRgba nor buildSpriteSheet exists in any source or test file under game/, although earlier artefacts report 16 passing tests. Desired behaviour: pure functions convert a palette-indexed grid to RGBA and lay frames out into one sheet, with unit tests for width, height, frame count, palette-only colours and out-of-range index rejection. Why: SG-1.3 (PNG script and manifest update) needs these functions.

## Acceptance criteria
- Given a palette-indexed grid, when gridToRgba runs, then the result has the grid's width and height and every pixel colour is in the shared palette
- Given a grid containing an index outside the palette range, when gridToRgba runs, then it throws
- Given N equal-size frames, when buildSpriteSheet runs, then the sheet reports frameCount N and width equal to N times the frame width
- Given the same input twice, when either function runs, then the output bytes are identical


## Scope
- In scope: game/frontend/src/lib/gridToRgba.ts
- In scope: game/frontend/src/lib/spriteSheet.ts
- In scope: unit tests under game/frontend/tests
- Out of scope: PNG generation script
- Out of scope: asset manifest update
- Out of scope: sprite source grids
- Out of scope: new rooms, story content, backend, audio, deployment, repository clean-up
- Preserve: game/frontend/src/lib/palette.ts exports
- Preserve: 480x270 constants in game/frontend/src/phaser/config.ts
- Preserve: Phaser ~3.90.0 pin and its guard tests


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix and Zustand stay
- Functions are pure and deterministic; no downloaded art, image services or CDN links
- One shared palette of at most 48 colours, defined once in palette.ts
- Tests are unit tests with all dependencies mocked
- Earlier unmerged work and .devion/worktrees are not read or copied


## Dependencies
- SG-1.1 palette module (done)


## Definition of done
- Both functions exist, are exported and typecheck
- Unit tests import them and pass


## Non-functional requirements
- Output is byte-identical on repeated runs


## Clarifying questions
- None

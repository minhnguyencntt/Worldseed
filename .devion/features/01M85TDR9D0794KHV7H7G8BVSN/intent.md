---
id: "01M85TDR9D0794KHV7H7G8BVSN"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.2 Author the boy sheet and portrait

Context: the art pipeline (draw helpers, ArtSource, generateAssets, art:generate) exists and the room grids are authored (SG-2.1). Boy art is still SVG. Desired behavior: palette-indexed grids for the boy and portrait are authored, generated to PNG by art:generate, and the manifest declares the animations with frame ranges and rates. Expected result: PNGs at declared sizes using only palette colours. Why: replaces placeholder character art. Switching content to PNGs is SG-2.3, not this intent.

## Acceptance criteria
- Given the boy sheet source, when generated, then the PNG is 448x48 holding 14 frames of 32x48
- Given the manifest, when read, then idle, walk and interact declare frame ranges 0-3, 4-9 and 10-13 with frame rates
- Given the portrait source, when generated, then the PNG is 32x32 and uses only palette colours


## Scope
- In scope: boy sheet grids
- In scope: portrait grid
- In scope: animation and origin support in generated manifest entries
- In scope: unit tests for frame counts and size
- Out of scope: switching world content to PNGs
- Out of scope: deleting SVGs
- Out of scope: BootScene animation registration changes
- Out of scope: new rooms, audio, backend
- Preserve: existing character:boy, boy-walk and boy-interact SVG entries
- Preserve: Phaser 3.90.x pin
- Preserve: 480x270 native resolution
- Preserve: shared 48-colour palette


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay
- All art is raster pixel art generated in-repo from source data by a deterministic script; no downloaded art
- One shared palette of at most 48 colours
- Tests are unit tests with all dependencies mocked


## Definition of done
- All requirements met with Act and Verify units green


## Non-functional requirements
- Generation is deterministic


## Clarifying questions
- None

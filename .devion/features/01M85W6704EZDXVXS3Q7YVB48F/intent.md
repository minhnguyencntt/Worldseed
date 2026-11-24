---
id: "01M85W6704EZDXVXS3Q7YVB48F"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2 Author inventory item icon sources and register them

Context: the last check found SG-2 unmet only because no inventory item icons exist. The art sources (game/frontend/src/art) hold the room, boy, secret door and dust grids, but nothing for items, and the manifest (game/public/assets/worlds/the-boys-room/manifest.json) has no item entries. Desired behavior: palette-indexed icon grids for at least six items (enough for the 3x2 inventory grid) are authored, generated to PNG by the existing art:generate script, registered at their declared size, and covered by the existing manifest palette and size test. Why: the SG-2 'Done when' lists inventory item icons explicitly.

## Acceptance criteria
- Given the art sources, When generateAssets runs, Then at least six ids with the prefix item/ are produced as single-frame PNGs.
- Given the committed manifest, When compared to generated entries, Then every item/ entry matches exactly and each PNG size equals its declared dimensions.
- Given every item icon frame, When converted through the palette, Then every pixel is a palette colour and no svg is referenced.


## Scope
- In scope: Item icon grid sources
- In scope: Generating the PNGs and manifest entries with art:generate
- In scope: Extending the manifest palette and size test to the icons
- Out of scope: Rendering icons in the Story Panel inventory grid
- Out of scope: New rooms, new story content, backend changes, audio, deployment, repository clean-up
- Out of scope: Rebuilding the room, boy or interface art that already exists
- Preserve: Existing ART_SOURCES entries and their committed manifest entries
- Preserve: Phaser 3.90.x pin and the existing guard tests
- Preserve: Shared palette of at most 48 colours


## Technical constraints
- All art is raster pixel art generated in the repo from source data by the deterministic art:generate script; no downloaded art or image services.
- One shared palette of at most 48 colours, defined once in game/frontend/src/lib/palette.ts.
- Tests are unit tests with all dependencies mocked.
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix and Zustand stay.


## Definition of done
- All requirements below are met and their Verify units pass.


## Non-functional requirements
- Generation is deterministic: identical input gives identical bytes.


## Clarifying questions
- None

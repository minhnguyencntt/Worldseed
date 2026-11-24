---
id: "01M85W6704S0SWJK2BNQFJ0764"
kind: requirement
parent: 01M85W6704EZDXVXS3Q7YVB48F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Six palette-indexed item icon grids exist at 16x16

Context: game/frontend/src/art/sources.ts exports ART_SOURCES from BOY_SOURCES, ROOM_SOURCES and SCENE_EXTRA_SOURCES; grids use draw.ts helpers (createGrid, fillRect, outlineRect, shadeRect, rampIndex). Desired behavior: a new itemIcons module defines six 16x16 grids (old-key, note, book, coin, flashlight, photo) with an indigo outline and ramp shading, exported as ITEM_SOURCES with ids item/<name> and spread into ART_SOURCES. Why: the 3x2 inventory grid needs icons for six items.

## Acceptance criteria
- Given ITEM_SOURCES, When listed, Then it has six sources with unique ids item/old-key, item/note, item/book, item/coin, item/flashlight and item/photo.
- Given each item source, When its frame is read, Then it is a single 16x16 grid containing the outline index and at least two ramp shades.
- Given ART_SOURCES, When listed, Then it contains all six item sources.


## Scope
- In scope: New src/art/itemIcons.ts
- In scope: Spreading ITEM_SOURCES into ART_SOURCES
- Out of scope: Inventory UI rendering
- Out of scope: Changing game state or content item definitions
- Preserve: Existing source ids and ordering of earlier sources


## Technical constraints
- Grids are pure functions built from draw.ts helpers using indices from the shared palette.
- Constraint: one shared palette of at most 48 colours.


## Dependencies
- INT


## Definition of done
- itemIcons module and ART_SOURCES wiring exist and type-check.


## Clarifying questions
- None

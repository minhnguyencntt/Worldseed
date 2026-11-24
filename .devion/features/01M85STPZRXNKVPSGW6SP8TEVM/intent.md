---
id: "01M85STPZRXNKVPSGW6SP8TEVM"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.1 Author the room shell and furniture grids

Context: game/frontend/src/art/sources.ts holds only a hand cursor grid, and src/lib/gridToRgba.ts, spriteSheet.ts and generateAssets.ts already turn grids into PNGs. The room art is still SVG. Desired behavior: source grids exist for wall, wainscot, floor, window with night sky, desk, computer, lamp, plant, poster, bookshelf with books and globe, bed, door and rug, each at a declared size, drawn with outlines and ramp shading from the shared 48-colour palette in src/lib/palette.ts. Expected result: unit tests assert each grid's size and that it uses only palette colours. Why: this is the art base for SG-2.2 and SG-2.3. Switching content and manifest to PNGs and deleting SVGs is out of scope.

## Acceptance criteria
- Given the room source registry, when it is loaded, then it contains grids for wall, wainscot, floor, window, desk, computer, lamp, plant, poster, bookshelf, bed, door and rug
- Given each source grid, when its width and height are measured, then they equal the size declared for that id
- Given each source grid, when it is rendered with gridToRgba against PALETTE, then every pixel colour is a palette colour and each grid uses at least 3 distinct palette indices


## Scope
- In scope: Pure drawing helpers
- In scope: Room shell and furniture source grids with declared sizes
- In scope: Unit tests for size and palette use
- Out of scope: Boy sheet and portrait (SG-2.2)
- Out of scope: Switching content and manifest to PNGs and deleting SVGs (SG-2.3)
- Out of scope: BootScene animation loading
- Out of scope: Inventory item icons
- Preserve: Existing ART_SOURCES cursor entry
- Preserve: generateArt CLI and manifest output
- Preserve: Existing SVG assets and manifest entries


## Technical constraints
- All art is raster pixel art generated in the repo from source data by a deterministic script; no downloaded art or CDN
- One native scene resolution of 480x270, whole-number scaling, nearest-neighbour
- One shared palette of at most 48 colours defined once in src/lib/palette.ts
- Tests are unit tests with all dependencies mocked
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix and Zustand stay


## Definition of done
- All 13 grids exist at declared sizes
- Size and palette tests pass


## Non-functional requirements
- Drawing code is deterministic and pure, so output is stable between runs


## Clarifying questions
- None

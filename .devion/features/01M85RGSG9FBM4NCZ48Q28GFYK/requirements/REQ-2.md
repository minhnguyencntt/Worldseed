---
id: "01M85RGSG95RVKMDM32QN3GP7K"
kind: requirement
parent: 01M85RGSG9FBM4NCZ48Q28GFYK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Grid sources become PNG files and manifest entries with real size and frame data

Context: no grid source files exist. Desired behavior: src/art/sources.ts exports palette-indexed grid sources (id, path, frames); a pure generateAssets turns them through gridToRgba, buildSpriteSheet and encodePng into file bytes plus manifest entries; mergeManifest replaces entries by id and keeps others. Why: gives the script a testable core.

## Acceptance criteria
- Given a source with 4 frames of 32x48, when planned, then the entry has dimensions 128x48 and frames 32,48,4 and type spritesheet
- Given a single-frame source, when planned, then the entry is type image with its dimensions
- Given a manifest holding the same id, when merged, then that entry is replaced in place and other entries stay unchanged
- Given a source with an index beyond the palette, when planned, then it throws


## Scope
- In scope: art source registry with one seed hand-cursor source
- In scope: generateAssets
- In scope: mergeManifest
- Out of scope: the room, boy and UI art sets
- Out of scope: removing placeholder SVGs
- Preserve: existing manifest entries and schema


## Technical constraints
- Sources use indices into the shared PALETTE of at most 48 colours
- Manifest entries must satisfy assetSchema in game/src/assets/manifest/schema.ts
- All art generated in-repo; no downloaded art


## Dependencies
- REQ-1


## Definition of done
- Entries validate against assetSchema


## Non-functional requirements
- Output order follows source order


## Clarifying questions
- None

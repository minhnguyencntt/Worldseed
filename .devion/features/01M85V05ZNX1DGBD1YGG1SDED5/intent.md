---
id: "01M85V05ZNX1DGBD1YGG1SDED5"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.2 Author the boy sheet and portrait

Context: game/frontend/src/art has draw helpers, room sources and a generator (scripts/generateArt.ts, src/lib/generateAssets.ts) but no boy art source, and ArtSource has no animations or origin. Desired behavior: boy sources exist, are registered in ART_SOURCES, and art:generate writes boy PNGs plus manifest entries with animation frame ranges and rates. Expected result: manifest declares the PNG sheet at 448x48 and the portrait at 32x32. Why: replaces placeholder art; switching scene content to these assets belongs to SG-2.3.

## Acceptance criteria
- Given the boy sheet source, when its frames are counted, then there are 14 frames of 32x48 using only palette indices
- Given the boy portrait source, when its grid is read, then it is 32x32 and uses only palette indices
- Given the generator, when it runs on the boy sources, then manifest entries carry animations idle 0-3, walk 4-9, interact 10-13 with frame rates, plus origin
- Given the manifest, when read, then boy sheet and portrait entries exist as PNG paths at their declared sizes and scene content is not changed


## Scope
- In scope: boy art source file
- In scope: ArtSource animations and origin fields
- In scope: generator copying them into entries
- In scope: registering boy sources in ART_SOURCES
- In scope: generated PNGs and manifest entries
- In scope: unit tests
- Out of scope: switching world content or scene to the new assets
- Out of scope: deleting SVGs
- Out of scope: new rooms, backend, audio, deployment
- Preserve: existing room sources and hand cursor source
- Preserve: existing SVG manifest entries and character:boy id
- Preserve: Phaser 3.90.x pin


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay
- All art is raster pixel art generated from source data by a deterministic script; no downloaded art
- One shared palette of at most 48 colours (src/lib/palette.ts)
- Tests are unit tests with all dependencies mocked
- Scene content stays data-driven; no hardcoded ids in scene classes


## Definition of done
- All requirements met and their Verify units pass


## Non-functional requirements
- Generation is deterministic: identical bytes on each run


## Clarifying questions
- None

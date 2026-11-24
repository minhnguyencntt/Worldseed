---
id: "01M85VQ95SNXSKJ8D6N6VPHWD2"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.3 Switch content and manifest to the PNGs and remove the SVGs

Context: SG-2.1 (room grids) and SG-2.2 (boy sheet and portrait) are done, but game/frontend/src/art/sources.ts ART_SOURCES still omits the room grids. bedroom.yaml and manifest.json still reference 320x180 SVG ids, and BootScene and the generator already exist. Desired behaviour: the scene is laid out at 480x270 from PNG ids only, BootScene preloads them with no fallback texture, and every SVG under public/assets (bedroom.svg included) is gone. Expected result: no .svg path remains in manifest or content. Why: it finishes the art replacement in SG-2.

## Acceptance criteria
- Given the committed manifest and bedroom.yaml, when their asset refs are listed, then none ends in .svg and every ref resolves to a manifest id
- Given the generated PNGs, when each is checked against the manifest, then its size equals the declared size and it uses only palette colours
- Given BootScene preload, when it runs with the real manifest, then every scene asset loads and no fallback texture is resolved
- Given the repository, when assets are listed, then no .svg file exists under game/public/assets or game/frontend/public/assets


## Scope
- In scope: Sources for the remaining scene assets, regeneration of PNGs and manifest
- In scope: Re-laid-out bedroom.yaml at 480x270 and manifest cleanup
- In scope: Vite serving game/public
- In scope: Deleting every placeholder SVG and the unused SceneView path
- Out of scope: New rooms
- Out of scope: New story content
- Out of scope: Backend changes
- Out of scope: Audio
- Out of scope: Deployment
- Out of scope: Repository clean-up
- Out of scope: Inventory icons, UI frame kit, lighting work
- Preserve: Phaser ~3.90.0 pin
- Preserve: Go API contracts and contribution flow
- Preserve: Data-driven scene building
- Preserve: Existing BootScene animation, transition and keyboard behaviour


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix and Zustand stay
- Art is raster pixel art generated deterministically in-repo; no downloaded art
- One native resolution 480x270, whole-number scaling, nearest neighbour
- Shared palette of at most 48 colours
- No object, position or asset id hardcoded in a scene class
- Tests are unit tests with dependencies mocked


## Definition of done
- All four requirements are done and verified
- No .svg remains under public/assets


## Non-functional requirements
- Generation output is byte-for-byte deterministic


## Clarifying questions
- None

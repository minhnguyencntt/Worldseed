---
id: "01M84QVS6NT825MT9PZAMASKQX"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.7 Track game/public/assets/ui icons, frames and cursors with manifest entries

Context: game/public/assets/worlds/the-boys-room/manifest.json already lists ui:icon-sound, ui:panel-frame and ui:cursor-pointer under ui/icons, ui/frames and ui/cursors. game/public/assets has no ui folder. The SVGs exist only under game/frontend/public/assets/ui. Desired behavior: each of the three folders under game/public/assets/ui holds one real pixel-art SVG tracked by git, and the manifest entries describe those files. Expected result: the folders are tracked and the manifest resolves to them. Why: git does not track empty folders, and the manifest should describe files that exist next to it.

## Acceptance criteria
- Given the repo, When game/public/assets/ui/icons, frames and cursors are listed, Then each contains at least one non-empty .svg file
- Given manifest.json, When ui:icon-sound, ui:panel-frame and ui:cursor-pointer paths are resolved under game/public/assets, Then every file exists
- Given the manifest ui entries, When validated with parseManifest, Then validation succeeds and each dimensions value equals the width and height of its SVG


## Scope
- In scope: Three new SVG files under game/public/assets/ui
- In scope: dimensions fields on the three ui manifest entries
- Out of scope: Changing the zod schema
- Out of scope: Phaser or React code
- Out of scope: Removing game/frontend/public/assets/ui
- Preserve: Existing manifest entries, ids and paths
- Preserve: Existing tests under game/tests


## Technical constraints
- SVGs must use shape-rendering="crispEdges" like the existing assets
- Manifest must still pass manifestSchema in game/src/assets/manifest/schema.ts


## Definition of done
- All requirements are met and their Verify units pass


## Non-functional requirements
- Pixel-art-friendly rendering


## Clarifying questions
- None

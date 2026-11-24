---
id: "01M85TDR9ERS48353PZ53BCKGQ"
kind: requirement
parent: 01M85TDR9D0794KHV7H7G8BVSN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Generated manifest declares boy animations with frame ranges and rates

Context: generateAssets emits image or spritesheet entries without animations or origin, and mergeManifest replaces by id. ART_SOURCES holds only the cursor. Desired: ArtSource optionally carries animations and origin, generateAssets copies them, and ART_SOURCES includes the boy sources so npm run art:generate writes PNGs and manifest entries. Expected: manifest has character:boy-art (448x48, idle 0-3, walk 4-9, interact 10-13) and character:boy-portrait (32x32). Why: Done-when requires the manifest to declare animations.

## Acceptance criteria
- Given a source with animations and origin, when generateAssets runs, then the entry includes them unchanged
- Given the committed manifest, when parsed with parseManifest, then it is valid and idle, walk, interact have frames [0-3], [4-9], [10-13] with frameRates
- Given ART_SOURCES, when listed, then it contains the boy sheet and portrait ids


## Scope
- In scope: ArtSource fields
- In scope: generateAssets
- In scope: ART_SOURCES
- In scope: manifest.json regeneration
- Out of scope: content switching to PNG
- Out of scope: SVG removal
- Preserve: existing manifest entries and SVG paths
- Preserve: deterministic output
- Preserve: sources without animations behave as before


## Technical constraints
- Deterministic generation script; no downloaded art
- Keep data-driven content; no ids hardcoded in scenes


## Dependencies
- R1
- R2


## Definition of done
- npm run art:generate produces PNGs and a valid manifest


## Non-functional requirements
- Identical bytes on repeated runs


## Clarifying questions
- None

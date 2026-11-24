---
id: "01M84Q7129MC8MC7ZVV11YBNPW"
kind: requirement
parent: 01M84Q71292X7V428FS4Q7E80Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Asset folder structure holds real temporary pixel-art files

Context: no game/public/assets exists. Desired behavior: create worlds/the-boys-room/{backgrounds,furniture,objects,characters,effects,audio} and ui/{icons,frames,cursors}, each with at least one real temporary asset (SVG, plus a short WAV for audio). Expected result: no empty folders or gray placeholders. Why: gives the manifest real files to reference.

## Acceptance criteria
- Given game/public/assets, when listed, then worlds/the-boys-room has the 6 required subfolders and ui has icons, frames and cursors
- Given each folder, when read, then it contains at least one non-empty file
- Given each SVG, when read, then it starts with an svg root element


## Scope
- In scope: new asset files under game/public/assets
- Out of scope: production art
- Preserve: frontend/public/assets/bedroom.svg


## Technical constraints
- Original temporary assets only, no stock images
- Pixel-art style using shape-rendering crispEdges


## Definition of done
- Folders and files exist and are committed


## Non-functional requirements
- Each asset under 20 KB


## Clarifying questions
- None

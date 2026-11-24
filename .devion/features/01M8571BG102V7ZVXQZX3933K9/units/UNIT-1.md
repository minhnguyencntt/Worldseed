---
id: "01M8571BG2KXM8GWDV0KBVZTAD"
kind: unit
parent: 01M8571BG1Z6MXACQGF82N8C51
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove the duplicate SceneObject import from BootScene.ts

Delete line 14 of BootScene.ts, which repeats the import on line 12.

## Acceptance criteria
- Given BootScene.ts, when read, then one SceneObject import exists
- Given the file, when compiled, then no duplicate import error occurs


## Scope
- In scope: BootScene.ts imports
- Out of scope: Other changes
- Preserve: Other imports


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Line 14 removed


## Clarifying questions
- None

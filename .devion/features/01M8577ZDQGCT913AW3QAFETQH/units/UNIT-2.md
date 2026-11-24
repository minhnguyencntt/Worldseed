---
id: "01M8577ZDRW5F1TRWB3D8NM6GE"
kind: unit
parent: 01M8577ZDRZP710VNXCDDB4HMB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove the duplicate sceneObjects field from BootScene

Delete line 23 of BootScene.ts, which repeats the field on line 22. No other code changes.

## Acceptance criteria
- Given the BootScene class, when members are listed, then `sceneObjects` is declared once.
- Given the edit, when the file is compiled, then no duplicate member error for sceneObjects is reported.


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts class fields
- Out of scope: Tests
- Out of scope: Other files
- Preserve: Other class fields and methods


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- L23 duplicate field deleted


## Clarifying questions
- None

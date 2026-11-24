---
id: "01M8571BG2643GQXA70RRHRDE9"
kind: unit
parent: 01M8571BG1B79QXNM7TZDEB19T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove the duplicate sceneObjects field from BootScene

Delete line 23 of BootScene.ts, which repeats the field on line 22.

## Acceptance criteria
- Given BootScene.ts, when read, then one private sceneObjects field exists
- Given the class, when compiled, then no duplicate member error occurs


## Scope
- In scope: BootScene field list
- Out of scope: Logic changes
- Preserve: effects, failed, unsubscribe fields


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Line 23 removed


## Clarifying questions
- None

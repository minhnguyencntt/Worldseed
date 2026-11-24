---
id: "01M85B0RB8Z24X01KF1ADJWSVX"
kind: unit
parent: 01M85B0RB8BGHZHPABD17NWAH3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm validateWorld checks every scene character id

Read validateWorld in game/src/content/loader.ts and confirm the scene characters loop exists and builds the path message. Edit only if it is missing or differs.

## Acceptance criteria
- validateWorld iterates scene.characters ?? []
- The message format is scenes[<sceneId>].characters[<i>].id: unknown character <id>


## Scope
- In scope: game/src/content/loader.ts validateWorld
- Out of scope: Tests
- Preserve: Other validateWorld checks


## Technical constraints
- Keep the error string unchanged
- Code path: `game/src/content/loader.ts`


## Definition of done
- Loop present with the exact message


## Clarifying questions
- None

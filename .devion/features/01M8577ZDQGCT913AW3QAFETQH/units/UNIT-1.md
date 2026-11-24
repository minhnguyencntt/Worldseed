---
id: "01M8577ZDRG91KHQNAQP6BVX1R"
kind: unit
parent: 01M8577ZDR33SP7JF0SV575XBT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove the duplicate SceneObject import from BootScene.ts

Delete line 14 of BootScene.ts, which repeats the import on line 12. No other code changes.

## Acceptance criteria
- Given BootScene.ts, when imports are listed, then `import type { SceneObject }` appears once.
- Given the edit, when the file is compiled, then no duplicate identifier error for SceneObject is reported.


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts import block
- Out of scope: Tests
- Out of scope: Other files
- Preserve: Remaining imports


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- L14 duplicate import deleted


## Clarifying questions
- None

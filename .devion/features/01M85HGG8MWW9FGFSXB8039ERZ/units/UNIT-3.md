---
id: "01M85HGG8NM4KQCWJG4YYGH67B"
kind: unit
parent: 01M85HGG8MGN0HY726W3BARVXN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm BootScene pushes store changes into every SceneObject

Read-only confirmation of the existing store to scene path; no behavior change expected unless the path is broken.

## Acceptance criteria
- create subscribes to useGameStore and calls onStateChange
- onStateChange syncs every object and ignores null state


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Tests
- Preserve: Current sync behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-3


## Definition of done
- Path confirmed; fix only if broken


## Clarifying questions
- None

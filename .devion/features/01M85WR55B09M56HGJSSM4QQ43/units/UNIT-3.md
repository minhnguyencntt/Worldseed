---
id: "01M85WR55CFN9JBVGSA3YX47BM"
kind: unit
parent: 01M85WR55C7STPY6BDWCWEK484
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add destroyEffects and use it in the BootScene shutdown handler

Export destroyEffects from buildEffects.ts and call it from BootScene SHUTDOWN instead of the inline forEach.

## Acceptance criteria
- destroyEffects destroys all handles even if one throws
- BootScene shutdown calls it


## Scope
- In scope: buildEffects.ts
- In scope: BootScene.ts
- Out of scope: effect rendering
- Preserve: transition skipping


## Technical constraints
- Phaser 3.90.x
- Code path: `game/src/engine/buildEffects.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ3
- ACT1


## Definition of done
- BootScene typechecks


## Clarifying questions
- None

---
id: "01M84Y610YR0EJFMZZACJ0QRK8"
kind: unit
parent: 01M84Y610YJGG7YY50HM7J1AKZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Call playSceneTransition from BootScene.create

Import playSceneTransition and call it in BootScene.create with the shared effect context.

## Acceptance criteria
- create() invokes playSceneTransition(ctx, scene).
- Existing shutdown cleanup is unchanged.


## Scope
- In scope: BootScene.ts
- Out of scope: effectContext.ts
- Preserve: Shutdown handler


## Technical constraints
- Depends on ACT1 helper
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- BootScene type-checks


## Clarifying questions
- None

---
id: "01M85WR55C7STPY6BDWCWEK484"
kind: requirement
parent: 01M85WR55B09M56HGJSSM4QQ43
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · buildEffects places all effects on the effects layer and a helper destroys them on shutdown

Context: BootScene SHUTDOWN handler loops handles with forEach. Desired: export destroyEffects(handles) from buildEffects.ts that destroys every handle and tolerates a throwing handle so the others are still destroyed; BootScene calls it. Why: Phaser effects created from content must be destroyed on shutdown.

## Acceptance criteria
- Given handles where one destroy throws, when destroyEffects runs, then every other handle's destroy is still called
- Given a scene with six non-transition effects, when buildEffects runs, then each createEffect call carries depth layerDepth('effects')
- Given BootScene shutdown, when it fires, then destroyEffects is called with the created handles


## Scope
- In scope: game/src/engine/buildEffects.ts
- In scope: game/frontend/src/phaser/BootScene.ts shutdown handler
- Out of scope: new effect types
- Preserve: buildEffects skipping transition specs


## Technical constraints
- Phaser stays on 3.90.x


## Dependencies
- REQ1


## Definition of done
- BootScene uses destroyEffects


## Clarifying questions
- None

---
id: "01M858C7X8QXGRG2F0HHAHXKGD"
kind: requirement
parent: 01M858C7X83660B1TAD16SFCD5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Effect context tests call createPhaserEffectContext with both arguments

Context: createPhaserEffectContext(scene, resolveKey) requires two arguments but bootSceneEffects.test.ts calls it with one at lines 114 and 123. Desired behavior: the factory exposes a named ResolveKey type and tests pass a typed mock. Expected result: no TS2554 in that file. Why: clears the unmet check.

## Acceptance criteria
- Given effectContext.ts, when imported, then it exports a ResolveKey type equal to (id: string) => string
- Given the effects tests, when run, then each call passes a typed resolveKey mock and all pass


## Scope
- In scope: game/frontend/src/phaser/effectContext.ts
- Out of scope: BootScene.ts
- Preserve: createEffect behavior for dust and ambientLight


## Technical constraints
- Phaser 3.90 APIs only


## Definition of done
- TS2554 cleared


## Clarifying questions
- None

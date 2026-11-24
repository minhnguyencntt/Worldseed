---
id: "01M8583P0BC0NQP6EHBK88YW04"
kind: unit
parent: 01M8583P0BN54TJ4DK2D4FCJE7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export ResolveKey type and exhaust the effect switch in effectContext

Add an exported ResolveKey type to effectContext.ts and use it for the resolveKey parameter, so tests can build a typed mock.

## Acceptance criteria
- Given effectContext.ts, When imported, Then ResolveKey is an exported type (id: string) => string
- Given createEffect, When called, Then behavior is unchanged


## Scope
- In scope: effectContext.ts
- Out of scope: tests
- Preserve: effect behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Definition of done
- ResolveKey exported and used by createPhaserEffectContext


## Clarifying questions
- None

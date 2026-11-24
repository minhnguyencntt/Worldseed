---
id: "01M857F2G2WRRGY6NTCXE2JZ5W"
kind: unit
parent: 01M857F2G2ZY5PP9Q73T6NRSDC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Name the resolveKey type in effectContext

Export a ResolveKey type alias so tests and BootScene share the second-argument contract of createPhaserEffectContext.

## Acceptance criteria
- Given effectContext.ts, When imported, Then ResolveKey is exported as (id: string) => string
- Given createPhaserEffectContext, When called, Then it still takes (scene, resolveKey)


## Scope
- In scope: effectContext.ts
- Out of scope: runtime changes
- Preserve: function signature


## Technical constraints
- Type-only change
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Definition of done
- ResolveKey exported and used in the signature


## Clarifying questions
- None

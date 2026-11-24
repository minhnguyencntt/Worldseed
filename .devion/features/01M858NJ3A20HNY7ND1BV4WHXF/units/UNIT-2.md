---
id: "01M858NJ3AWPEMXH68ECDC6C5R"
kind: unit
parent: 01M858NJ3AWSRV3YDCD17Q7R56
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Make createEffect switch exhaustive

Add a default branch after the transition case in createEffect so every path returns or throws.

## Acceptance criteria
- Switch has a default branch that throws
- tsc reports no TS2366 for effectContext.ts


## Scope
- In scope: game/frontend/src/phaser/effectContext.ts
- Out of scope: Other cases
- Preserve: dust, ambientLight, transition behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Definition of done
- default branch throws for unknown type


## Clarifying questions
- None

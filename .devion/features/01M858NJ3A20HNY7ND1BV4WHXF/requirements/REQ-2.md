---
id: "01M858NJ3AWSRV3YDCD17Q7R56"
kind: requirement
parent: 01M858NJ3A20HNY7ND1BV4WHXF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · effectContext createEffect returns on every path

createEffect in game/frontend/src/phaser/effectContext.ts switches on spec.type but tsc reports TS2366 because no return follows the switch. Make the switch exhaustive with a never check so every path returns an EffectHandle.

## Acceptance criteria
- Given a dust, ambientLight or transition spec, when createEffect runs, then it returns a handle with destroy
- Given an unknown spec type, when createEffect runs, then it throws an error naming the type


## Scope
- In scope: createEffect default branch
- Out of scope: Particle or light parameters
- Preserve: Existing dust, ambientLight and transition behavior


## Technical constraints
- No new dependencies


## Definition of done
- TS2366 gone for effectContext.ts


## Clarifying questions
- None

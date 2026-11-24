---
id: "01M84VT0J3FT7MQ6AD4P0FVQEY"
kind: unit
parent: 01M84VT0J2MQ5R0R8VA6XDK46D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Normalise invalid dpr in computeZoom

Guard dpr at the top of computeZoom in config.ts.

## Acceptance criteria
- Invalid dpr behaves as 1
- Valid inputs unchanged


## Scope
- In scope: computeZoom
- Out of scope: tests
- Preserve: Signature


## Technical constraints
- Code path: `game/frontend/src/phaser/config.ts`


## Definition of done
- Guard added


## Clarifying questions
- None

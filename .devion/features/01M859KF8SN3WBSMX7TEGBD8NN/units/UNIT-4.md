---
id: "01M859KF8TNP41ZR7016G3KHAB"
kind: unit
parent: 01M859KF8TY8NF7FBN1G9AWZQ1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add secret-door-open object and strict save validation

Add a flag-visible secret door object and validate element types in deserializeState.

## Acceptance criteria
- secret-door-open visible only when secret_door_open is true
- deserializeState rejects non-string items and non-boolean flags


## Scope
- In scope: bedroom.yaml object
- In scope: persistence.ts
- Out of scope: Tests
- Preserve: serializeState
- Preserve: Save key


## Technical constraints
- localStorage only
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- Code path: `game/src/state/persistence.ts`


## Dependencies
- REQ4


## Definition of done
- Object and validation implemented


## Clarifying questions
- None

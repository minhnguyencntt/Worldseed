---
id: "01M84RQWF9RFHFH12K86F1K37V"
kind: unit
parent: 01M84RQWF91CA862C18A1JHBHA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Document the Phaser 3.90 target in createGame

Confirm createGame uses only 3.90 APIs and annotate the seam; fix any compile error found after the pin.

## Acceptance criteria
- createGame compiles on 3.90 types
- Signature unchanged


## Scope
- In scope: createGame.ts
- Out of scope: config changes
- Preserve: createGame signature


## Technical constraints
- Code path: `game/frontend/src/phaser/createGame.ts`


## Dependencies
- REQ2


## Definition of done
- tsc passes on 3.90


## Clarifying questions
- None

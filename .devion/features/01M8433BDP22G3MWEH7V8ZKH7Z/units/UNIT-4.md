---
id: "01M8433BDQAHZP8634MCXQMFHC"
kind: unit
parent: 01M8433BDP6JFG7XDFDRN9291R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement state serialization with validation

Add persistence module over GameState.

## Acceptance criteria
- Given state, when round-tripped, then equal.
- Given invalid input, when parsed, then it throws.


## Scope
- In scope: persistence module
- Out of scope: tests


## Technical constraints
- No I/O
- New file: `backend/game/src/state/persistence.ts`


## Dependencies
- REQ-PS
- ACT-RT


## Definition of done
- Typechecks


## Clarifying questions
- None

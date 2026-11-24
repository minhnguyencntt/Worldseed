---
id: "01M8433BDQ9MM5DHX0PCRTC9PW"
kind: unit
parent: 01M8433BDP6JFG7XDFDRN9291R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: State persistence unit tests

Test serialization and the bookshelf door persistence using real bedroom content read from disk.

## Acceptance criteria
- Given round trip, then deep equality.
- Given restored state, then bookshelf open is true.


## Scope
- In scope: backend/game/tests/persistence.test.ts


## Technical constraints
- No storage APIs


## Dependencies
- ACT-PS


## Definition of done
- Tests pass


## Clarifying questions
- None

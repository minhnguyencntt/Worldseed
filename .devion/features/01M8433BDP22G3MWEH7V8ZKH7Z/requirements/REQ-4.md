---
id: "01M8433BDP6JFG7XDFDRN9291R"
kind: requirement
parent: 01M8433BDP22G3MWEH7V8ZKH7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Persistent world state serialization

Context: state is plain data. Desired behavior: serializeState/deserializeState convert GameState to and from JSON with validation, and the scene view reflects restored flags. Expected result: opening the secret door, saving, restoring and returning to the room shows it still open. Why: the world must remember meaningful actions.

## Acceptance criteria
- Given a state, when serialized and deserialized, then the result deep-equals the original.
- Given malformed JSON or missing fields, when deserialized, then an error is thrown.
- Given the bookshelf searched, when state is round-tripped and getSceneView is called, then bookshelf open is true.


## Scope
- In scope: backend/game/src/state/persistence.ts
- Out of scope: browser storage, backend save API


## Technical constraints
- Pure JSON string conversion, no storage access


## Dependencies
- REQ-RT


## Definition of done
- Round trip works


## Clarifying questions
- None

---
id: "01M85A0HWE8BS8GCVX8EKAX1GQ"
kind: unit
parent: 01M85A0HWE2692Y9TFJTH9C94R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: characterSchema interaction unit tests

Add schema tests proving interaction parsing, defaults and errors.

## Acceptance criteria
- Interaction parses with defaulted events.
- Missing interaction passes.
- Bad dialogue type yields a path-tagged error.


## Scope
- In scope: game/tests/contentSchema.test.ts
- Out of scope: product code
- Preserve: Existing tests


## Technical constraints
- Pure schema tests, no I/O


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M84TCKGGDGXK81QNJ2Q7BA29"
kind: unit
parent: 01M84TCKGG2QAK2T72921KGZN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: guard fails while any dependency path is tracked

Unit tests for assertNoTrackedNodeModules with mocked file listings.

## Acceptance criteria
- Throws when tracked
- Passes when clean


## Scope
- In scope: tests/trackedNodeModules.test.ts
- Out of scope: Real git
- Preserve: Other tests


## Definition of done
- Tests pass


## Clarifying questions
- None

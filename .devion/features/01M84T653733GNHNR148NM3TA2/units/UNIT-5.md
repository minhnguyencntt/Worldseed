---
id: "01M84T6537TTHDFGGZN902Z65D"
kind: unit
parent: 01M84T6537GC5YKDGR64QW90RD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: untrackNodeModules cleanup unit tests with a fake git runner

Unit tests using a vi.fn git runner.

## Acceptance criteria
- rm called with --cached and roots
- No rm when clean
- No --force argument passed


## Scope
- In scope: tests/untrackNodeModules.test.ts
- Out of scope: Real git


## Dependencies
- a2


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M84TT5ZH4E13P2RXDS5DDG8Q"
kind: unit
parent: 01M84TT5ZH2T6Z6RW33GMF67VH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: parseGitLsFiles and checkTrackedFiles unit tests and typed existing tests

Tests prove REQ1 and fix the implicit-tuple type errors at tests/trackedNodeModules.test.ts lines 53, 68-69, 81.

## Acceptance criteria
- parseGitLsFiles drops empty entries.
- checkTrackedFiles returns dependency and vitest-cache paths via fake runner.
- tsc reports no errors in tests/trackedNodeModules.test.ts.


## Scope
- In scope: game/frontend/tests/trackedNodeModules.test.ts
- Out of scope: real git
- Preserve: existing test cases


## Technical constraints
- Fake runner only


## Definition of done
- Tests pass and typecheck clean for this file


## Clarifying questions
- None

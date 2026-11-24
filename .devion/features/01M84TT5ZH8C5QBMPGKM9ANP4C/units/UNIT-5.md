---
id: "01M84TT5ZJ2QZCQGRBZPSF8BYM"
kind: unit
parent: 01M84TT5ZHQ5HYQS101RYKC1NG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: runGuard and guard script unit tests with a fake git runner

Tests prove REQ2 using fake runners and a log spy; script presence checked on disk.

## Acceptance criteria
- runGuard returns 1 and logs offenders.
- runGuard returns 0 for clean listing.
- Script file exists and imports runGuard.


## Scope
- In scope: game/frontend/tests/assertNoTrackedGuard.test.ts
- Out of scope: running real git


## Technical constraints
- Fake runner; file read via node:fs of the script path only


## Definition of done
- Tests pass


## Clarifying questions
- None

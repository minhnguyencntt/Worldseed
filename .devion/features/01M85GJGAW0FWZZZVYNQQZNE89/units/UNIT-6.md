---
id: "01M85GJGAY72HH8D6G1QM9ENWT"
kind: unit
parent: 01M85GJGAX6WNQ3PBKGMXZJ5KD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History loading, empty, error and list unit tests

Write game/frontend/tests/contributionSheetHistory.test.tsx covering loading, empty, error with Retry and populated list.

## Acceptance criteria
- Four state tests pass
- No real network is used


## Scope
- In scope: One new test file
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- fetch stubbed; GET url is /api/v1/player/me/contributions?round_id=round-1 per listMine in game/frontend/src/api/client.ts


## Definition of done
- Command passes


## Clarifying questions
- None

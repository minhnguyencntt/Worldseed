---
id: "01M85GJGAXZN4850E5N8KKFTZH"
kind: unit
parent: 01M85GJGAX0FQ3YQN6Y02GB5SQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Submit success, API error and quota exhausted unit tests

Write game/frontend/tests/contributionSheetSubmit.test.tsx with fetch stubbed, covering success, 500, 409 and quota exhausted.

## Acceptance criteria
- Success, 500, 409 and quota tests pass
- No real network is used


## Scope
- In scope: One new test file
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- Reuse the stubFetch and json helper pattern from game/frontend/tests/contributionDialog.test.tsx


## Definition of done
- Command passes


## Clarifying questions
- None

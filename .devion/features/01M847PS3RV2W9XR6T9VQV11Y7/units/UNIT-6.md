---
id: "01M847PS3S7SGEGRRS8PGMS44C"
kind: unit
parent: 01M847PS3RT4DY71541RXZRA22
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Contribution sheet submission flow unit tests

Write TDD unit tests with vi.stubGlobal fetch for ContributionSheet and the client contribution calls.

## Acceptance criteria
- Submit posts world_id and prompt
- 429 shows error and failed entry
- Remaining count and close note render
- 401 triggers session then retry


## Scope
- In scope: game/frontend/tests/contribution.test.tsx
- In scope: tests/fixtures/api.ts
- Out of scope: Real server


## Technical constraints
- fetch mocked; no network


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None

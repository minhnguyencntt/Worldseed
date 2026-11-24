---
id: "01M85G4W6B59ZYEE97BJ8MG67W"
kind: unit
parent: 01M85G4W6A2QMKXHZ6BTZWSBYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History loading and empty message test ids unit tests

Add unit tests with mocked listMine asserting the loading and empty test ids.

## Acceptance criteria
- Pending listMine shows contribution-history-loading and no contribution-success
- Resolved empty list shows contribution-history-empty


## Scope
- In scope: tests/contributionHistoryStatus.test.tsx
- In scope: tests/contributionHistoryEmpty.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock ../src/api/client; fixtures in tests/fixtures/api.ts mirror the client types


## Definition of done
- Tests pass


## Clarifying questions
- None

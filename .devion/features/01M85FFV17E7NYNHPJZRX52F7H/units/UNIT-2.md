---
id: "01M85FFV17TCJJKYP7ZD5MH1E8"
kind: unit
parent: 01M85FFV17K3T244ATYVPT4QAF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Loading message only during in-flight history and 401-retry test still passes

Add unit tests for ContributionSheet history loading visibility, with listMine mocked, and re-run the existing 401-retry test.

## Acceptance criteria
- Test asserts the loading text is absent when roundId is ''
- Test asserts loading text and list both present while listMine is pending
- Existing 401-retry test passes unchanged


## Scope
- In scope: New test file for loading visibility
- In scope: Running tests/contribution.test.tsx
- Out of scope: Product code changes
- Preserve: Existing test files


## Technical constraints
- listMine and submitContribution are mocked via vi.mock of ../src/api/client as in tests/contributionHistoryStatus.test.tsx; no network


## Definition of done
- New tests pass
- tests/contribution.test.tsx passes


## Clarifying questions
- None

---
id: "01M85DHGKTAP4J7SSMHZJDGP14"
kind: unit
parent: 01M85DHGKSJBH3MSY772BM1TN0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota inline message unit tests

Write unit tests from REQ1 using mocked listMine and submitContribution.

## Acceptance criteria
- Message visible with 5 history entries
- Message absent with 1 history entry


## Scope
- In scope: New test file contributionQuota.test.tsx
- Out of scope: Product code
- Preserve: Existing contribution tests


## Technical constraints
- Mock ../src/api/client like tests/contributionMaxLength.test.tsx; no network


## Definition of done
- Tests pass


## Clarifying questions
- None

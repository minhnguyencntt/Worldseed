---
id: "01M85F81SHJMYDV00RVGVTJQF8"
kind: unit
parent: 01M85F81SG6PB1WC0F7KBQJF4P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History Retry via reload counter unit tests

Test Retry re-calls listMine and recovers.

## Acceptance criteria
- Retry calls listMine twice and ends ready
- No Retry outside error


## Scope
- In scope: New test file
- Out of scope: Visual checks
- Preserve: Existing tests


## Technical constraints
- listMine mocked; no network


## Dependencies
- A2


## Definition of done
- Tests pass


## Clarifying questions
- None

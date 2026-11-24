---
id: "01M85F81SH1CNY9VHWB077ZMC4"
kind: unit
parent: 01M85F81SGRD4T42R33VF5ST2K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History effect ignores settles after cancellation unit tests

Test that late resolve/reject after close or round change write nothing.

## Acceptance criteria
- Late reject after close shows no error
- Late resolve after roundId change adds no entries


## Scope
- In scope: New test file
- Out of scope: Browser checks
- Preserve: Existing tests


## Technical constraints
- Deferred promises controlled in test; listMine mocked


## Dependencies
- A3


## Definition of done
- Tests pass


## Clarifying questions
- None

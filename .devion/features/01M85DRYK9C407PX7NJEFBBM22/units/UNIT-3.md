---
id: "01M85DRYKAVPPR638A8T33TCPX"
kind: unit
parent: 01M85DRYK9TT2Y2TQ6WMFMEP5W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota inline message unit tests

Write TDD-style tests for the zero-quota message with submitContribution and listMine mocked.

## Acceptance criteria
- Test asserts message present with 5 sent entries
- Test asserts message absent with 1 sent entry


## Scope
- In scope: New test file for zero-quota message
- Out of scope: Product code changes
- Preserve: Existing contribution tests


## Technical constraints
- Mock ../src/api/client like contributionMaxLength.test.tsx; no real network


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M847PS3SRQD6QECDQAXX7KX0"
kind: unit
parent: 01M847PS3RZ83V58BTZXP3B0XH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Approve and retry action unit tests

Unit tests for the action buttons with stubbed fetch.

## Acceptance criteria
- Approve POST
- Approve click sends the POST request for the Retry action too: Retry POST is covered by its own test
- No buttons otherwise
- A 409 message is shown in an alert


## Scope
- In scope: game/frontend/tests/actions.test.tsx


## Technical constraints
- fetch mocked


## Dependencies
- ACT-5


## Definition of done
- Tests pass


## Clarifying questions
- None

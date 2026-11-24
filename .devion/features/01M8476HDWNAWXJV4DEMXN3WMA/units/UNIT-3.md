---
id: "01M8476HDXCD07SQYKWKBDSTP0"
kind: unit
parent: 01M8476HDWN1RYXFMM6X9SRQJ6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin round routes reject missing and wrong tokens unit tests

Extend server_test.go with wrong-token coverage for the round routes using httptest and a temp dir.

## Acceptance criteria
- Round routes return 401 without a token.
- Round routes return 401 with 'Bearer wrong'.


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Live server
- Preserve: Existing tests


## Technical constraints
- httptest only


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None

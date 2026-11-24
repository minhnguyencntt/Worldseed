---
id: "01M846R0M8HAF76Z21SAJJ585Y"
kind: unit
parent: 01M846R0M8HFZ1BM55EJHAMCC3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin round route wiring unit tests

Run and extend server tests using httptest handlers and a temp repo; no live ports.

## Acceptance criteria
- Routes not 404 with token
- 401 without token
- NewScheduler uses configured interval


## Scope
- In scope: internal/server/server_test.go


## Technical constraints
- httptest only


## Definition of done
- Tests pass


## Clarifying questions
- None

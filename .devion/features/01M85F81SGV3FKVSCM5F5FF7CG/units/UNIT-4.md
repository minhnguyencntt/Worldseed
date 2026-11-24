---
id: "01M85F81SHMRB506PBN4AT961R"
kind: unit
parent: 01M85F81SG7AXQZJ73AQGRSVE8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History loading, ready and error status unit tests

Test loading, ready and error rendering with listMine mocked.

## Acceptance criteria
- Loading shown while pending
- Error alert on rejection


## Scope
- In scope: New test file
- Out of scope: App-level tests
- Preserve: Existing contribution tests


## Technical constraints
- Mock ../api/client with vi.mock; no network


## Dependencies
- A1


## Definition of done
- Tests pass


## Clarifying questions
- None

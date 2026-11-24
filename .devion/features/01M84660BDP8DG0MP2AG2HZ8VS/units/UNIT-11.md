---
id: "01M84660BF2C3EMZWCQDG389DS"
kind: unit
parent: 01M84660BEZPC2XDFBY1T7XRA5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin round handlers and route auth unit tests

Test status mapping with a fake RoundService and auth on the mounted router.

## Acceptance criteria
- Create 201, Close 200, illegal transition 409, unknown 404
- Router without token returns 401 for each admin round route


## Scope
- In scope: backend/internal/admin/rounds_test.go
- In scope: backend/internal/server/server_test.go
- Out of scope: real git


## Technical constraints
- httptest; server test uses config with t.TempDir repo path


## Dependencies
- A5


## Definition of done
- Tests pass


## Clarifying questions
- None

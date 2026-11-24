---
id: "01M84660BFQEB5XS24NGPPM784"
kind: unit
parent: 01M84660BE665CCS8GD3MBY7ZX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin auth middleware and config unit tests

Cover missing, wrong, empty and correct credentials plus config defaults.

## Acceptance criteria
- Missing/wrong/empty-token cases return 401 and next is not called
- Correct token calls next with 200
- Config defaults and env override asserted


## Scope
- In scope: backend/internal/admin/middleware_test.go
- In scope: backend/internal/config/config_test.go


## Technical constraints
- httptest.NewRecorder; config via LoadFS with fstest.MapFS and fake getenv


## Dependencies
- A4


## Definition of done
- Tests pass


## Clarifying questions
- None

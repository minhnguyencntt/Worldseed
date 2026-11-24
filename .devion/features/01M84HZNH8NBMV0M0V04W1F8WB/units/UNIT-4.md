---
id: "01M84HZNH9HECQ7Q6RKY354QXF"
kind: unit
parent: 01M84HZNH8B0HE5VKZZK5Y7B52
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Execution, approve and retry routes are absent and admin table is round-only unit tests

Add tests in server_test.go using New with a temp-dir config and the shared adminRoundRoutes table; no real server or network.

## Acceptance criteria
- Execution/approve/retry paths with the admin token return 404 or 405
- adminRoundRoutes has exactly five round routes


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- httptest recorder only; t.TempDir for repo


## Definition of done
- New tests pass


## Clarifying questions
- None

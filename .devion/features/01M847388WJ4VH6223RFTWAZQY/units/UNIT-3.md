---
id: "01M847388XXTASV1Q95JEB3MKN"
kind: unit
parent: 01M847388WXGP6KNXQ9HBGKD8K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin round route auth and mounting unit tests

Run and, where absent, add tests in server_test.go that exercise the admin round routes with an in-memory httptest recorder and a temp dir repo.

## Acceptance criteria
- Missing token returns 401 on each route
- Bearer tok returns a non-404 response on each route


## Scope
- In scope: backend/internal/server/server_test.go
- Out of scope: Real server or ports
- Preserve: Existing tests


## Technical constraints
- httptest only, temp dir filesystem


## Definition of done
- Tests pass


## Clarifying questions
- None

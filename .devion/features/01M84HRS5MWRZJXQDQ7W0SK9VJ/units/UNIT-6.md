---
id: "01M84HRS5NJ66SVAHTCBWT72DY"
kind: unit
parent: 01M84HRS5MQHFTDGXJG2YDETKM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin routes are round-only and no execution import remains unit tests

server_test.go imports internal/execution and calls adminRoutes; update it to adminRoundRoutes and drop execution token cases.

## Acceptance criteria
- Given server.New, when walked with chi.Walk, then admin routes equal adminRoundRoutes exactly.
- Given all round admin routes, when called without or with wrong token, then 401.
- Given backend Go files, when scanned, then none import internal/execution.


## Scope
- In scope: backend/internal/server/server_test.go
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: live server
- Preserve: TestAdminRoundRoutes_Table


## Technical constraints
- Server built with httptest and t.TempDir() repo path


## Definition of done
- Server package tests pass


## Clarifying questions
- None

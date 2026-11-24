---
id: "01M8476HDWNAWXJV4DEMXN3WMA"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4 · Admin route tests prove every admin endpoint rejects missing and wrong tokens

Context: server.New mounts /api/v1/admin behind admin.Middleware(cfg.Admin.Token). TestNew_AdminRoundsRequireToken in backend/internal/server/server_test.go covers only the five round endpoints and only the missing-token case; GET /executions, POST /executions/{id}/retry and POST /executions/{id}/approve and the wrong-token case are untested. Desired behavior: one route table feeds both registration and the tests, so no admin endpoint can be added unprotected or untested. Expected result: missing and wrong tokens give 401 on all 8 admin endpoints. Why: admin APIs must be protected.

## Acceptance criteria
- Given a server with admin.token 'tok', when any of the 8 admin endpoints is called without an Authorization header, then the response is 401.
- Given the same server, when any of the 8 admin endpoints is called with 'Authorization: Bearer wrong', then the response is 401.
- Given the same server, when POST /executions/{id}/retry and POST /executions/{id}/approve carry 'Bearer tok', then the response is not 401.
- Given the admin route table, when the chi router is walked, then every registered /api/v1/admin route appears in the table.


## Scope
- In scope: Admin route table in server.go
- In scope: Server-level auth unit tests for round and execution endpoints
- Out of scope: Changing admin.Middleware behavior
- Out of scope: Frontend or worker changes
- Out of scope: Running a live server
- Preserve: Existing admin route paths and handlers
- Preserve: Existing server tests passing


## Technical constraints
- Go, chi router, no database
- Tests use httptest with temp dir repo, no network


## Definition of done
- All acceptance criteria asserted by passing unit tests
- go test ./internal/server passes


## Non-functional requirements
- Tests finish in seconds


## Clarifying questions
- None

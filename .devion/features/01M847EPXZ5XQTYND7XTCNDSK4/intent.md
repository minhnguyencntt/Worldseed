---
id: "01M847EPXZ5XQTYND7XTCNDSK4"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.6 · Admin round endpoints are provably mounted behind the admin token

Context: server.New registers admin round routes from adminRoundRoutes under /api/v1/admin behind admin.Middleware. TestNew_AdminRoundsAreMounted only asserts status != 404, which is weak. Desired behavior: unit tests assert the exact status each mounted round endpoint returns with the admin token. Expected result: a missing mount or a broken handler mapping fails a test. Why: SG-5.6 requires proof that the endpoints are mounted when called with the admin token.

## Acceptance criteria
- Given a server with admin token tok and an on-disk round, when GET /api/v1/admin/rounds/ROUND-0000001?world=the-boys-room is sent with Bearer tok, then the response is 200 with the round JSON
- Given the same server, when GET /api/v1/admin/rounds/ROUND-9999999?world=the-boys-room is sent with Bearer tok, then the response is 404 from the handler
- Given the same server, when POST /api/v1/admin/rounds is sent with Bearer tok and an invalid JSON body, then the response is 400


## Scope
- In scope: Exact-status mount tests in backend/internal/server/server_test.go
- In scope: Exact-status handler tests in backend/internal/admin/rounds_test.go
- Out of scope: New endpoints
- Out of scope: Frontend, worker and game changes
- Preserve: adminRoundRoutes table
- Preserve: admin.Middleware behavior
- Preserve: Existing passing tests


## Technical constraints
- Go tests with httptest and a temp dir only
- No real Git, network or live ports


## Definition of done
- Both new test groups pass
- go test ./internal/server ./internal/admin passes


## Clarifying questions
- None

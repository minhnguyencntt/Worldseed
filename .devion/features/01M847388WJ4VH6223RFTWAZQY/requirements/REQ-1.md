---
id: "01M847388WXGP6KNXQ9HBGKD8K"
kind: requirement
parent: 01M847388WJ4VH6223RFTWAZQY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round endpoints are mounted behind the admin token

Context: server.New registers POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id} and GET /rounds/{id}/contributions inside r.Route("/api/v1/admin") with admin.Middleware(cfg.Admin.Token). Desired behavior: each route reaches its admin.RoundHandler method only with a valid bearer token. Expected result: unauthenticated calls get 401, authenticated calls reach the handler. Why: protects round control from the public.

## Acceptance criteria
- Given no Authorization header, when POST /api/v1/admin/rounds is called, then status is 401
- Given Bearer tok and an existing round, when GET /api/v1/admin/rounds/ROUND-0000001 is called, then status is not 404


## Scope
- In scope: Admin round route registration in server.New
- Out of scope: Handler logic changes
- Preserve: Executions routes in the same admin group


## Technical constraints
- Routes stay under admin.Middleware


## Definition of done
- Five round routes registered in the admin group


## Non-functional requirements
- Admin token never logged


## Clarifying questions
- None

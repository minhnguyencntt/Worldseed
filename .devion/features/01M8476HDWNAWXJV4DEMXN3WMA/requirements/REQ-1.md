---
id: "01M8476HDWN1RYXFMM6X9SRQJ6"
kind: requirement
parent: 01M8476HDWNAWXJV4DEMXN3WMA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round endpoints are registered from a route table and reject missing and wrong tokens

Context: round routes are registered inline in server.New (server.go L101-L111). Desired behavior: a table of adminRoute{Method, Pattern, Handler} drives registration so tests can iterate the same list. Expected result: missing and wrong bearer tokens yield 401 on every round route.

## Acceptance criteria
- Given the round route table, when built, then it lists POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id}, GET /rounds/{id}/contributions.
- Given a server with token 'tok', when a round route is called with no token or 'Bearer wrong', then the response is 401.


## Scope
- In scope: adminRoute type and round entries in server.go
- Out of scope: Execution routes
- Out of scope: Middleware changes
- Preserve: Route paths and handler behavior


## Technical constraints
- Keep admin.Middleware applied to the /api/v1/admin group


## Definition of done
- Round routes registered from the table
- Unit tests pass


## Clarifying questions
- None

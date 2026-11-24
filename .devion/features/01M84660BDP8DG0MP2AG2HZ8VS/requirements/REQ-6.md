---
id: "01M84660BE081E4HSVB040CJ4S"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin execution list, retry and approve endpoints

Context: no execution model exists. Desired behavior: development/executions/<id>.yaml records (id, world_id, round_id, status, error, updated_at); GET /api/v1/admin/executions lists them; POST executions/{id}/retry moves FAILED to QUEUED; POST executions/{id}/approve moves AWAITING_APPROVAL to APPROVED; changes committed via Git. Expected result: admin can retry and approve.

## Acceptance criteria
- Given stored executions, when GET list, then all are returned as JSON
- Given a FAILED execution, when retry, then status QUEUED; otherwise 409
- Given an AWAITING_APPROVAL execution, when approve, then status APPROVED; otherwise 409
- Given an unknown or unsafe id, when retry or approve, then 404; no token gives 401


## Scope
- In scope: backend/internal/execution package
- In scope: execution routes in server.go
- Out of scope: Worker execution logic
- Preserve: admin round routes


## Technical constraints
- Validate id with safepath.Segment; atomic write then Committer.Commit


## Dependencies
- R4


## Definition of done
- Routes live


## Clarifying questions
- None

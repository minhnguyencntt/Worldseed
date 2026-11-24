---
id: "01M8476HDXDHJR0X9BXE4PVW8F"
kind: requirement
parent: 01M8476HDWNAWXJV4DEMXN3WMA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin execution endpoints incl. retry and approve are registered from the table and reject missing and wrong tokens

Context: execution routes (list, retry, approve) are registered inline in server.go L103-L105 and have no server-level auth test. Desired behavior: they are entries in the same table. Expected result: 401 for missing and wrong tokens, not 401 for the correct token.

## Acceptance criteria
- Given the route table, when built, then it also lists GET /executions, POST /executions/{id}/retry, POST /executions/{id}/approve.
- Given a server with token 'tok', when an execution route is called with no token or 'Bearer wrong', then the response is 401.
- Given the same server, when retry and approve are called with 'Bearer tok', then the response is not 401.


## Scope
- In scope: Execution entries in the route table
- Out of scope: Execution handler logic
- Preserve: execution.Handler behavior


## Technical constraints
- Reuse the table from REQ1


## Dependencies
- REQ1


## Definition of done
- Execution routes registered from the table
- Unit tests pass


## Clarifying questions
- None

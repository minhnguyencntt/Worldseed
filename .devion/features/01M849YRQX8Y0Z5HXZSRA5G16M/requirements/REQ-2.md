---
id: "01M849YRQX7EE9BD4HCXA67Z5S"
kind: requirement
parent: 01M849YRQX8Y0Z5HXZSRA5G16M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Reject failures and ids are handled by the client and AdminApp

Context: rejectExecution uses encodeURIComponent on the id and AdminApp shows actionError and actionDetail on non-401 failures. Reject-specific failure display and id encoding are untested. Desired behavior: both are asserted by unit tests.

## Acceptance criteria
- Given id 'a/b c', when rejectExecution is called, then fetch receives '/api/v1/admin/executions/a%2Fb%20c/reject'
- Given Reject returns 500 {error:'boom'}, then the Execution region shows 'boom' in an alert


## Scope
- In scope: rejectExecution URL encoding
- In scope: Reject failure display
- Out of scope: Backend
- Preserve: Existing reject tests


## Technical constraints
- Mocked fetch only


## Definition of done
- Both tests pass


## Clarifying questions
- None

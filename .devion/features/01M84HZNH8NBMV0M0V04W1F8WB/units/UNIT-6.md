---
id: "01M84HZNH97Y89KXH91WCH9JC4"
kind: unit
parent: 01M84HZNH8Y4N1DJ9PKBDWM6JH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Server package has no execution or worker references and tests stay green unit tests

Extend removed_code_test.go so scanning server sources also rejects execution handler identifiers, and run the package tests.

## Acceptance criteria
- Scan fails on internal/execution, storyforge/worker or ExecutionHandler in server sources
- Package tests pass


## Scope
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: product code
- Preserve: existing guard tests


## Technical constraints
- Filesystem reads only


## Definition of done
- Guards pass


## Clarifying questions
- None

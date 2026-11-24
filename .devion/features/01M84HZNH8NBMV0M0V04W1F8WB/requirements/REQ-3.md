---
id: "01M84HZNH8Y4N1DJ9PKBDWM6JH"
kind: requirement
parent: 01M84HZNH8NBMV0M0V04W1F8WB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Server tests have no execution cases, pass with mocked dependencies and guard against reintroduction

Context: server_test.go and removed_code_test.go already cover kept routes and scan for removed imports. Desired behavior: no execution route test remains, tests use temp dirs and a fake git, and the guard tests assert absence of internal/execution and storyforge/worker. Expected result: go test ./internal/server is green. Why: proof the removal is complete.

## Acceptance criteria
- Given server_test.go, when searched, then no test names or exercises execution, approve or retry routes
- Given go test ./internal/server, when run, then all tests pass using only temp dirs and no network
- Given a reintroduced execution import, when the guard test runs, then it fails


## Scope
- In scope: backend/internal/server/server_test.go
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: other packages' tests
- Preserve: existing kept-route tests


## Technical constraints
- Tests mock Git and use t.TempDir


## Definition of done
- Server tests green


## Clarifying questions
- None

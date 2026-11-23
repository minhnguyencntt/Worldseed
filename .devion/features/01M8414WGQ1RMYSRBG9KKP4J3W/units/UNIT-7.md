---
id: "01M8414WGS5H96JYKP42Z167W8"
kind: unit
parent: 01M8414WGR9EE5R9VNW4JSS6WM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Backend config LoadFS and healthz unit tests

Context: ACT-BE added LoadFS and NewRouter without tests.
Desired behavior: Unit-test config decoding and /healthz with MapFS and httptest; no live server Listen.
Expected result: go test filtered to LoadFS and NewRouter tests passes.
Why: Proves REQ-BE config and wiring ACs with mocked FS/HTTP.

## Acceptance criteria
- Given MapFS containing valid YAML, when LoadFS reads config.yaml, then Addr is :8080 and RepoPath is .
- Given MapFS missing server.addr, when LoadFS runs, then it returns a non-nil error.
- Given NewRouter, when httptest GET /healthz, then status is 200 and body is ok.


## Scope
- In scope: config_test.go
- In scope: router_test.go
- Out of scope: Starting the server process
- Out of scope: Integration tests against real ports
- Preserve: Production LoadFS/NewRouter signatures from ACT-BE


## Technical constraints
- Use testing/fstest.MapFS and httptest only
- No network, no real Git


## Dependencies
- ACT-BE


## Definition of done
- Unit tests exist and filtered go test commands pass


## Clarifying questions
- None

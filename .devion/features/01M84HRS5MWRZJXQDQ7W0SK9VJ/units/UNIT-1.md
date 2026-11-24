---
id: "01M84HRS5MEKZ8AC5017D9GP39"
kind: unit
parent: 01M84HRS5MC28D5H7Q4PN6JQCH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Delete the backend/worker module

Delete the entire backend/worker directory: go.mod, go.sum, configs/config.example.yaml and internal/{poller,config,recovery,runner,lock,provider,report,logging,store}.

## Acceptance criteria
- Given the change, when backend/worker is listed, then it does not exist.
- Given backend/, when searched for the worker go.mod, then none is found.


## Scope
- In scope: backend/worker
- Out of scope: backend/internal
- Preserve: backend/go.mod


## Technical constraints
- Code path: `backend/worker/go.mod`
- Code path: `backend/worker/go.sum`
- Code path: `backend/worker/configs/config.example.yaml`
- Code path: `backend/worker/internal/runner/runner.go`
- Code path: `backend/worker/internal/poller/poller.go`
- Code path: `backend/worker/internal/config/config.go`
- Code path: `backend/worker/internal/recovery/recovery.go`
- Code path: `backend/worker/internal/recovery/locks.go`
- Code path: `backend/worker/internal/lock/lock.go`
- Code path: `backend/worker/internal/provider/provider.go`
- Code path: `backend/worker/internal/provider/claude.go`
- Code path: `backend/worker/internal/provider/mock.go`
- Code path: `backend/worker/internal/report/report.go`
- Code path: `backend/worker/internal/logging/logging.go`
- Code path: `backend/worker/internal/store/store.go`


## Definition of done
- Directory deleted


## Clarifying questions
- None

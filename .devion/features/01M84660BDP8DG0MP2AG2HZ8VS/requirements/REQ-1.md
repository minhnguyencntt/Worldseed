---
id: "01M84660BEVMZGCSHF8R8048NY"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Round model with 13 statuses, transition table and round.yaml store

Context: world.Round only reads id/number/status/times. Desired behavior: a round package defines statuses SCHEDULED, OPEN, CLOSED, ANALYZING, PLANNING, DEVELOPING, TESTING, BUILDING, PUBLISHING, COMPLETED, FAILED, CANCELLED, RECOVERING, a transition table, and a FileStore reading and writing worlds/<world>/rounds/<round-lowercase>/round.yaml. Expected result: illegal transitions are rejected. Why: single source of truth for the lifecycle.

## Acceptance criteria
- Given status SCHEDULED, when transitioning to OPEN, then it succeeds; to CLOSED it returns ErrIllegalTransition
- Given a saved round, when Get is called, then the same fields are returned including base_release and freeze_commit
- Given an unsafe world or round id, when Get or Save is called, then an error is returned and nothing is written


## Scope
- In scope: backend/internal/round/round.go
- In scope: backend/internal/round/store.go
- Out of scope: open/close logic
- Out of scope: HTTP
- Preserve: worlds/<world>/rounds/<round>/ path convention used by contribution.FileStore


## Technical constraints
- Validate ids with safepath.Segment
- Write via temp file then os.Rename


## Definition of done
- round package compiles with table and store


## Non-functional requirements
- Atomic writes


## Clarifying questions
- None

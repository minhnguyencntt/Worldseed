---
id: "01M84660BEQ74KWCS162YP6YGC"
kind: unit
parent: 01M84660BEVMZGCSHF8R8048NY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement round model, transition table and FileStore

Create the round package: Status type and 13 constants, Round struct with yaml tags, Transitions map, CanTransition and Round.Transition, and FileStore with Get, Save and List.

## Acceptance criteria
- Transitions follow SCHEDULED→OPEN|CANCELLED, OPEN→CLOSED|CANCELLED, CLOSED→ANALYZING|FAILED|CANCELLED, ANALYZING→PLANNING|FAILED, PLANNING→DEVELOPING|FAILED, DEVELOPING→TESTING|FAILED, TESTING→BUILDING|FAILED, BUILDING→PUBLISHING|FAILED, PUBLISHING→COMPLETED|FAILED, FAILED→RECOVERING|CANCELLED, RECOVERING→ANALYZING|FAILED|CANCELLED
- COMPLETED and CANCELLED have no outgoing transitions
- FileStore.Save never leaves a partial round.yaml


## Scope
- In scope: backend/internal/round/round.go
- In scope: backend/internal/round/store.go
- Out of scope: lifecycle service
- Preserve: safepath.Segment


## Technical constraints
- Round dir is worlds/<world>/rounds/<strings.ToLower(id)>
- New file: `backend/internal/round/round.go`
- New file: `backend/internal/round/store.go`


## Dependencies
- R1


## Definition of done
- go build ./internal/round succeeds


## Clarifying questions
- None

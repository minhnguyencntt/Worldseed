---
id: "01M84GTRQQ06BV0BD9E0B0VPKZ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.8 · Round poller behind a mocked Git interface

Context: backend/worker/internal has config, store, lock, runner, recovery and report packages but no poller. The backend round.Service.Close already writes snapshot.yaml, records FreezeCommit and moves a Round to CLOSED. Desired behavior: a new poller package pulls the repository through a Git interface, lists the Rounds of the World, reports SCHEDULED and CLOSED Rounds, and closes OPEN Rounds whose end time has passed through a Closer interface that mirrors round.Service.Close. Expected result: unit tests with a fake Git, fake Closer and fake clock prove detection, closing and error handling. Why: Phase 5 needs the worker to see closed Rounds and freeze expired ones.

## Acceptance criteria
- Given a Git fake returning SCHEDULED, OPEN and CLOSED Rounds, when Poll runs, then Result.Scheduled and Result.Closed list the matching Round IDs.
- Given an OPEN Round whose EndsAt is not after the clock time, when Poll runs, then Closer.Close is called once for it and its ID is in Result.ClosedNow and Result.Closed.
- Given Git pull fails, when Poll runs, then Poll returns a wrapped error and calls neither ListRounds nor Close.
- Given Close fails for one Round, when Poll runs, then the other Rounds are still processed and the error is returned.


## Scope
- In scope: New package backend/worker/internal/poller with Git, Closer and Clock interfaces and Poller.Poll
- In scope: Unit tests with fakes
- Out of scope: Real Git CLI implementation
- Out of scope: Starting executions from detected Rounds
- Out of scope: Changes to backend/internal/round
- Out of scope: Poll loop wiring in a worker main
- Preserve: backend/internal/round Close and snapshot behavior
- Preserve: Existing worker packages and tests


## Technical constraints
- Go 1.22 module github.com/worldseed/storyforge/worker; no new third-party dependencies
- The poller must not import backend/internal packages; the Closer interface mirrors round.Service.Close(ctx, worldID, roundID) error
- No database or queue


## Definition of done
- All acceptance criteria are covered by unit tests that pass with go test ./internal/poller


## Non-functional requirements
- Poll is deterministic and uses only the injected clock


## Clarifying questions
- None

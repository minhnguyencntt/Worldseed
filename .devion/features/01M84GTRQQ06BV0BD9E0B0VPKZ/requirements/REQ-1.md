---
id: "01M84GTRQQXRR9X1JEZ5CSEJ6C"
kind: requirement
parent: 01M84GTRQQ06BV0BD9E0B0VPKZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Poll detects SCHEDULED and CLOSED Rounds through a Git interface

Context: no poller exists. Desired behavior: Poller.Poll calls Git.Pull then Git.ListRounds(worldID) and returns Result with Scheduled and Closed ID slices in list order. Expected result: the worker can see which Rounds are waiting to open and which are ready for development. Why: later phases start executions from CLOSED Rounds.

## Acceptance criteria
- Given Rounds R1 SCHEDULED, R2 OPEN (not expired) and R3 CLOSED, when Poll runs, then Result.Scheduled is [R1] and Result.Closed is [R3].
- Given no Rounds, when Poll runs, then Result slices are empty and the error is nil.
- Given Poll runs, then Git.Pull is called before Git.ListRounds exactly once each.


## Scope
- In scope: Round, Status, Git, Clock, Result, Poller, New, Poll detection
- Out of scope: Closing Rounds
- Preserve: Existing worker packages


## Technical constraints
- Standard library only


## Definition of done
- Detection behavior implemented in backend/worker/internal/poller/poller.go


## Clarifying questions
- None

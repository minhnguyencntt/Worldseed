---
id: "01M84ESEAH23C7FD1XQ8E9VC2H"
kind: requirement
parent: 01M84ESEAGPPDS6300VDZMTFWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker detects scheduled and closed Rounds via a Git interface and closes expired Rounds with an immutable snapshot

Context: backend round.Service.Close writes snapshot.yaml (Snapshot/SnapshotEntry, mode 0444, never overwritten), records HEAD as freeze_commit and moves to CLOSED. Desired behavior: rounds.Poller pulls through a Git interface, lists worlds/<world>/rounds/*/round.yaml, reports SCHEDULED and CLOSED Rounds and closes OPEN Rounds whose EndsAt is not after the injected clock. Expected result: identical snapshot contract. Why: the Worker must close Rounds even when the backend is down.

## Acceptance criteria
- Given Rounds in SCHEDULED, OPEN and CLOSED status, when Detect runs, then scheduled and closed lists are returned
- Given an OPEN Round with EndsAt <= fake now, when CloseExpired runs, then snapshot.yaml exists with mode 0444, Git Commit and Head are called, and round.yaml has status CLOSED, freeze_commit and closed_at
- Given an existing snapshot.yaml, when CloseExpired runs, then it is not overwritten and an error is returned
- Given an OPEN Round not yet expired, when CloseExpired runs, then nothing changes


## Scope
- In scope: worker/internal/rounds
- Out of scope: Git CLI implementation details beyond the interface
- Preserve: Backend snapshot.yaml field names: round, world, frozen_at, contributions[id, player, created_at, prompt_sha256]


## Technical constraints
- Git interface: Pull, Commit, Head, Contributions; clock injected


## Dependencies
- R1


## Definition of done
- Poller and closer implemented per contract


## Non-functional requirements
- Path segments sanitized


## Clarifying questions
- None

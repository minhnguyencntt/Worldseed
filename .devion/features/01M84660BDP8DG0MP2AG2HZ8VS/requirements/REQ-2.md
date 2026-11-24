---
id: "01M84660BE5RVDJJE111293XQ2"
kind: requirement
parent: 01M84660BDP8DG0MP2AG2HZ8VS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Open and close rounds with frozen snapshot and recorded Git commit SHA

Context: no code creates, opens or closes rounds. Desired behavior: Open records start/end (24h default) and base release; Close writes snapshot.yaml once listing contributions, commits it, records the exact SHA from the Git interface, sets CLOSED; frozen rounds reject new contribution files. Expected result: contribution snapshot is immutable. Why: the Worker needs a stable input.

## Acceptance criteria
- Given a SCHEDULED round, when opened with no duration, then ends_at = starts_at + 24h and base_release is recorded
- Given an OPEN round, when closed, then snapshot.yaml lists its contributions, freeze_commit equals the SHA returned by Head, status is CLOSED
- Given snapshot.yaml exists, when FileStore.Save is called for that round, then ErrFrozen is returned and no file is created
- Given a round that is not OPEN, when closed, then ErrIllegalTransition is returned and no snapshot is written


## Scope
- In scope: round/lifecycle.go
- In scope: round/snapshot.go
- In scope: gitrepo Head
- In scope: contribution ListByRound and frozen guard
- Out of scope: scheduler
- Out of scope: HTTP
- Preserve: Committer.Commit behaviour
- Preserve: contribution Save semantics for open rounds


## Technical constraints
- snapshot written with O_EXCL and mode 0o444
- Git access only through the gitrepo interface


## Dependencies
- R1


## Definition of done
- Lifecycle service compiles


## Non-functional requirements
- Serialize lifecycle operations with a mutex


## Clarifying questions
- None

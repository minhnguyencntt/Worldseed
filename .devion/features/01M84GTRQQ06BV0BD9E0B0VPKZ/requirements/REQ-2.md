---
id: "01M84GTRQQ9YRC2H0ESABRFGYK"
kind: requirement
parent: 01M84GTRQQ06BV0BD9E0B0VPKZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Poll closes expired OPEN Rounds through the snapshot-freezing Closer

Context: round.Service.Close writes the immutable snapshot and moves the Round to CLOSED. Desired behavior: for every OPEN Round with !clock.Now().Before(EndsAt), Poll calls Closer.Close(ctx, worldID, roundID); on success the ID is added to Result.ClosedNow and Result.Closed. Expected result: expired Rounds are frozen without the poller touching contribution files. Why: contributions must freeze at the Round end.

## Acceptance criteria
- Given an OPEN Round with EndsAt equal to or before the clock time, when Poll runs, then Close is called once with that world and round ID.
- Given an OPEN Round with EndsAt after the clock time, when Poll runs, then Close is not called.
- Given a successful close, then the ID appears in Result.ClosedNow and Result.Closed.


## Scope
- In scope: Closer interface and expiry check in Poll
- Out of scope: Snapshot writing, which stays in backend/internal/round
- Preserve: round.Service.Close


## Technical constraints
- Time comes only from the injected Clock


## Definition of done
- Expiry closing implemented in poller.go


## Clarifying questions
- None

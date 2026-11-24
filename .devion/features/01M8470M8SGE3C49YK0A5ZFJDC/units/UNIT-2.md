---
id: "01M8470M8TGW06PB29A17157KT"
kind: unit
parent: 01M8470M8T8AH3QDGD1YGYRJ1G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Tick skips non-due rounds and continues after Controller errors

The Tick loop appends wrapped errors to errs and continues, returning errors.Join(errs...). Rounds with other statuses or future boundaries match no case. This unit keeps that code correct and changes nothing unless the Verify unit finds a mismatch.

## Acceptance criteria
- Given Open fails for one round, when Tick runs, then the loop still processes the remaining rounds.
- Given a round matching no case, when Tick runs, then no Controller call is made.


## Scope
- In scope: backend/internal/round/scheduler.go error aggregation in Tick
- Out of scope: tests
- Preserve: fmt.Errorf %w wrapping
- Preserve: errors.Join result


## Technical constraints
- No early return inside the round loop on Controller errors
- Code path: `backend/internal/round/scheduler.go`


## Definition of done
- Open and Close errors are appended to errs and the loop continues
- go build ./internal/round/ succeeds


## Clarifying questions
- None

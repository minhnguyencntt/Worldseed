---
id: "01M8470M8T8AH3QDGD1YGYRJ1G"
kind: requirement
parent: 01M8470M8SGE3C49YK0A5ZFJDC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tick ignores future rounds and rounds in other statuses and keeps closing after an open failure

Context: Tick skips rounds not matching either case and collects errors in errs, returning errors.Join(errs...). Desired behavior: failure to open one round never prevents closing another. Expected result: Tick returns an error wrapping the open error while Close still runs. Why: a stuck round must not block expiry of others.

## Acceptance criteria
- Given future SCHEDULED, future OPEN and COMPLETED rounds, when Tick runs before the boundary, then no Controller call is made.
- Given Open returns an error for one round, when Tick runs, then Close is still called for an expired OPEN round.
- Given Open returns an error, when Tick returns, then errors.Is(err, openErr) is true.


## Scope
- In scope: Skip logic and error aggregation in Tick
- Out of scope: Run loop logging
- Preserve: errors.Join return value
- Preserve: error wrapping with %w


## Technical constraints
- Do not return early from the per-round loop on a Controller error


## Definition of done
- Skip and continue-on-error behavior matches the acceptance criteria


## Clarifying questions
- None

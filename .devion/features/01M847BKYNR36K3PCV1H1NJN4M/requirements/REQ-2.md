---
id: "01M847BKYNAX95A6GF0D0DPGT3"
kind: requirement
parent: 01M847BKYNR36K3PCV1H1NJN4M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tick returns an Open failure and still closes another due round

Context: Tick appends errors to a slice and returns errors.Join(errs...) after the loop. Desired behavior: an Open error is wrapped and returned while Close for another due round still runs. Expected result: errors.Is(err, openErr) is true and both calls are recorded. Why: one failing round must not block another round from closing.

## Acceptance criteria
- Given Open returns an error for a due SCHEDULED round, when Tick runs, then the returned error satisfies errors.Is with that error
- Given an expired OPEN round listed after the failing round, when Tick runs, then Close is still called for it and calls are open then close in order


## Scope
- In scope: Error collection and joining in Tick
- Out of scope: Retry of failed opens
- Preserve: Error wrapping with %w in the open and close messages


## Technical constraints
- Use errors.Join and fmt.Errorf with %w


## Definition of done
- Error behavior is confirmed in scheduler.go and covered by a test


## Clarifying questions
- None

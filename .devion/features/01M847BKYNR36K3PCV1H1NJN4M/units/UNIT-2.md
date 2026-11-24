---
id: "01M847BKYN7NXN4408MQVNZ6DQ"
kind: unit
parent: 01M847BKYNAX95A6GF0D0DPGT3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Tick collects errors and continues after a Controller failure

Tick appends wrapped errors and returns errors.Join. Read it and make it match; change nothing if it already does. Result: an Open failure is returned and later rounds are still processed.

## Acceptance criteria
- Tick never returns early from the rounds loop on an Open or Close error
- The returned error wraps the Controller error so errors.Is matches it


## Scope
- In scope: Error handling in Scheduler.Tick
- Out of scope: Scheduler.Run logging
- Preserve: Error messages prefixed with round: open and round: close


## Technical constraints
- Use fmt.Errorf with %w and errors.Join
- Code path: `backend/internal/round/scheduler.go`


## Definition of done
- Error handling matches REQ2


## Clarifying questions
- None

---
id: "01M847BKYNW1055D6RR2MFASDW"
kind: unit
parent: 01M847BKYNAX95A6GF0D0DPGT3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Tick open failure is returned and Close still runs unit tests

A fakeController with openErr set is used with a due SCHEDULED round and an expired OPEN round in one world.

## Acceptance criteria
- Tick error satisfies errors.Is(err, openErr)
- Calls are open due-scheduled then close expired-open


## Scope
- In scope: backend/internal/round/scheduler_test.go
- Out of scope: Run loop
- Preserve: Existing fakes


## Technical constraints
- Fakes only


## Definition of done
- The test passes


## Clarifying questions
- None

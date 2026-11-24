---
id: "01M84GTRQR9XX4Z9YW2DJ8HJFJ"
kind: unit
parent: 01M84GTRQQXRR9X1JEZ5CSEJ6C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Poll detection of SCHEDULED and CLOSED Rounds unit tests

Write backend/worker/internal/poller/poller_detect_test.go with fakeGit (records call order, returns configured Rounds/errors), fakeCloser (records calls) and fakeClock types shared by the other poller tests.

## Acceptance criteria
- Scheduled and Closed IDs are returned as specified.
- Empty list yields empty slices.
- Pull is called before ListRounds once each.


## Scope
- In scope: backend/worker/internal/poller/poller_detect_test.go
- Out of scope: Product code changes
- Preserve: Product code


## Technical constraints
- All dependencies faked; no filesystem or network


## Definition of done
- Tests pass


## Clarifying questions
- None

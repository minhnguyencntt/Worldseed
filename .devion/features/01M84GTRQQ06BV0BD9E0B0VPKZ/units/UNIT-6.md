---
id: "01M84GTRQS19HETTP35T0VJ2GZ"
kind: unit
parent: 01M84GTRQQK8R24MTCWDEJ1FDF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Poll error handling unit tests

Write backend/worker/internal/poller/poller_errors_test.go reusing the fakes from poller_detect_test.go.

## Acceptance criteria
- Pull and list failures abort with wrapped errors.
- Close failure does not stop other Rounds.
- Nil Closer returns an error without panic.


## Scope
- In scope: backend/worker/internal/poller/poller_errors_test.go
- Out of scope: Product code changes
- Preserve: Product code


## Technical constraints
- All dependencies faked


## Definition of done
- Tests pass


## Clarifying questions
- None

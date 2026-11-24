---
id: "01M84F6TVGHJDPGZ0HP7E1B03V"
kind: unit
parent: 01M84F6TVF51QHAYQEF92ECA62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Logger unit tests

Test logging.New with a bytes.Buffer.

## Acceptance criteria
- JSON line asserted
- Level filter asserted
- Unknown level error asserted


## Scope
- In scope: backend/worker/internal/logging/logging_test.go
- Out of scope: product code


## Technical constraints
- bytes.Buffer writer only


## Definition of done
- tests pass


## Clarifying questions
- None

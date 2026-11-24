---
id: "01M84G51W36TNKRD23QVPFJFN1"
kind: unit
parent: 01M84G51W2EJHJ0AEQGPQSQQNZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm report writing and error precedence in Runner.Run

Read Run and confirm start and finished come from r.now, reporting is skipped when reporter is nil, and the reporter error is returned only when err == nil. No product change is expected.

## Acceptance criteria
- Given runner.go, When read, Then StartedAt and FinishedAt use r.now
- Given runner.go, When read, Then the reporter error is returned only when err == nil


## Scope
- In scope: runner.go Run
- Out of scope: Tests
- Preserve: Report fields


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Code confirmed; go build succeeds


## Clarifying questions
- None

---
id: "01M84GAF91STPB09PZYJSX9XTF"
kind: unit
parent: 01M84GAF91Y0QK308WA23FXPDX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export ErrTimeout and wrap it in runAttempt

Add a package-level ErrTimeout next to ErrBudgetExceeded and make runAttempt wrap it with the original deadline error when the attempt context expired while the parent context is still live.

## Acceptance criteria
- runAttempt returns an error satisfying errors.Is for both ErrTimeout and context.DeadlineExceeded when the attempt deadline fires
- runAttempt does not add ErrTimeout when the parent ctx is already done


## Scope
- In scope: backend/worker/internal/runner/runner.go
- Out of scope: tests
- Preserve: Other error paths


## Technical constraints
- Keep Go signature of runAttempt unchanged
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- ErrTimeout declared with doc comment and applied in runAttempt
- go build ./... passes


## Clarifying questions
- None

---
id: "01M84GAF91Y0QK308WA23FXPDX"
kind: requirement
parent: 01M84GAF91N1GX4GCAHGZ5WEWE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A timed-out agent attempt returns ErrTimeout and is retried then marked FAILED

Context: runAttempt wraps each agent call in context.WithTimeout but the resulting error is a bare context.DeadlineExceeded. Desired: export ErrTimeout and wrap it (alongside DeadlineExceeded) when an attempt times out so callers and tests can identify it. Expected: with MaxRetries 1 the agent runs twice and the execution ends FAILED with ErrTimeout. Why: operators need a distinguishable timeout failure.

## Acceptance criteria
- Given the agent blocks and Timeout is 20ms and MaxRetries is 1, When Run is called, Then agent.calls is 2
- Given the same setup, When Run returns, Then errors.Is(err, ErrTimeout) and errors.Is(err, context.DeadlineExceeded) are both true and the stored status is FAILED
- Given the parent context is cancelled before timeout, When an attempt ends, Then the error does not wrap ErrTimeout


## Scope
- In scope: ErrTimeout var and wrapping in runAttempt
- Out of scope: Config changes
- Preserve: DeadlineExceeded still matches via errors.Is


## Technical constraints
- Go multiple %w wrapping already used in runner.go


## Definition of done
- ErrTimeout exported and wrapped only on attempt deadline


## Clarifying questions
- None

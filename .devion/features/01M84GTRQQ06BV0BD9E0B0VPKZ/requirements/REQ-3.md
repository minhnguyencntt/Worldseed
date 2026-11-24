---
id: "01M84GTRQQK8R24MTCWDEJ1FDF"
kind: requirement
parent: 01M84GTRQQ06BV0BD9E0B0VPKZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Poll aborts on Git failures and keeps going after a Close failure

Context: the worker polls repeatedly and must survive partial failures. Desired behavior: a Pull error returns Result{} and an error wrapping the cause with prefix 'poller: pull'; a ListRounds error returns 'poller: list rounds'; a Close failure is collected with errors.Join as 'poller: close <id>' while remaining Rounds are processed and the failed ID is excluded from Closed. A nil Closer with an expired Round yields an error instead of a panic.

## Acceptance criteria
- Given Pull returns an error, when Poll runs, then the error satisfies errors.Is against it and ListRounds and Close are not called.
- Given ListRounds returns an error, then Poll returns it wrapped and Close is not called.
- Given two expired Rounds where the first Close fails, then the second is still closed, the returned error wraps the first failure and Result.Closed lacks the first ID.
- Given a nil Closer and an expired Round, then Poll returns an error and does not panic.


## Scope
- In scope: Error handling in Poll
- Out of scope: Retry or backoff
- Preserve: Detection and closing behavior


## Technical constraints
- Use fmt.Errorf with %w and errors.Join


## Definition of done
- Error semantics implemented in poller.go


## Clarifying questions
- None

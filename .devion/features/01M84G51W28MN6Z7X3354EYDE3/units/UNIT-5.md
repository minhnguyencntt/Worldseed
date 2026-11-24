---
id: "01M84G51W32492RKNZXM20JBKH"
kind: unit
parent: 01M84G51W24BAPC1XEW2ZNS6ZD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lock held and per-attempt timeout unit tests

Add tests in a new file using fakeAgent, fakeTrees and the temp-dir rig from newRunner; no real Git or provider.

## Acceptance criteria
- Given the lock file exists, When Run is called, Then the lock file still exists and the store has no record
- Given a blocking agent, Timeout 20ms and MaxRetries 1, When Run is called, Then calls is 2 and error wraps context.DeadlineExceeded


## Scope
- In scope: runner_lock_timeout_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Same package runner


## Definition of done
- Both tests pass


## Clarifying questions
- None

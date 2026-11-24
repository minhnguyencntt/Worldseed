---
id: "01M84G51W24BAPC1XEW2ZNS6ZD"
kind: requirement
parent: 01M84G51W28MN6Z7X3354EYDE3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Lock held and per-attempt timeout are proven by unit tests

Context: Run takes lock.Acquire(LockPath) and runAttempt wraps each attempt in context.WithTimeout. Desired behavior: when the lock is held Run fails with lock.ErrLocked leaving the foreign lock file and the store untouched; with retries each attempt times out independently. Why: only one execution per World and bounded run time.

## Acceptance criteria
- Given the lock file exists, When Run is called, Then the lock file still exists afterwards and no execution record is stored
- Given a blocking agent, Timeout 20ms and MaxRetries 1, When Run is called, Then the agent ran twice and the error wraps context.DeadlineExceeded


## Scope
- In scope: Lock and timeout behavior of Runner.Run
- Out of scope: Lock package internals
- Preserve: Existing TestRunLocked and TestRunTimeout


## Technical constraints
- Use fakeAgent block mode


## Definition of done
- Lock and timeout tests pass


## Clarifying questions
- None

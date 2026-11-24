---
id: "01M84GAF91YHBCPRJZQFKHDMBG"
kind: requirement
parent: 01M84GAF91N1GX4GCAHGZ5WEWE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Run stops after MaxRetries failures, marks FAILED and removes the worktree once

Context: the loop in Runner.run breaks when attempt > MaxRetries, then saves FAILED and calls trees.Remove once. Desired: this is proven for MaxRetries 2 with the removal count asserted. Why: stray worktrees or double removal would corrupt later runs.

## Acceptance criteria
- Given MaxRetries is 2 and all calls fail, When Run is called, Then agent.calls is 3
- Given the same setup, When Run returns, Then the stored status is FAILED, the stored error contains the last error text and trees.removed has exactly one entry equal to WorkRoot/EXEC-1


## Scope
- In scope: Confirm retry loop and failure cleanup path in runner.go
- Out of scope: Backoff between retries
- Preserve: Failure path order: Save FAILED then Remove


## Definition of done
- Retry loop and cleanup verified unchanged and correct


## Clarifying questions
- None

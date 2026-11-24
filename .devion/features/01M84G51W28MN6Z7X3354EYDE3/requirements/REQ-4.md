---
id: "01M84G51W2EJHJ0AEQGPQSQQNZ"
kind: requirement
parent: 01M84G51W28MN6Z7X3354EYDE3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Report edge cases are proven with an injected clock and fake reporter

Context: Run writes a report using r.now for StartedAt and FinishedAt and returns a reporter error only when the run itself succeeded. Desired behavior: durations come from the injected clock; a reporter error is returned on success but never masks a run error; no reporter means no panic. Why: reports must be trustworthy and never hide failures.

## Acceptance criteria
- Given a clock advancing one second per call, When Run succeeds, Then the report DurationMS equals FinishedAt minus StartedAt in milliseconds and is greater than 0
- Given the agent succeeds and the reporter fails, When Run is called, Then the error wraps the reporter error
- Given the agent fails with boom and the reporter fails, When Run is called, Then the error is boom
- Given no reporter is set, When Run is called, Then it returns without panic


## Scope
- In scope: Report writing in Run
- Out of scope: report package internals
- Preserve: Existing report tests


## Technical constraints
- Set h.r.now directly in same-package tests


## Definition of done
- Report edge tests pass


## Clarifying questions
- None

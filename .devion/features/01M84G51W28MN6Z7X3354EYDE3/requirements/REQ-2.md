---
id: "01M84G51W2PYGHRBJ9BCP424F9"
kind: requirement
parent: 01M84G51W28MN6Z7X3354EYDE3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Retry limit and budget boundaries are proven by unit tests

Context: run loops while attempt <= MaxRetries and stops with ErrBudgetExceeded only when spent > MaxBudget with MaxBudget > 0. Desired behavior: MaxRetries 0 runs once; MaxBudget 0 never stops early; spend equal to the budget does not stop. Why: prevents runaway agent cost and silent extra attempts.

## Acceptance criteria
- Given MaxRetries 0 and a failing agent, When Run is called, Then the agent ran once, Attempt is 1 and the error is not ErrBudgetExceeded
- Given MaxBudget 0, cost 100 per call and MaxRetries 2 with all calls failing, When Run is called, Then the agent ran three times and the error is not ErrBudgetExceeded
- Given cost 2.5, MaxBudget 5.0 and MaxRetries 2 with all calls failing, When Run is called, Then the agent ran three times because spend equal to budget is not exceeded


## Scope
- In scope: Retry loop and budget check in run
- Out of scope: Cost calculation by real providers
- Preserve: Existing retry and budget tests


## Technical constraints
- Use fakeAgent cost and errs


## Definition of done
- Retry and budget boundary tests pass


## Clarifying questions
- None

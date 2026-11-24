---
id: "01M84G51W3N7HFKQEJENBJFW81"
kind: unit
parent: 01M84G51W2PYGHRBJ9BCP424F9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Retry limit and budget boundary unit tests

Add table-free tests in a new file with fakeAgent cost and errs queues.

## Acceptance criteria
- MaxRetries 0 runs once
- MaxBudget 0 is unlimited
- Spend equal to budget does not stop retries


## Scope
- In scope: runner_budget_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Same package runner


## Definition of done
- All three tests pass


## Clarifying questions
- None

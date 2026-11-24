---
id: "01M84GGJ4P4MB3FFZZFWY4FNSX"
kind: requirement
parent: 01M84GGJ4PZQ8FYNWGF2F71FCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A failed resume marks the execution RECOVERING with the error

Context: the Round lifecycle defines a RECOVERING state but store has no such status. Desired behavior: add store.StatusRecovering and have Recover persist it with the error text and clock time when Resume fails, then continue with the next execution. Expected result: Result lists marked IDs. Why: failures must be visible, not silently dropped.

## Acceptance criteria
- Given Resume returns an error for one execution, When Recover runs, Then the store receives that execution with Status RECOVERING, Error equal to the error text and UpdatedAt equal to the injected clock
- Given the first of two executions fails to resume, When Recover runs, Then the second is still resumed
- Given Save of the RECOVERING record fails, When Recover runs, Then Recover returns an error wrapping it


## Scope
- In scope: store.StatusRecovering constant
- In scope: Marking logic in Recover
- Out of scope: Admin API changes
- Preserve: Existing Status constants and values


## Technical constraints
- StatusRecovering value is the string RECOVERING


## Definition of done
- Constant added and used by Recover


## Clarifying questions
- None

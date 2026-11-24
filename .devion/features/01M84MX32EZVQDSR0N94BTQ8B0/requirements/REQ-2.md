---
id: "01M84MX32E0X7BSC7E146YQWTH"
kind: requirement
parent: 01M84MX32EZVQDSR0N94BTQ8B0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tests are proven to use the actual store module, not a mock

Context: the sub-goal requires confirming the tests import the actual store rather than a mock. Desired behavior: a test asserts vi.isMockFunction(useUiStore) is false, the module namespace exports useUiStore, and the source file of the suite contains no vi.mock call for the store. Expected result: replacing the store with a mock makes the guard test fail. Why: guarantees the unit tests exercise production code.

## Acceptance criteria
- Given the imported useUiStore, when vi.isMockFunction is called on it and on each action, then every result is false.
- Given the test file source read from disk, when searched for vi.mock, then no occurrence exists.
- Given the module namespace imported from ../src/store/uiStore, when its keys are read, then useUiStore is exported.


## Scope
- In scope: Guard assertions that the real module is used
- Out of scope: Behavioral store tests
- Preserve: uiStore.ts exports


## Technical constraints
- Read the test file with node:fs readFileSync of import.meta.url path; no network


## Definition of done
- Guard tests pass


## Clarifying questions
- None

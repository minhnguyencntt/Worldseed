---
id: "01M84GGJ4QNNSDY5TSEK07T8DW"
kind: unit
parent: 01M84GGJ4P4MB3FFZZFWY4FNSX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: StatusRecovering persistence unit test

Add a test in store_test.go using a temp dir.

## Acceptance criteria
- Execution with StatusRecovering is saved and read back equal
- Get returns Status equal to the string RECOVERING and the saved Error text


## Scope
- In scope: store_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Use t.TempDir only


## Definition of done
- Test passes


## Clarifying questions
- None

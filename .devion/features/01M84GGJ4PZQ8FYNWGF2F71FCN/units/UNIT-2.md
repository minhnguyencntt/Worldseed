---
id: "01M84GGJ4QQJX6ES5YSATFPDJ1"
kind: unit
parent: 01M84GGJ4PPSXVKAPAYCY6PWN7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement Recoverer.Recover scan, resume and mark

Create backend/worker/internal/recovery/recovery.go with the interfaces, Recoverer, New and Recover.

## Acceptance criteria
- Recover resumes PENDING, RUNNING and RECOVERING executions only
- A Resume error leads to a saved RECOVERING record and processing continues


## Scope
- In scope: recovery.go
- Out of scope: Lock handling
- Preserve: store API


## Technical constraints
- Depends on store.StatusRecovering from the sibling Act
- New file: `backend/worker/internal/recovery/recovery.go`


## Dependencies
- store.StatusRecovering


## Definition of done
- Package builds


## Clarifying questions
- None

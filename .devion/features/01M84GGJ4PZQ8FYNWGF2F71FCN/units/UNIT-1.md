---
id: "01M84GGJ4QPEH8TZEBNZA04M18"
kind: unit
parent: 01M84GGJ4P4MB3FFZZFWY4FNSX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add store.StatusRecovering

Add StatusRecovering Status = "RECOVERING" beside the existing constants in backend/worker/internal/store/store.go so recovery can persist it.

## Acceptance criteria
- store.StatusRecovering equals the string RECOVERING
- Save and Get round-trip an Execution with that status


## Scope
- In scope: store.go constant
- Out of scope: Other statuses
- Preserve: Existing constants


## Technical constraints
- Code path: `backend/worker/internal/store/store.go`


## Definition of done
- Constant exists and package builds


## Clarifying questions
- None

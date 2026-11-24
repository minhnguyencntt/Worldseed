---
id: "01M84FWVJ7W8QQTT2Q8E4K3T4W"
kind: unit
parent: 01M84FWVJ6C61VXM4E86SEWHDM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export store.ValidateID

Export the ID validator in store.go and update its callers Save and Get.

## Acceptance criteria
- ValidateID is exported and returns ErrInvalidID-wrapped errors for unsafe ids
- Save and Get still reject unsafe ids


## Scope
- In scope: store.go
- Out of scope: pattern changes
- Preserve: behavior


## Technical constraints
- Code path: `backend/worker/internal/store/store.go`


## Definition of done
- Package compiles, callers updated


## Clarifying questions
- None

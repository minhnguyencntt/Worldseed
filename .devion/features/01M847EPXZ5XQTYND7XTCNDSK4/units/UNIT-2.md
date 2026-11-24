---
id: "01M847EPY01D6C59T5EGMEZSZA"
kind: unit
parent: 01M847EPY0T932QF8DS54N3MM3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm RoundHandler maps service errors via statusFor

Read admin/rounds.go and keep handlers unchanged unless a handler bypasses fail.

## Acceptance criteria
- Given Get, Open and Close, when the service errors, then fail(w, op, err) is used
- Given success, then writeJSON with 200 is used


## Scope
- In scope: backend/internal/admin/rounds.go
- Out of scope: Round service
- Preserve: Handler signatures


## Technical constraints
- Code path: `backend/internal/admin/rounds.go`


## Definition of done
- Handlers confirmed


## Clarifying questions
- None

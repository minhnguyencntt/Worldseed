---
id: "01M85BP7N1KYP1XAPXSZBNPXM2"
kind: requirement
parent: 01M85BP7N1BFPBGF8TXMWX525X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App loads the round from the Go API with explained errors, empty state and retry

Context: App.tsx (L14-L28) calls getCurrentRound once and stores e.message. Desired behavior: a describeRoundError helper gives the cause (HTTP status, server detail, or network failure), a 404 yields the empty state, and a retry callback reloads and passes onRetry to HeaderOverlay. Backend CurrentRound returns 404 when no round exists (backend/internal/world/handler.go). Why: distinct states and recovery.

## Acceptance criteria
- Given getCurrentRound rejects ApiError 500, when App renders, then the alert explains 'Round service returned 500'
- Given it rejects ApiError 404, then 'No active round' is shown with no alert
- Given a failure then Retry click with success, then the round id and status appear
- Given a network TypeError, then the alert says the server could not be reached


## Scope
- In scope: App.tsx round loading
- Out of scope: client.ts changes
- Preserve: getCurrentRound signature


## Technical constraints
- No mock data in production code


## Definition of done
- Retry reloads the round


## Clarifying questions
- None

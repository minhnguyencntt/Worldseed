---
id: "01M842QZ3FFD12VY1QT4VGDQY7"
kind: requirement
parent: 01M842QZ3EY2N09KNHTNGVYZCB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Player me endpoint validating session cookie

Context: tokens are issued by the session endpoint. Desired behavior: GET /api/v1/player/me reads the cookie, verifies HMAC and expiry, and returns the player JSON, or 401 JSON error for missing, tampered, malformed or expired tokens. Expected result: deterministic auth behavior. Why: later APIs reuse the same check.

## Acceptance criteria
- Given a valid cookie, when GET /api/v1/player/me, then 200 and {"id":<playerID>}
- Given no cookie, when requested, then 401
- Given a token with altered signature or signed with another secret, when requested, then 401
- Given an expired token, when requested, then 401


## Scope
- In scope: me handler
- In scope: expiry check using injected clock
- Out of scope: contributions listing
- Preserve: session endpoint behavior


## Technical constraints
- clock injected for testability


## Dependencies
- R2


## Definition of done
- Me endpoint returns 200 or 401 correctly


## Clarifying questions
- None

---
id: "01M847PS3RVCAJMFMJRDF5ZSY3"
kind: requirement
parent: 01M847PS3RV2W9XR6T9VQV11Y7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin routes sit behind token entry and manage the Round

Context: no admin UI exists. Desired behavior: hash route #/admin renders AdminApp; without a token only a password-type token form shows; with a token it shows the World, the Round id/number/status, duration and max-contribution fields, Open and Close buttons calling POST /api/v1/admin/rounds/{id}/open|close?world=, and the contributions list from GET .../contributions. The token is held in component state only. Why: admins operate Rounds.

## Acceptance criteria
- Given no token, then only the token form renders and no admin fetch occurs
- Given a token submitted, then GET /api/v1/admin/rounds/{id} runs with header Authorization: Bearer <token>
- Given the Round, when Open or Close is clicked, then the matching POST runs with the world query
- Given contributions, then the list shows each prompt
- Given a 401 response, then the token form shows 'Invalid token'


## Scope
- In scope: AdminApp, TokenGate, admin client calls, hash routing in main/App
- Out of scope: Persisting the token
- Out of scope: Duration saved to server beyond POST /admin/rounds create
- Preserve: Player routes


## Technical constraints
- Admin Get uses ?world= query; duration sent as Go duration string on create
- Token never written to storage


## Dependencies
- REQ-2


## Definition of done
- #/admin gated


## Non-functional requirements
- Password input type


## Clarifying questions
- None

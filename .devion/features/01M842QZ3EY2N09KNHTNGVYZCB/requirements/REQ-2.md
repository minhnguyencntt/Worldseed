---
id: "01M842QZ3FKXXEHWAAFWR98HF7"
kind: requirement
parent: 01M842QZ3EY2N09KNHTNGVYZCB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Anonymous player session creation with HMAC token cookie

Context: no player code exists. Desired behavior: a token package that signs and verifies tokens as base64url(playerID.issuedUnix).base64url(HMAC-SHA256) using the config secret, and a handler that creates a random 128-bit hex player ID and sets a cookie. Expected result: response JSON contains the player ID and the cookie is HttpOnly, Secure, SameSite=Lax, Path=/. Why: players need identity without accounts.

## Acceptance criteria
- Given POST /api/v1/player/session, when called, then status 201 and body contains a 32-char hex id
- Given the response, when inspecting Set-Cookie, then HttpOnly, Secure and Path=/ are set with Max-Age from config ttl
- Given two calls, when compared, then the player IDs differ
- Given a token signed with the secret, when verified, then the player ID is returned


## Scope
- In scope: player token sign/verify
- In scope: session handler
- In scope: route registration
- Out of scope: me endpoint
- Out of scope: persistence
- Preserve: health endpoint


## Technical constraints
- crypto/hmac sha256 with hmac.Equal
- no storage


## Dependencies
- R1


## Definition of done
- Session endpoint returns cookie


## Non-functional requirements
- Constant-time signature comparison


## Clarifying questions
- None

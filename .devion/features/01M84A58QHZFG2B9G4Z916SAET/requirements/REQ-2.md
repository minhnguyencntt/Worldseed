---
id: "01M84A58QJ8ZYTYTPZF3QJ0360"
kind: requirement
parent: 01M84A58QHZFG2B9G4Z916SAET
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Duration field is sent to the backend when creating a Round

Add a createRound client call and a Create round button in AdminApp that posts {world_id, duration: `${durationHours}h`} with the bearer token, then reloads the current round id. Backend admin Create parses duration with time.ParseDuration.

## Acceptance criteria
- Given Duration is 12, when Create round is clicked, then a POST to /api/v1/admin/rounds is sent with JSON body world_id the-boys-room and duration 12h and a Bearer header.
- Given the create call returns 401, when it completes, then AdminApp returns to the token gate; other failures show the error message.


## Scope
- In scope: createRound client
- In scope: Create round button
- Out of scope: Backend
- Preserve: Open round and Close round buttons


## Technical constraints
- Use adminRequest; reuse handleError


## Dependencies
- R1 shares AdminApp.tsx


## Definition of done
- Request body matches backend createRoundRequest


## Clarifying questions
- None

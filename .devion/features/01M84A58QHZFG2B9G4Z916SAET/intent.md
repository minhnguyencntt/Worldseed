---
id: "01M84A58QHZFG2B9G4Z916SAET"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.5 · Show the current World and wire the admin duration and limit fields

Context: AdminApp (game/frontend/src/components/AdminApp.tsx) heading prints only the constant WORLD_ID, and its Duration (hours) and Max contributions per player inputs only change local state and are never sent anywhere. Desired behavior: show the World title, send the duration to POST /api/v1/admin/rounds, and disable the contribution-limit input because the backend has no endpoint for it (the limit comes from config contribution.max_per_player). Expected result: no admin field looks active while doing nothing. Why: the admin must not be misled about what they configure.

## Acceptance criteria
- Given the admin is authenticated, when AdminApp loads, then the World title from GET /api/v1/worlds/{id} is displayed.
- Given the admin sets Duration to 12 and clicks Create round, when the request is sent, then POST /api/v1/admin/rounds carries world_id and duration "12h".
- Given no backend endpoint sets the contribution limit, when AdminApp renders, then the Max contributions per player input is disabled and an explanatory note is visible.
- Each behavior is covered by a frontend unit test with mocked fetch.


## Scope
- In scope: game/frontend/src/api/client.ts
- In scope: game/frontend/src/components/AdminApp.tsx
- In scope: frontend unit tests
- Out of scope: Backend changes
- Out of scope: New contribution-limit endpoint
- Out of scope: Player-facing UI
- Preserve: Token gate, Open/Close round, ExecutionPanel and 401 behavior
- Preserve: Existing tests


## Technical constraints
- Frontend only; use existing adminRequest helper
- Backend create contract: JSON body {world_id, starts_at, duration (Go duration string), base_release}


## Definition of done
- All three requirements implemented and their unit tests pass


## Clarifying questions
- None

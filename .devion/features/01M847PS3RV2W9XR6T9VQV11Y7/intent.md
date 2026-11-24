---
id: "01M847PS3RV2W9XR6T9VQV11Y7"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6 · Add contribution UI and admin console

Context: the game frontend in game/frontend has a playable 80/20 App but no API client, contribution UI, countdown or admin routes. The backend already serves POST /api/v1/player/session, POST /api/v1/contributions, GET /api/v1/player/me/contributions, GET /api/v1/worlds/{id}/round/current and the Bearer-protected /api/v1/admin/* round and execution routes. Desired behavior: a Suggest What Happens Next sheet, a Round countdown and badge, and a token-gated admin console with lifecycle stepper and approve/retry controls. Expected result: all of it works against the existing API with Vitest tests using mocked fetch. Why: players feed the story and the admin runs the cycle without a terminal.

## Acceptance criteria
- Given the playing view, when the player opens the sheet and submits a prompt, then POST /api/v1/contributions is called and the entry appears in history
- Given a current Round, then the countdown shows time left and a status badge with the Round status
- Given no admin token entered, then admin routes render only the token form and make no admin request
- Given an admin Round, then the stepper marks the current stage among OPEN to COMPLETED
- Given a FAILED execution or AWAITING_APPROVAL execution, when Retry or Approve is clicked, then the matching admin endpoint is called with the Bearer token


## Scope
- In scope: game/frontend React components, API client and Vitest tests
- Out of scope: Backend changes
- Out of scope: New backend endpoints such as reject, logs or test results
- Out of scope: New runtime dependencies
- Preserve: Existing App intro gate, GameLayout, StoryPanel behavior and tests
- Preserve: Only the typed admin token is used as a secret


## Technical constraints
- Frontend lives in game/frontend (no top-level frontend/ exists)
- fetch only, no secrets in env or bundle
- Vitest with mocked fetch


## Definition of done
- All five requirements delivered with passing unit tests
- npm test and tsc --noEmit pass in game/frontend


## Non-functional requirements
- Accessible roles and labels on controls


## Clarifying questions
- None

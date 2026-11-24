---
id: "01M8641PTX71NN9ER4QAZSR2CB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# Fix 'Round unavailable: Unexpected token <' error in the UI

Context: at http://localhost:5173/ the header shows "Round unavailable: Unexpected token '<', "<!doctype "... is not valid JSON". Cause: vite.config.ts has no server.proxy, so the Vite dev server answers /api/v1/worlds/{id}/round/current with index.html and getCurrentRound's res.json() throws SyntaxError, which describeRoundError passes through unchanged. Desired: the round loads from the Go backend in dev, and any non-JSON response is explained in plain words. Why: players must see real round state or a clear message.

## Acceptance criteria
- Given the dev server is running, When the app requests /api/v1/*, Then Vite forwards it to the Go backend at http://localhost:8080
- Given the round endpoint returns HTML, When the app loads, Then the header shows a readable message and not a JSON parser message


## Scope
- In scope: game/frontend/vite.config.ts proxy
- In scope: describeRoundError in game/frontend/src/App.tsx
- Out of scope: Backend changes
- Out of scope: Header layout or Retry behaviour
- Preserve: ApiError and TypeError messages in describeRoundError
- Preserve: 404 maps to the empty state


## Technical constraints
- UI-only change; do not change the backend API
- Backend listens on :8080 (backend/configs server.addr)


## Definition of done
- Both requirements are done and verified


## Clarifying questions
- None

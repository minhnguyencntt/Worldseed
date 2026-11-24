---
id: "01M84J88PRB9V21QATSCGB46VC"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4 · Remove admin ExecutionPanel UI

Context: Worldseed must not contain development automation. The admin console in game/frontend still renders ExecutionPanel and calls /api/v1/admin/executions endpoints through game/frontend/src/api/client.ts. Desired behavior: ExecutionPanel.tsx and its tests are deleted, AdminApp and the API client no longer import, render or call anything execution-related. Expected result: remaining admin and game UI tests pass and tsc --noEmit passes. Why: the repo keeps only the game, contribution intake, round lifecycle and docs.

## Acceptance criteria
- Given the repo, when game/frontend/src/components/ExecutionPanel.tsx is looked up, then it does not exist and no test file imports it
- Given AdminApp is rendered with a valid token, when it loads, then it requests no URL under /api/v1/admin/executions and renders no execution panel
- Given the frontend, when npm run test and npm run typecheck run, then both pass


## Scope
- In scope: game/frontend/src/components/ExecutionPanel.tsx
- In scope: game/frontend/src/components/AdminApp.tsx
- In scope: game/frontend/src/api/client.ts execution functions and type
- In scope: frontend tests and fixtures for the above
- Out of scope: backend code
- Out of scope: LifecycleStepper behavior and deriveStage
- Out of scope: game UI components
- Preserve: Token gate, round create/open/close controls, world title, contributions list, 401 handling for round calls


## Technical constraints
- UI-only change in game/frontend; no backend or API change
- Frontend remains React + TypeScript + Vitest


## Definition of done
- ExecutionPanel and execution tests deleted
- AdminApp and client free of execution references
- Frontend tests and type-check green


## Clarifying questions
- None

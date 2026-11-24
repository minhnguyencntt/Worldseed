---
id: "01M8447V96YWCV4FP05DH7JHPE"
kind: requirement
parent: 01M8447V96QXHVS5N1QX4EJ2EM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frontend scaffold with runtime state hook and safe localStorage persistence

Context: game/src/state/persistence.ts has serializeState/deserializeState; createInitialState and performAction exist in game/. Desired behavior: game/frontend/ is a Vite React TS project whose useGame hook loads the bedroom world from game/content YAML, restores saved state, saves on every change inside try/catch, and falls back to in-memory play when storage fails. Expected result: state survives remount; storage errors never crash. Why: persistence requirement of SG-3.

## Acceptance criteria
- Given saved state in localStorage, When the hook mounts, Then it returns that state
- Given no saved state, When the hook mounts, Then it returns createInitialState with activeDialogue 'intro'
- Given localStorage.setItem throws, When an action runs, Then state still updates and no error is thrown
- Given corrupt saved JSON, When the hook mounts, Then initial state is used


## Scope
- In scope: game/frontend/package.json, tsconfig, vite config
- In scope: content.ts, storage.ts, useGame.ts
- Out of scope: Contribution form and 'Suggest What Happens Next' flow
- Out of scope: Backend API calls
- Out of scope: Round countdown and admin UI
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- Acceptance criteria demonstrated by unit tests


## Clarifying questions
- None

---
id: "01M843NJMDN9XTQA2M7QV9KHYC"
kind: unit
parent: 01M843NJMDS7XG831NQ6KW7HPB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Move backend/game to top-level game/

Context: backend/game holds the full TypeScript runtime. Desired behavior: move it wholesale so relative imports stay valid. Expected result: game/ contains every former file and backend/game is gone. Why: top-level module layout.

## Acceptance criteria
- Given the repo root, when running git mv backend/game game, then game/src and game/content exist
- Given the move, when checking backend/game, then it is absent


## Scope
- In scope: move of all files
- Out of scope: logic changes
- Preserve: file contents


## Technical constraints
- git mv from repo root
- Code path: `backend/game/package.json`
- Code path: `backend/game/package-lock.json`
- Code path: `backend/game/tsconfig.json`
- Code path: `backend/game/vitest.config.ts`
- Code path: `backend/game/src/content/loader.ts`
- Code path: `backend/game/src/engine/scene.ts`
- Code path: `backend/game/src/state/types.ts`
- Code path: `backend/game/src/state/gameState.ts`
- Code path: `backend/game/src/state/persistence.ts`
- Code path: `backend/game/src/systems/inventory.ts`
- Code path: `backend/game/src/systems/dialogue.ts`
- Code path: `backend/game/src/systems/conditions.ts`
- Code path: `backend/game/src/systems/events.ts`
- Code path: `backend/game/content/worlds/the-boys-room/world.yaml`
- Code path: `backend/game/content/worlds/the-boys-room/scenes/bedroom.yaml`


## Dependencies
- REQ1


## Definition of done
- backend/game removed
- game/ populated


## Clarifying questions
- None

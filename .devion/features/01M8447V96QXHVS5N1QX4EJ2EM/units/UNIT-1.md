---
id: "01M8447V97VD3PVVC505846Y5F"
kind: unit
parent: 01M8447V96YWCV4FP05DH7JHPE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Scaffold frontend and implement useGame with safe storage

Create the frontend module under game/frontend and the runtime hook layer that loads content, restores and saves state safely.

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria


## Scope
- In scope: game/frontend/package.json
- In scope: game/frontend/tsconfig.json
- In scope: game/frontend/vite.config.ts
- In scope: game/frontend/src/runtime/content.ts
- In scope: game/frontend/src/runtime/storage.ts
- In scope: game/frontend/src/runtime/useGame.ts
- Out of scope: Tests and fixtures
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it
- New file: `game/frontend/package.json`
- New file: `game/frontend/tsconfig.json`
- New file: `game/frontend/vite.config.ts`
- New file: `game/frontend/src/runtime/content.ts`
- New file: `game/frontend/src/runtime/storage.ts`
- New file: `game/frontend/src/runtime/useGame.ts`


## Definition of done
- Files in code_paths implemented and type-check passes


## Clarifying questions
- None

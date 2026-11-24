---
id: "01M8433BDPXY16JJ3RJRWW2K50"
kind: unit
parent: 01M8433BDPK5HHP66KS2Q726ZV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement state model and pure runtime systems

Create the game TypeScript package under backend/game and the pure runtime modules. Context: backend/game does not exist. Desired behavior: types define content and state shapes; systems operate immutably. Expected result: modules importable by loader and tests.

## Acceptance criteria
- Given the package, when tsc --noEmit runs, then it compiles with strict mode.
- Given any system function, when called, then the input state is not mutated.


## Scope
- In scope: backend/game/package.json
- In scope: tsconfig
- In scope: state types
- In scope: systems
- In scope: engine scene functions
- Out of scope: tests
- Out of scope: YAML loading
- Preserve: existing Go code in backend/


## Technical constraints
- Dependencies: yaml; devDependencies: typescript, vitest
- package.json scripts: test = vitest run, typecheck = tsc --noEmit
- New file: `backend/game/package.json`
- New file: `backend/game/tsconfig.json`
- New file: `backend/game/vitest.config.ts`
- New file: `backend/game/src/state/types.ts`
- New file: `backend/game/src/state/gameState.ts`
- New file: `backend/game/src/systems/conditions.ts`
- New file: `backend/game/src/systems/inventory.ts`
- New file: `backend/game/src/systems/events.ts`
- New file: `backend/game/src/systems/dialogue.ts`
- New file: `backend/game/src/engine/scene.ts`


## Dependencies
- REQ-RT


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None

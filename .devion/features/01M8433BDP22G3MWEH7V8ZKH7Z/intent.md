---
id: "01M8433BDP22G3MWEH7V8ZKH7Z"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2 Implement game runtime and The Boy's Room content

Context: the repo currently holds only the Go backend (backend/) and context.md; there is no game module yet, so the TypeScript game package is created in the new folder backend/game/ (the only existing top-level folder is backend/). Desired behavior: backend/game/src/engine, backend/game/src/state and backend/game/src/systems hold pure functions over a serializable GameState covering scenes, clickable objects with actions (inspect, push, search, leave), dialogue, choices, events, inventory, conditions, world flags and scene transitions. A YAML loader plus validator reads backend/game/content/worlds/the-boys-room/world.yaml and scenes/bedroom.yaml and reports unknown scene/object/character/flag references. Expected result: bedroom content with the opening question, bed, bookshelf with a persistent hidden door, desk, old computer, window and door, all covered by Vitest. Why: players must be able to play and the community must be able to extend content without rewriting the engine.

## Acceptance criteria
- Given a GameState, when any runtime function is called, then it returns a new state object and never mutates its input, and the state survives JSON.stringify/JSON.parse unchanged.
- Given the content files, when the loader runs, then it returns a typed world, and unknown scene, object, character or flag references yield error strings naming the reference.
- Given the bedroom scene, when it is loaded, then it contains the opening dialogue 'I don't know what to do next. What should we do?', bed, bookshelf, desk, old computer, window and door.
- Given the bookshelf search action was performed, when state is serialized, restored and the scene viewed again, then the secret door is still open.
- Given Vitest unit tests, when they run, then each system, the reference validator with invalid fixtures and persistence are covered and pass.


## Scope
- In scope: backend/game/ TypeScript runtime modules
- In scope: YAML loader and validator
- In scope: the-boys-room world and bedroom YAML
- In scope: Vitest unit tests
- Out of scope: React rendering
- Out of scope: backend API changes
- Out of scope: worker and round lifecycle
- Out of scope: pixel art assets
- Preserve: Existing Go code in backend/ (go.mod, cmd, internal) unchanged


## Technical constraints
- TypeScript with Vitest
- Content is declarative YAML parsed with the yaml npm package
- All runtime functions are pure over serializable state
- No database


## Definition of done
- All four requirements have Act and Verify units completed
- Vitest suite passes


## Non-functional requirements
- Strict TypeScript typing


## Clarifying questions
- None

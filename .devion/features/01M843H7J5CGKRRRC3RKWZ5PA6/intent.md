---
id: "01M843H7J5CGKRRRC3RKWZ5PA6"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.1 · Merge duplicate content loader/validator into one module

Context: backend/game/src/content has two overlapping implementations of loadWorld and validateWorld. loader.ts returns scenes as an array and validates a LoadedWorld. world.ts returns scenes as a record and validates (WorldDef, SceneDef[]). It does field checks on load. tests/content.test.ts imports loader.ts and tests/validator.test.ts imports world.ts. Desired behavior: one module survives, all imports point to it, and the validator tests cover the surviving one. Expected result: no duplicate implementation remains and unknown scene, object, character and flag references are tested. Why: two diverging validators make content errors unreliable for the later AI development worker.

## Acceptance criteria
- Given the repo after the change, when src/content is listed, then only one module exports loadWorld and validateWorld and src/content/world.ts no longer exists
- Given every file under backend/game/src and backend/game/tests, when imports are searched, then none reference content/world
- Given a world whose scene uses an unknown goto_scene target, say character, set_flag flag and discover object, when validateWorld runs, then it returns unknown scene, unknown character, unknown flag and unknown object errors
- Given the real the-boys-room content, when loadWorld and validateWorld run, then validateWorld returns an empty array


## Scope
- In scope: backend/game/src/content/loader.ts
- In scope: delete backend/game/src/content/world.ts
- In scope: backend/game/tests/validator.test.ts
- In scope: backend/game/tests/loader.test.ts
- Out of scope: Go backend
- Out of scope: engine, systems and state modules
- Out of scope: content YAML changes
- Preserve: content.test.ts behavior on the-boys-room
- Preserve: LoadedWorld.scenes remains an array of SceneDef
- Preserve: existing error message formats such as 'unknown scene: X'


## Technical constraints
- TypeScript with vitest and the yaml package; no new dependencies
- Surviving module path is backend/game/src/content/loader.ts


## Definition of done
- Only one loader/validator implementation exists
- npm test and npm run typecheck pass in backend/game


## Clarifying questions
- None

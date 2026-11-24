---
id: "01M843H7J6CXC4HGGW6YE76VZP"
kind: unit
parent: 01M843H7J62VDFSS78G523ZE0A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove duplicate world.ts module

Context: world.ts is only imported by tests/validator.test.ts; no src file imports it. Desired behavior: delete it. The surviving loader.ts validateWorld(world: LoadedWorld) already reports unknown scene (start scene and goto_scene), character (say and speaker), flag (set_flag, openWhenFlag, conditions) and object (discover) references. Expected result: no code path references content/world.

## Acceptance criteria
- src/content/world.ts does not exist
- Nothing under backend/game/src imports content/world


## Scope
- In scope: delete world.ts
- Out of scope: tests
- Preserve: loader.ts exports


## Technical constraints
- Use git rm
- Code path: `backend/game/src/content/world.ts`


## Dependencies
- REQ2


## Definition of done
- world.ts removed; grep for content/world in src returns nothing


## Clarifying questions
- None

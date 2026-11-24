---
id: "01M843H7J62VDFSS78G523ZE0A"
kind: requirement
parent: 01M843H7J5CGKRRRC3RKWZ5PA6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · One validator, world.ts removed, imports updated

Context: validateWorld(world, scenes) in world.ts duplicates validateWorld(LoadedWorld) in loader.ts and is imported only by tests/validator.test.ts. Desired behavior: remove world.ts and test the loader.ts validator. Expected result: a single validator with tests for every reference kind. Why: avoids drift between two validators.

## Acceptance criteria
- Given src/content, when listed, then world.ts is absent
- Given the invalid fixture world, when validateWorld runs, then errors contain unknown scene: nowhere, unknown character: ghost, unknown flag: zzz and unknown object: nope
- Given the valid fixture world, when validateWorld runs, then it returns []
- Given the real the-boys-room content, when validated, then it returns []


## Scope
- In scope: delete world.ts
- In scope: validator.test.ts import and calls
- Out of scope: fixture content changes
- Preserve: content.test.ts tests


## Technical constraints
- Fixtures stay WorldDef plus SceneDef; tests compose them into a LoadedWorld


## Dependencies
- INT


## Definition of done
- No file imports content/world
- Validator tests pass against loader.ts


## Clarifying questions
- None

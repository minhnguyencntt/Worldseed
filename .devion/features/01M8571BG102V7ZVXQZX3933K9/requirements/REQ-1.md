---
id: "01M8571BG1Z6MXACQGF82N8C51"
kind: requirement
parent: 01M8571BG102V7ZVXQZX3933K9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.ts has a single SceneObject type import

Context: BootScene.ts lines 12 and 14 both import the SceneObject type from @game/entities/SceneObject. Desired behavior: keep a single import. Expected result: the file has one such import and still uses SceneObject as a type. Why: duplicate imports cause a duplicate identifier compile error.

## Acceptance criteria
- Given BootScene.ts, when searched for `import type { SceneObject }`, then exactly one match exists
- Given BootScene.ts, when compiled, then SceneObject still resolves for the sceneObjects field type


## Scope
- In scope: Import block of BootScene.ts
- Out of scope: Other imports
- Preserve: All other import lines


## Technical constraints
- Keep the @game alias path


## Definition of done
- One SceneObject import remains


## Clarifying questions
- None

---
id: "01M8571BG102V7ZVXQZX3933K9"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.1 Remove duplicate SceneObject import and field in BootScene

Context: game/frontend/src/phaser/BootScene.ts declares `import type { SceneObject }` twice (L12 and L14) and the `private sceneObjects: SceneObject[] = []` field twice (L22 and L23). Desired behavior: one import and one field remain. Expected result: no new type errors. Why: duplicate identifiers break compilation of the Phaser scene wrapper.

## Acceptance criteria
- Given BootScene.ts, when it is read, then exactly one `import type { SceneObject }` line exists
- Given BootScene.ts, when it is read, then exactly one `private sceneObjects` field exists
- Given the frontend, when tsc --noEmit runs, then no duplicate identifier error is reported for BootScene.ts


## Scope
- In scope: Delete duplicate import and field in BootScene.ts
- Out of scope: Behavior changes to BootScene
- Out of scope: Other files
- Preserve: buildScene wiring
- Preserve: objectClick forwarding
- Preserve: sync on state change
- Preserve: shutdown cleanup


## Technical constraints
- Phaser 3.90 APIs only
- No new type errors


## Definition of done
- Duplicates removed and BootScene compiles


## Clarifying questions
- None

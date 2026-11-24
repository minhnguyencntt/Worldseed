---
id: "01M8577ZDQGCT913AW3QAFETQH"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.1 Remove duplicate SceneObject import and field in BootScene

Context: game/frontend/src/phaser/BootScene.ts currently has `import type { SceneObject }` twice (L12 and L14) and `private sceneObjects: SceneObject[] = [];` twice (L22 and L23). Desired behavior: exactly one import and one field remain, with BootScene behavior unchanged. Expected result: BootScene.ts compiles without new type errors. Why: duplicate identifiers and duplicate class members are TypeScript errors and block the thin-wrapper scene work.

## Acceptance criteria
- Given BootScene.ts, when its source is read, then it contains exactly one `import type { SceneObject }` line.
- Given BootScene.ts, when its source is read, then it contains exactly one `private sceneObjects: SceneObject[] = [];` declaration.
- Given either duplicate is reintroduced, when the BootScene unit tests run, then at least one test fails.
- Given the fix, when the existing BootScene tests run, then they still pass.


## Scope
- In scope: Delete the duplicate import at L14 of BootScene.ts
- In scope: Delete the duplicate field at L23 of BootScene.ts
- In scope: Unit tests that fail when either duplicate is present
- Out of scope: Any other BootScene behavior change
- Out of scope: Changes to engine, entities or store modules
- Preserve: BootScene.create, sync and objectClick forwarding behavior
- Preserve: FALLBACK_KEY export and preload logic


## Technical constraints
- Unit tests only, using vitest in game/frontend
- Do not change the Phaser 3.90 API usage


## Definition of done
- BootScene.ts has one SceneObject import and one sceneObjects field
- Unit tests assert both counts and pass


## Clarifying questions
- None

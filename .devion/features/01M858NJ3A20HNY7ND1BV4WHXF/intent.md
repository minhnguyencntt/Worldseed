---
id: "01M858NJ3A20HNY7ND1BV4WHXF"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.6 Re-run and fix scene unit tests with Phaser mocked

Context: game/tests holds layers, buildScene, sceneObject, interaction, planPreload, resolveTextureKey and preload suites, and game/frontend/tests holds the bootScene* suites. Investigation shows the bootScene suites pass and the engine suites pass when run through the frontend vitest binary, but zod is imported by game/src yet is not declared or installed for the frontend, effectContext.ts fails tsc with TS2366, and preload.test.ts relies on a path-based phaser mock. Desired behavior: these suites run green against the real source files with Phaser mocked. Why: the scene renderer needs trustworthy regression tests.

## Acceptance criteria
- Given the frontend package.json, when its dependencies are read, then zod is declared so game/src schema imports resolve
- Given effectContext.ts, when tsc checks it, then no TS2366 error is reported for createEffect
- Given game/vitest.config.ts, when the phaser alias is read, then it points to the frontend phaser install used by the preload mock


## Scope
- In scope: frontend zod dependency declaration
- In scope: effectContext exhaustive return
- In scope: game vitest phaser alias
- Out of scope: Changing renderer behavior
- Out of scope: Real browser or Phaser rendering
- Preserve: Existing passing suites
- Preserve: Public engine function signatures


## Technical constraints
- Phaser stays mocked in unit tests
- Do not change content schemas


## Definition of done
- All three requirements have Act and Verify units completed


## Clarifying questions
- None

---
id: "01M85B0RB7DRTS8MPCJSEZNWYH"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1.4 Reconcile character tests with schema, validation and BootScene source

Context: character tests exist in game/tests/characterSchema.test.ts, game/tests/validator.test.ts and game/frontend/tests/bootSceneCharacters.test.ts. They are reported as passing. Desired behavior: each suite asserts observable behavior of characterSchema (game/src/content/schema.ts), validateWorld (game/src/content/loader.ts) and BootScene character wiring (game/frontend/src/phaser/BootScene.ts). Expected result: removing the code under test makes the matching test fail. Why: passing tests that do not exercise the source give false confidence.

## Acceptance criteria
- Given the characterSchema tests, when characterSchema defaults, required idle animation or interaction handling is removed, then at least one test in game/tests/characterSchema.test.ts fails
- Given the validateWorld tests, when the scene character check is removed from validateWorld, then a test in game/tests/validator.test.ts fails
- Given the BootScene character tests, when createCharacter or the shutdown cleanup is removed, then a test in game/frontend/tests/bootSceneCharacters.test.ts fails


## Scope
- In scope: Test assertions for characterSchema, validateWorld scene characters and BootScene character wiring
- Out of scope: New character features
- Out of scope: Backend changes
- Out of scope: Browser or e2e testing
- Preserve: Existing public exports of schema.ts, loader.ts and BootScene.ts
- Preserve: Existing passing tests


## Technical constraints
- Phaser stays mocked via vi.mock in BootScene tests
- Tests use zod and the real source modules, never mocks of the code under test


## Definition of done
- All three requirements have an Act and a Verify unit
- Evidence ticket confirms the three test files pass


## Clarifying questions
- None

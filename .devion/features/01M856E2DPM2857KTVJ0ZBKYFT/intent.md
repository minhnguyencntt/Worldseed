---
id: "01M856E2DPM2857KTVJ0ZBKYFT"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4.3 preload.test.ts with mocked dependencies

Context: planPreload and resolveTextureKey exist in game/src/engine/planPreload.ts and BootScene (game/frontend/src/phaser/BootScene.ts) uses them, but game/tests/preload.test.ts does not exist. Desired behavior: one unit test file with all dependencies mocked proves deduplication, unknown-reference reporting, fallback key resolution and BootScene use of planner and fallback. Expected result: the file exists and passes under game/vitest.config.ts. Why: locks SG-5.4 behavior against regressions.

## Acceptance criteria
- Given game/tests/preload.test.ts, when vitest runs it, then all tests pass with every dependency mocked
- Given two objects referencing one known asset, when planPreload runs, then the asset appears once in load
- Given an unknown asset ref, when BootScene.preload runs, then it is not loaded and a warning is logged
- Given an unknown id, when BootScene.resolveKey runs, then it returns fallback:missing


## Scope
- In scope: game/tests/preload.test.ts
- In scope: game/vitest.config.ts alias only if required
- Out of scope: Changing planPreload or BootScene behavior
- Out of scope: Running Phaser, a browser or the real asset tree
- Preserve: Existing planPreload.test.ts, resolveTextureKey.test.ts and frontend BootScene tests


## Technical constraints
- Mandatory: Phaser, content, store and effect context mocked with vi.mock
- Do not change vitest config unless strictly needed


## Definition of done
- preload.test.ts exists and passes
- All three requirements verified


## Non-functional requirements
- Tests run in seconds


## Clarifying questions
- None

---
id: "01M85643NCYKYXDZCYEGBS1QF7"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4.3 Add game/tests/preload.test.ts with mocked dependencies

Context: planPreload and resolveTextureKey live in game/src/engine/planPreload.ts and BootScene (game/frontend/src/phaser/BootScene.ts) uses both. Separate tests exist (game/tests/planPreload.test.ts, resolveTextureKey.test.ts, frontend/tests/bootScene*.test.ts), but game/tests/preload.test.ts does not exist. Desired behavior: one file with every dependency mocked covering deduplication, the unknown-reference issue, the fallback key and BootScene using the planner and fallback. Why: SG-5.4.3 asks for exactly this file.

## Acceptance criteria
- Given game/tests/preload.test.ts, when `npx vitest run tests/preload.test.ts` runs in game/, then it passes
- Given an asset referenced twice, when planned, then it is loaded once
- Given a ref missing from the manifest, when planned, then it is reported unknown and not loaded
- Given an unknown id, when resolved, then the fallback key is returned
- Given BootScene.preload, when run with mocks, then only planned assets load and unknown refs warn


## Scope
- In scope: game/tests/preload.test.ts
- In scope: game/vitest.config.ts alias so game tests can import BootScene
- Out of scope: Changing planPreload or BootScene behavior
- Out of scope: Browser or Phaser runtime tests
- Preserve: Existing planPreload, resolveTextureKey and bootScene tests
- Preserve: game/frontend/vitest.config.ts


## Technical constraints
- Mock phaser, the content module, and the filesystem; no real Phaser or network
- Test lives in game/tests/preload.test.ts exactly


## Definition of done
- preload.test.ts exists and passes
- Existing game tests still pass


## Clarifying questions
- None

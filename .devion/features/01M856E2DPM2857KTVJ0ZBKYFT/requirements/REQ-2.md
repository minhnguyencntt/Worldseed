---
id: "01M856E2DP54HNZ3VTVWZC0A98"
kind: requirement
parent: 01M856E2DPM2857KTVJ0ZBKYFT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · game vitest config resolves @game so BootScene can be imported from game/tests

Context: BootScene.ts imports from '@game/...' and game/vitest.config.ts has no alias, so game/tests cannot import it. Desired behavior: add the @game alias pointing at game/src, the minimal strictly needed change. Expected result: preload.test.ts imports BootScene without resolution errors. Why: BootScene tests must live in game/tests.

## Acceptance criteria
- Given game/vitest.config.ts, when its resolve.alias is read, then '@game' maps to the game/src directory
- Given the config, when tests/**/*.test.ts is matched, then preload.test.ts is included


## Scope
- In scope: game/vitest.config.ts resolve.alias for @game
- Out of scope: Other config changes, environment changes
- Preserve: include glob tests/**/*.test.ts


## Technical constraints
- Only the alias is added; no new dependencies


## Definition of done
- Alias present and include unchanged


## Clarifying questions
- None

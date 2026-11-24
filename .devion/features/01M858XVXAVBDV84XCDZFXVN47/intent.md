---
id: "01M858XVXAVBDV84XCDZFXVN47"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.6.1 Land the Phaser alias in a Verify-owned unit

Context: game/vitest.config.ts only aliases @game, so a bare 'phaser' import from BootScene (game/frontend/src/phaser/BootScene.ts L1) does not resolve from game/tests. Desired behavior: the phaser alias is added to the game test configuration as part of a Verify-owned unit so it is not rejected as a test file changed by Act, and an alias unit test passes. Why: scene unit tests with Phaser mocked must resolve it.

## Acceptance criteria
- Given game/vitest.config.ts, when read, then resolve.alias maps 'phaser' to the frontend phaser install and keeps '@game'
- Given the alias test, when run, then it passes
- Given the diff, when reviewed, then vitest.config.ts is changed only by a Verify unit


## Scope
- In scope: game/vitest.config.ts phaser alias
- In scope: alias unit test
- Out of scope: Phaser runtime behavior
- Out of scope: backend
- Preserve: @game alias
- Preserve: existing tests including preload.test.ts mocks


## Technical constraints
- Phaser stays pinned at ~3.90.0 in game/frontend/package.json


## Definition of done
- Alias present and alias test passes


## Clarifying questions
- None

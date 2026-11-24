---
id: "01M856E2DQYWQ5JT70XG466EVZ"
kind: unit
parent: 01M856E2DP54HNZ3VTVWZC0A98
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: game vitest config alias unit tests

Add a unit test reading the config object.

## Acceptance criteria
- Given the config, when imported, then @game alias ends with src
- Given the config, then include contains tests/**/*.test.ts


## Scope
- In scope: game/tests/preloadConfig.test.ts
- Out of scope: Running Phaser
- Preserve: Other tests


## Technical constraints
- Import ../vitest.config default export; no filesystem beyond that


## Definition of done
- Test passes


## Clarifying questions
- None

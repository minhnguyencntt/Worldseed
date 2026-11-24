---
id: "01M858XVXBQY7T40QYHHXZ355B"
kind: unit
parent: 01M858XVXA9JC4FYPFRB1RY5Q9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: game vitest config phaser alias unit tests

This Verify unit owns the change to game/vitest.config.ts (a test configuration) and adds the test that asserts the alias, so Act is not rejected for touching test files.

## Acceptance criteria
- Given the config, when its alias is read, then phaser maps to game/frontend/node_modules/phaser
- Given the config, when its alias is read, then @game still maps to game/src


## Scope
- In scope: game/vitest.config.ts
- In scope: game/tests/vitestPhaserAlias.test.ts
- Out of scope: product code
- Preserve: existing include glob
- Preserve: @game alias


## Technical constraints
- Only the config file read from disk and the imported config object; no vitest process is started inside the test


## Dependencies
- ACT1


## Definition of done
- Alias added and alias test green


## Clarifying questions
- None

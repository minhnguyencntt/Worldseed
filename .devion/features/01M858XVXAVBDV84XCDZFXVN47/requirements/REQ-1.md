---
id: "01M858XVXA9JC4FYPFRB1RY5Q9"
kind: requirement
parent: 01M858XVXAVBDV84XCDZFXVN47
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · game vitest config aliases phaser, added by a Verify-owned unit

The alias for 'phaser' pointing to game/frontend/node_modules/phaser is added to game/vitest.config.ts within the Verify unit, since it is a test configuration file, and BootScene's default import of phaser stays compatible with it.

## Acceptance criteria
- Given vitest.config.ts, when loaded, then alias 'phaser' resolves to game/frontend/node_modules/phaser and '@game' still resolves to game/src
- Given BootScene.ts, when read, then it default-imports 'phaser' so the alias applies


## Scope
- In scope: vitest.config.ts alias
- In scope: BootScene import check
- Out of scope: new product behavior
- Preserve: @game alias


## Technical constraints
- Alias path must be computed with fileURLToPath like the @game alias


## Definition of done
- Alias added in Verify unit; test passes


## Clarifying questions
- None

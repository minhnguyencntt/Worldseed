---
id: "01M858NJ3AKKA3B1HSN1137BWR"
kind: requirement
parent: 01M858NJ3A20HNY7ND1BV4WHXF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · game vitest config aliases phaser to the frontend install

game/tests/preload.test.ts imports frontend BootScene, which imports bare phaser that is installed only under game/frontend. Add a phaser alias in game/vitest.config.ts to that install so the mock and import agree.

## Acceptance criteria
- Given game/vitest.config.ts, when read, then it aliases phaser to frontend/node_modules/phaser
- Given game/vitest.config.ts, when read, then the @game alias remains


## Scope
- In scope: game/vitest.config.ts alias
- Out of scope: Test file edits
- Preserve: @game alias
- Preserve: include pattern tests/**/*.test.ts


## Technical constraints
- Alias path built with fileURLToPath


## Definition of done
- phaser alias present


## Clarifying questions
- None

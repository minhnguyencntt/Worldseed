---
id: "01M858NJ3A4A0B817DMEQ1C5QS"
kind: unit
parent: 01M858NJ3AKKA3B1HSN1137BWR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add phaser alias to game/vitest.config.ts

Extend resolve.alias in game/vitest.config.ts with phaser pointing to ./frontend/node_modules/phaser.

## Acceptance criteria
- phaser alias present
- @game alias kept


## Scope
- In scope: game/vitest.config.ts
- Out of scope: tests
- Preserve: @game alias


## Technical constraints
- Code path: `game/vitest.config.ts`


## Definition of done
- alias added


## Clarifying questions
- None

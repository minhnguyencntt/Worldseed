---
id: "01M85643NDSMAXYCSSYJ3NN210"
kind: unit
parent: 01M85643NDTVPSXJZ4PQS2PXG9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add @game alias to game/vitest.config.ts

BootScene imports '@game/engine/planPreload' etc. The game vitest config has no alias, so importing it from game/tests fails. Add the alias mirroring game/frontend/vitest.config.ts.

## Acceptance criteria
- '@game/engine/planPreload' resolves to game/src/engine/planPreload under game's vitest
- Include pattern tests/**/*.test.ts stays unchanged


## Scope
- In scope: game/vitest.config.ts
- Out of scope: Frontend config
- Preserve: test.include value


## Technical constraints
- Keep node environment
- Code path: `game/vitest.config.ts`


## Definition of done
- Alias present and existing game tests unaffected


## Clarifying questions
- None

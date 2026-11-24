---
id: "01M856E2DQSB32YVC3R32NTV5S"
kind: unit
parent: 01M856E2DP54HNZ3VTVWZC0A98
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add @game alias to game/vitest.config.ts

Context: game/vitest.config.ts is only defineConfig({test:{include}}). BootScene imports @game/*. Add the alias only.

## Acceptance criteria
- Given the config, when read, then resolve.alias['@game'] is the absolute path of game/src
- Given the config, when read, then include is still tests/**/*.test.ts


## Scope
- In scope: game/vitest.config.ts
- Out of scope: Environment or setup files
- Preserve: include glob


## Technical constraints
- Use fileURLToPath(new URL('./src', import.meta.url))
- Code path: `game/vitest.config.ts`


## Definition of done
- Alias added


## Clarifying questions
- None

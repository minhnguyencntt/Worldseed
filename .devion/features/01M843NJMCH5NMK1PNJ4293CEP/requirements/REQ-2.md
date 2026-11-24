---
id: "01M843NJMD87BN8FQ0BJJVS341"
kind: requirement
parent: 01M843NJMCH5NMK1PNJ4293CEP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Ignore and config paths point at game/ not backend/game

Context: .gitignore line 10 is backend/game/node_modules/. vitest.config.ts includes tests/**/*.test.ts and tsconfig includes src and tests, both relative so valid after the move. Desired behavior: .gitignore ignores game/node_modules/ and no stale backend/game reference remains. Expected result: node_modules under game/ is never tracked. Why: avoid committing dependencies after relocation.

## Acceptance criteria
- Given .gitignore, when read, then it contains the line game/node_modules/
- Given .gitignore, when read, then no line contains backend/game
- Given game/vitest.config.ts and game/tsconfig.json, when read, then they include tests and src relative globs


## Scope
- In scope: .gitignore path fix
- Out of scope: new ignore rules
- Preserve: all other .gitignore lines


## Technical constraints
- Change only the stale line


## Dependencies
- REQ1


## Definition of done
- .gitignore updated


## Clarifying questions
- None

---
id: "01M843NJMD1SHVV2PNXPVG9ZGH"
kind: unit
parent: 01M843NJMD87BN8FQ0BJJVS341
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: .gitignore and module config path unit tests

Context: .gitignore must ignore game/node_modules/; vitest/tsconfig use relative globs. Desired behavior: tests read these files and assert content. Expected result: pass.

## Acceptance criteria
- Given .gitignore, when read, then game/node_modules/ is a line and backend/game is absent
- Given game/vitest.config.ts and game/tsconfig.json, when read, then they contain tests/**/*.test.ts and "src"/"tests" includes


## Scope
- In scope: new config.test.ts
- Out of scope: running the whole suite
- Preserve: existing tests


## Technical constraints
- Read repo files with node:fs only


## Dependencies
- ACT2


## Definition of done
- config.test.ts passes


## Clarifying questions
- None

---
id: "01M84SZR3WV7A9G533AKS8RJWK"
kind: unit
parent: 01M84SZR3WA4EPDRPJ6SSH6FFA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: game/frontend/node_modules is covered by the real .gitignore unit tests

Tests the helper on samples and on the real ignore file.

## Acceptance criteria
- Given the real .gitignore, then game/frontend/node_modules/phaser/package.json is ignored
- Given only `game/node_modules/`, then the same path is not ignored


## Scope
- In scope: tests/gitignoreCoverage.test.ts
- Out of scope: git


## Technical constraints
- No git process


## Definition of done
- Tests pass


## Clarifying questions
- None

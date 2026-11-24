---
id: "01M84SZR3WA4EPDRPJ6SSH6FFA"
kind: requirement
parent: 01M84SZR3WM382SS6J5BS8E0KS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A unit test reads the real .gitignore and checks game/frontend/node_modules is covered

A vitest test in game/frontend/tests reads the repository-root .gitignore with node:fs and evaluates whether game/frontend/node_modules/phaser/package.json is matched by an unanchored directory rule.

## Acceptance criteria
- Given the real .gitignore, when the test evaluates game/frontend/node_modules/phaser/package.json, then it is ignored
- Given a sample ignore text with only `game/node_modules/`, when evaluated for the same path, then it is not ignored


## Scope
- In scope: one test file and a small pure helper
- Out of scope: running git
- Preserve: existing tests


## Technical constraints
- Read file via node:fs readFileSync with a Node URL alias as in phaserVersionGuard.test.ts


## Definition of done
- Test passes


## Clarifying questions
- None

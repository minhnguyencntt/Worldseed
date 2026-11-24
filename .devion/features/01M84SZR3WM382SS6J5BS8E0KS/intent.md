---
id: "01M84SZR3WM382SS6J5BS8E0KS"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.1 · Depth-independent node_modules ignore rule

Context: .gitignore only has `game/node_modules/`, which does not match `game/frontend/node_modules`. Desired behavior: a depth-independent `node_modules/` rule, and a unit test that reads the real .gitignore and checks the path is covered. Expected result: vendored Phaser files under any node_modules are ignored. Why: avoid tracked changes in vendored Phaser files.

## Acceptance criteria
- Given the real .gitignore, when read, then it contains the line `node_modules/` and no longer contains `game/node_modules/`
- Given the real .gitignore, when a unit test evaluates path game/frontend/node_modules/phaser/package.json, then it is reported as ignored


## Scope
- In scope: .gitignore node_modules rule
- In scope: unit test reading the real .gitignore
- Out of scope: untracking already-indexed node_modules files
- Out of scope: other .gitignore entries
- Preserve: existing .devion/* ignore entries


## Technical constraints
- Unit test must read the real .gitignore from disk, no git process


## Definition of done
- Rule replaced and test passes


## Clarifying questions
- None

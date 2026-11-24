---
id: "01M84ST796HRP7XB75442F175B"
kind: unit
parent: 01M84ST795267MA2D71KBND5GQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: .gitignore ignores node_modules at any depth

Test reads root .gitignore and asserts the node_modules rule.

## Acceptance criteria
- Given .gitignore, then a node_modules/ line is present
- Given .gitignore, then the original .devion/cache/ line is still present


## Scope
- In scope: game/frontend/tests/gitignoreNodeModules.test.ts
- Out of scope: Running git
- Preserve: Other tests


## Technical constraints
- Reads only the .gitignore file; no git process


## Definition of done
- Test passes


## Clarifying questions
- None

---
id: "01M84SZR3WZAQBSPR47M8X0C14"
kind: requirement
parent: 01M84SZR3WM382SS6J5BS8E0KS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · .gitignore uses a depth-independent node_modules/ rule

The current rule `game/node_modules/` is anchored to game/ and misses game/frontend/node_modules. Replace it with `node_modules/` so any depth matches.

## Acceptance criteria
- Given .gitignore, when its lines are read, then a line equal to `node_modules/` exists
- Given .gitignore, when its lines are read, then no line equals `game/node_modules/`


## Scope
- In scope: .gitignore
- Out of scope: git index changes
- Preserve: .devion/ entries


## Technical constraints
- Rule must contain no slash except the trailing one


## Definition of done
- Line replaced


## Clarifying questions
- None

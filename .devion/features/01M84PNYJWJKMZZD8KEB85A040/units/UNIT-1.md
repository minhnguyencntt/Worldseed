---
id: "01M84PNYJX3R0Y9E2TGCQ6JA6D"
kind: unit
parent: 01M84PNYJX1M9S67KP1HM3FV0N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add zod to game/package.json

Add zod to the dependencies of game/package.json and install it so lockfile is updated.

## Acceptance criteria
- dependencies contains zod ^3.23.8
- yaml dependency remains


## Scope
- In scope: game/package.json
- In scope: game/package-lock.json
- Out of scope: frontend
- Preserve: scripts


## Technical constraints
- Code path: `game/package.json`
- Code path: `game/package-lock.json`


## Definition of done
- zod resolves from game/


## Clarifying questions
- None

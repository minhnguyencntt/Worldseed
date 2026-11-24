---
id: "01M84S559P5AEB938KGEHZHRSN"
kind: unit
parent: 01M84S559NN7A31GGFDDHQJGTJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Set root phaser specifier to ~3.90.0 in package-lock.json

Change packages[""].dependencies.phaser from ^4.2.1 to ~3.90.0 in game/frontend/package-lock.json.

## Acceptance criteria
- Root dependencies.phaser equals ~3.90.0
- The lockfile remains valid JSON


## Scope
- In scope: lockfile L15
- Out of scope: node_modules/phaser entry
- Preserve: other entries


## Technical constraints
- Code path: `game/frontend/package-lock.json`


## Definition of done
- L15 reads ~3.90.0


## Clarifying questions
- None

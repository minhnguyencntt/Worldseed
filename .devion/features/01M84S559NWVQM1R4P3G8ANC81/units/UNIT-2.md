---
id: "01M84S559P39J3NFBK1D79N57G"
kind: unit
parent: 01M84S559NWCSW0D395RW6VH4B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Update node_modules/phaser lock entry to 3.90.0

Rewrite the node_modules/phaser block in game/frontend/package-lock.json with the 3.90.0 registry values.

## Acceptance criteria
- version is 3.90.0 with matching resolved URL and integrity
- eventemitter3 range is ^5.0.1


## Scope
- In scope: lockfile L3445-L3453
- Out of scope: root entry
- Preserve: eventemitter3 5.0.4 entry


## Technical constraints
- Code path: `game/frontend/package-lock.json`


## Definition of done
- Block matches 3.90.0 registry metadata


## Clarifying questions
- None

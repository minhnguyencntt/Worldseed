---
id: "01M84SA5012NT3FJM9D7PZYED7"
kind: unit
parent: 01M84SA5018K3J2BAEWYY1K5C2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Update node_modules/phaser lock entry to 3.90.0

Replace the 4.2.1 entry with the registry data for phaser 3.90.0.

## Acceptance criteria
- version, resolved, integrity match phaser@3.90.0.
- eventemitter3 range is ^5.0.1.


## Scope
- In scope: node_modules/phaser entry L3445-L3453
- Out of scope: Other entries
- Preserve: license field


## Technical constraints
- Values from npm view phaser@3.90.0
- Code path: `game/frontend/package-lock.json`


## Definition of done
- Entry matches phaser 3.90.0 registry metadata


## Clarifying questions
- None

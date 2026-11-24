---
id: "01M84SA501R2B0BVKGDZYW79JH"
kind: unit
parent: 01M84SA501EV16Z7RAGJSRNGFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Set root phaser specifier to ~3.90.0 in package-lock.json

Change packages[""].dependencies.phaser from ^4.2.1 to ~3.90.0 in game/frontend/package-lock.json.

## Acceptance criteria
- Root phaser specifier reads ~3.90.0.
- No other line in the root dependencies block changes.


## Scope
- In scope: package-lock.json L15
- Out of scope: Other entries
- Preserve: JSON formatting


## Technical constraints
- Code path: `game/frontend/package-lock.json`


## Definition of done
- Line 15 is "phaser": "~3.90.0",


## Clarifying questions
- None

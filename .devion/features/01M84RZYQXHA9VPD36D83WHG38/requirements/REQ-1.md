---
id: "01M84RZYQYY5V63AHWF1KFDR9Q"
kind: requirement
parent: 01M84RZYQXHA9VPD36D83WHG38
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · package.json declares phaser as an exact or tilde 3.90.x version

Context: package.json currently has "phaser": "^4.2.1". Desired behavior: the declaration is changed to ~3.90.0 (or exact 3.90.0). Expected result: no caret range exists on phaser and the version is within 3.90.x. Why: lock the engine to the required Phaser 3.90 line.

## Acceptance criteria
- Given package.json, when dependencies.phaser is read, then it equals 3.90.0 or ~3.90.0 (matches /^~?3\.90\.\d+$/).
- Given package.json, when dependencies.phaser is read, then it does not start with ^ and does not contain a 4 major version.


## Scope
- In scope: phaser line in game/frontend/package.json
- Out of scope: package-lock.json
- Out of scope: source code under src/phaser
- Preserve: Other dependency entries


## Technical constraints
- No caret range


## Definition of done
- Declaration matches /^~?3\.90\.\d+$/


## Clarifying questions
- None

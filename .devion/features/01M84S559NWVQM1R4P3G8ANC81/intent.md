---
id: "01M84S559NWVQM1R4P3G8ANC81"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1.2 Lock phaser to 3.90.x in package-lock.json

Context: game/frontend/package.json declares phaser ~3.90.0, but game/frontend/package-lock.json still records phaser ^4.2.1 in the root dependencies entry (L15) and version 4.2.1 under node_modules/phaser (L3445-L3453). Desired behavior: both entries use the resolved 3.90.0 release with its registry URL and integrity. Expected result: npm ci installs phaser 3.90.0. Why: the SG-4 Phaser 3.90 integration needs a reproducible install.

## Acceptance criteria
- Given package-lock.json, when packages[""].dependencies.phaser is read, then it equals ~3.90.0 and matches package.json
- Given package-lock.json, when packages["node_modules/phaser"] is read, then version is 3.90.0 with the 3.90.0 tarball URL and integrity


## Scope
- In scope: phaser root dependency entry in game/frontend/package-lock.json
- In scope: node_modules/phaser entry in game/frontend/package-lock.json
- Out of scope: package.json changes (already ~3.90.0)
- Out of scope: Phaser source code changes
- Out of scope: other dependencies
- Preserve: all other lockfile entries, including eventemitter3 5.0.4


## Technical constraints
- Phaser must stay on the 3.90.x line
- No network or Git credentials in the browser


## Definition of done
- Both lockfile entries point to phaser 3.90.0
- Lockfile unit tests pass


## Non-functional requirements
- Lockfile stays valid JSON, lockfileVersion 3


## Clarifying questions
- None

---
id: "01M84RQWF9QCM7HPR9AZMRV8VE"
kind: unit
parent: 01M84RQWF8MNWG6QSRM247R9AH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Pin phaser to ~3.90.0 in package.json and regenerate the lockfile

Edit the phaser range in game/frontend/package.json and run npm to regenerate package-lock.json with a 3.90.x release.

## Acceptance criteria
- package.json lists phaser ~3.90.0
- Lockfile resolves phaser to 3.90.x


## Scope
- In scope: package.json
- In scope: package-lock.json
- Out of scope: src changes
- Preserve: Other dependencies


## Technical constraints
- Code path: `game/frontend/package.json`
- Code path: `game/frontend/package-lock.json`


## Dependencies
- REQ1


## Definition of done
- Both files updated by npm


## Clarifying questions
- None

---
id: "01M84RQWF8MNWG6QSRM247R9AH"
kind: requirement
parent: 01M84RQWF8QZ5673P4WA9RRMT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · package.json and lockfile pin Phaser to 3.90.x

Context: package.json has "phaser": "^4.2.1"; the lockfile resolves 4.2.1 (node_modules/phaser at about L3445, root deps at L15). Desired behavior: the range is ~3.90.0 and the lockfile resolves a 3.90.x release. Expected result: a fresh npm ci installs Phaser 3.90.x. Why: the redesign mandates Phaser 3.90.

## Acceptance criteria
- Given package.json, When dependencies.phaser is read, Then it is ~3.90.0
- Given package-lock.json, When node_modules/phaser.version is read, Then it matches 3.90.x


## Scope
- In scope: phaser entry in package.json and package-lock.json
- Out of scope: Other dependencies
- Preserve: All other dependency versions


## Technical constraints
- Lockfile must be produced by npm, not hand-edited


## Definition of done
- Both files pin 3.90.x


## Clarifying questions
- None

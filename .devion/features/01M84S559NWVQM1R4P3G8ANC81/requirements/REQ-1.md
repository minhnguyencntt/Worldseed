---
id: "01M84S559NN7A31GGFDDHQJGTJ"
kind: requirement
parent: 01M84S559NWVQM1R4P3G8ANC81
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Lockfile root dependencies entry declares phaser ~3.90.0

Context: package-lock.json L15 reads "phaser": "^4.2.1", which disagrees with package.json L18 (~3.90.0). Desired behavior: the root entry equals the package.json specifier. Expected result: npm ci does not report lock/package mismatch. Why: a mismatched lock can install Phaser 4.

## Acceptance criteria
- Given package-lock.json, when the root dependencies.phaser is read, then it equals ~3.90.0
- Given package.json and the lockfile root, when phaser specifiers are compared, then they are identical


## Scope
- In scope: packages[""].dependencies.phaser
- Out of scope: node_modules/phaser entry
- Preserve: other root dependencies


## Technical constraints
- Specifier must be exactly ~3.90.0


## Definition of done
- Root entry reads ~3.90.0


## Clarifying questions
- None

---
id: "01M84SA501EV16Z7RAGJSRNGFR"
kind: requirement
parent: 01M84SA501BTET4FJQ6YZ84RKE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Lockfile root dependencies entry declares phaser ~3.90.0

Context: packages[""].dependencies.phaser in game/frontend/package-lock.json is ^4.2.1 while package.json says ~3.90.0. Desired: change to ~3.90.0. Expected: npm sees no drift. Why: lock/manifest consistency.

## Acceptance criteria
- Given package-lock.json, when packages[""].dependencies.phaser is read, then it is exactly ~3.90.0.
- Given package.json and the lockfile, when both phaser specifiers are compared, then they are equal.


## Scope
- In scope: Root dependencies phaser line L15
- Out of scope: Other root dependencies
- Preserve: Alphabetical ordering and other specifiers


## Definition of done
- Root specifier is ~3.90.0


## Clarifying questions
- None

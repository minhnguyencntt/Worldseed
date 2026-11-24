---
id: "01M84SA50100Q6Y5C9R0PSBVX6"
kind: unit
parent: 01M84SA501EV16Z7RAGJSRNGFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lockfile root phaser specifier unit tests

Write tests that read the real package-lock.json and package.json from disk and assert the root phaser specifier.

## Acceptance criteria
- Test fails when lockfile root says ^4.2.1.
- Test passes with ~3.90.0 equal to package.json.


## Scope
- In scope: game/frontend/tests/phaserLockfile.test.ts
- Out of scope: Product code
- Preserve: Existing phaserDependency.test.ts


## Technical constraints
- Alias Node URL as in tests/phaserDependency.test.ts; only filesystem reads of repo files, no network


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M84RQWF9HRGWG3WHZ9V4FYAH"
kind: unit
parent: 01M84RQWF8MNWG6QSRM247R9AH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Phaser dependency pin unit tests

Add a test mirroring zustandDependency.test.ts that reads package.json and package-lock.json from disk.

## Acceptance criteria
- Manifest range admits only 3.90.x
- Lockfile entry is 3.90.x


## Scope
- In scope: tests/phaserDependency.test.ts
- Out of scope: Installing packages
- Preserve: Existing tests


## Technical constraints
- Filesystem reads only, no network


## Dependencies
- ACT1


## Definition of done
- Test passes


## Clarifying questions
- None

---
id: "01M84MFPVVVXK3A32KVABSGF5N"
kind: unit
parent: 01M84MFPVVP1DMDZMHAB763YBX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: zustand dependency declaration and resolution unit tests

Write a vitest test reading package.json and package-lock.json from disk and importing zustand. No network or app start.

## Acceptance criteria
- Given package.json, when read, then dependencies.zustand matches a semver range
- Given package-lock.json, when read, then root range equals package.json and node_modules/zustand has a version
- Given the import, when evaluated, then create is a function


## Scope
- In scope: game/frontend/tests/zustandDependency.test.ts
- Out of scope: Store behavior
- Preserve: Existing tests


## Technical constraints
- Read files with node:fs relative to the test file
- No fixture payloads from network


## Definition of done
- Test passes via the filtered command


## Clarifying questions
- None

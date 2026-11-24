---
id: "01M857F2G2XGAS9HBTY9Q2P9T4"
kind: unit
parent: 01M857F2G2DWBWTQ1CAXH88T1R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Fallback and preload tests mock sceneSpec and pass

Add sceneSpec to the content mocks of the two test files and confirm they pass.

## Acceptance criteria
- Given the mocks, When BootScene loads, Then sceneSpec is defined
- Given both files, When run, Then they pass


## Scope
- In scope: two test files
- Out of scope: app code
- Preserve: existing assertions


## Technical constraints
- Everything mocked; phaser mocked


## Definition of done
- Both files pass


## Clarifying questions
- None

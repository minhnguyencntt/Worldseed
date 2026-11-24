---
id: "01M8571BG28JFMWAK7N0D32E0A"
kind: unit
parent: 01M8571BG1Z6MXACQGF82N8C51
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene has a single SceneObject import unit tests

Write a unit test that reads the BootScene.ts source from disk and asserts a single SceneObject type import.

## Acceptance criteria
- Given the source, when matched, then exactly one SceneObject import exists
- Given the source, when matched, then no duplicate import line exists


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Only node:fs read of a repo file, no app started


## Definition of done
- Test passes


## Clarifying questions
- None

---
id: "01M8577ZDR3Q45S7WMBRXK5HN6"
kind: unit
parent: 01M8577ZDR33SP7JF0SV575XBT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene has a single SceneObject import unit tests

Add a vitest unit test reading BootScene.ts source text and asserting a single SceneObject import, so it fails when the duplicate is present.

## Acceptance criteria
- Given the duplicate import is present, when the test runs, then it fails.
- Given ACT1 is applied, when the test runs, then it passes.


## Scope
- In scope: New test file game/frontend/tests/bootSceneSingleImport.test.ts
- Out of scope: Product code changes
- Preserve: Existing bootScene*.test.ts files


## Technical constraints
- Reads the source file only; no app, server or browser started


## Definition of done
- Test added and passing after ACT1


## Clarifying questions
- None

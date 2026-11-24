---
id: "01M85JJHFA4E9W9XCAVJ49YD7S"
kind: unit
parent: 01M85JJHFAQ0ZMXH0F08WGQ88W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: setFocusedObject unit tests

Add unit tests on the real store for the setter action in the same test file.

## Acceptance criteria
- Setting 'bookshelf' stores it
- Setting null clears it
- State object identity is unchanged


## Scope
- In scope: setter tests
- Out of scope: product code
- Preserve: gameStore.test.ts


## Technical constraints
- No mocks of the store


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M844TV9RX2HXM3W5AAKNN0FF"
kind: unit
parent: 01M844TV9QMB3GSEN137790AHF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Remount restores saved state unit tests

Add tests asserting that state written to the mocked storage is restored on remount and that null saved state starts fresh.

## Acceptance criteria
- Given Search performed, when App unmounted, remounted and Begin clicked, then history has the hidden door text and Bookshelf data-open is true
- Given readSaved returns null, when App begins, then the Dialogue region shows the opening text


## Scope
- In scope: game/frontend/tests/appFlow.test.tsx
- Out of scope: Product code
- Preserve: tests/useGame.test.tsx


## Technical constraints
- Intro gate resets on remount, so Begin must be clicked again


## Dependencies
- A3


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M85XYJFK7XYFJ2GF9FN6QNT2"
kind: unit
parent: 01M85XYJFJTP6P70ERPF2MVDNA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Suggest button opens the contribution dialog unit tests

Component test for HeaderOverlay plus App test with api client and Phaser mocked.

## Acceptance criteria
- onSuggest called once on click.
- App opens the dialog from the header button and renders exactly one such button.
- Focus returns to the header button on Escape.


## Scope
- In scope: tests/headerSuggest.test.tsx
- In scope: tests/appHeaderSuggest.test.tsx
- Out of scope: product code
- Preserve: tests/appContributionFocus.test.tsx


## Technical constraints
- Mock ../src/api/client getCurrentRound and listMine; mock phaser, createGame, BootScene and ResizeObserver exactly as tests/appContributionFocus.test.tsx does.


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None

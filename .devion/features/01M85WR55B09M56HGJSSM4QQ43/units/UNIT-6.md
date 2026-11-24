---
id: "01M85WR55C89W9RT7HC8KGV35Z"
kind: unit
parent: 01M85WR55C7STPY6BDWCWEK484
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: buildEffects depth, per-type creation and destroyEffects unit tests

Unit tests with a fake EffectRenderContext and BootScene mocks.

## Acceptance criteria
- Six createEffect calls at layer depth
- destroy called on all handles
- BootScene shutdown calls destroyEffects


## Scope
- In scope: game/tests
- In scope: game/frontend/tests
- Out of scope: real Phaser
- Preserve: existing buildEffects tests


## Technical constraints
- Unit tests only; context faked


## Dependencies
- ACT3


## Definition of done
- Tests pass


## Clarifying questions
- None

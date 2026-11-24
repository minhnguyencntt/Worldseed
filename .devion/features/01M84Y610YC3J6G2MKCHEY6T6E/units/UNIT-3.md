---
id: "01M84Y610ZAJZYKTV7202QD2JR"
kind: unit
parent: 01M84Y610Y2QQFCNE90MN5HN1A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: playSceneTransition unit tests with a mocked context

Unit tests in game/tests/playSceneTransition.test.ts using a fake EffectRenderContext, mirroring game/tests/buildEffects.test.ts.

## Acceptance criteria
- Test asserts playTransition called once with 400 for a fade entry.
- Test asserts playTransition not called without a transition entry.


## Scope
- In scope: New test file
- Out of scope: Phaser
- Preserve: Existing tests


## Technical constraints
- Fake context made of vi.fn(); no Phaser


## Definition of done
- Tests pass


## Clarifying questions
- None

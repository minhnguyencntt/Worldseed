---
id: "01M84XZS83G2BB3BMMX1XJYBW3"
kind: unit
parent: 01M84XZS83EHNAVNSAG5DTG41E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: playSceneTransition unit tests with a mocked context

Add game/tests/playSceneTransition.test.ts reusing the fake-context pattern and validScene fixture from tests/buildEffects.test.ts.

## Acceptance criteria
- playTransition called once with 400 for a fade scene
- playTransition not called without a transition entry or effects


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Every dependency is a vi.fn


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None

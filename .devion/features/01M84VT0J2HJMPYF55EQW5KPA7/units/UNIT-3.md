---
id: "01M84VT0J3FSB0046BVWZXA682"
kind: unit
parent: 01M84VT0J202TT42DB7C51XRBE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Phaser-mocked config render and scale unit tests

Extend phaserConfig.test.ts, which already mocks phaser via vi.mock.

## Acceptance criteria
- render exactly matches pixel-art settings
- scale has FIT, CENTER_BOTH, autoRound true


## Scope
- In scope: tests/phaserConfig.test.ts
- Out of scope: product code
- Preserve: Existing tests and the vi.mock block


## Technical constraints
- phaser stays mocked


## Definition of done
- Tests pass


## Clarifying questions
- None

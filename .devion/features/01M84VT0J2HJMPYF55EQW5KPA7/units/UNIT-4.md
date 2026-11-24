---
id: "01M84VT0J3TG1Q3804HR5NJN7V"
kind: unit
parent: 01M84VT0J2MQ5R0R8VA6XDK46D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: computeZoom invalid dpr unit tests

Add tests to phaserConfig.test.ts for the dpr guard.

## Acceptance criteria
- NaN, 0, -1 dpr give 2 at 1280x720
- dpr 2 at 1000x600 gives integer >= 1


## Scope
- In scope: tests/phaserConfig.test.ts
- Out of scope: product code
- Preserve: Existing tests


## Technical constraints
- phaser stays mocked


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M85Z6HPC6TRRF1ZQ4JMECZV0"
kind: unit
parent: 01M85Z6HPBV2QB6YBZDFSNZF4R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: anchorFor maths and PhaserHost layout reporting unit tests

Test anchorFor with fixed inputs and PhaserHost onLayout with createGame, ResizeObserver and matchMedia faked.

## Acceptance criteria
- Anchor results match the formula for zoom, offset and DPR
- onLayout fires on mount and on resize


## Scope
- In scope: frontend/tests/anchor.test.ts
- In scope: frontend/tests/phaserHostLayout.test.tsx
- Out of scope: Real browser
- Preserve: Existing phaserHost tests


## Technical constraints
- All dependencies mocked
- Phaser stays on 3.90.x


## Dependencies
- ACT1


## Definition of done
- Both test files pass


## Clarifying questions
- None

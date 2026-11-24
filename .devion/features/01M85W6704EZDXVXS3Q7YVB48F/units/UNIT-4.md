---
id: "01M85W6705YESTDK5K0Q3GDAWX"
kind: unit
parent: 01M85W67040N1DWBZAFHXB0R6G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Manifest palette and size test covers the item icons and no svg

Extend game/frontend/tests/sceneArtSources.test.ts, which already imports generateAssets, readPngSize and the committed manifest, with item icon assertions.

## Acceptance criteria
- Test asserts at least six item/ ids are generated and committed.
- Test asserts each item PNG size equals 16x16 and the declared dimensions.
- Test asserts no committed manifest path ends in .svg.


## Scope
- In scope: game/frontend/tests/sceneArtSources.test.ts
- Out of scope: Product code changes
- Preserve: Existing assertions in the file


## Technical constraints
- Unit test reading the committed manifest JSON import only; no app or browser.


## Dependencies
- ACT2


## Definition of done
- sceneArtSources.test.ts passes.


## Clarifying questions
- None

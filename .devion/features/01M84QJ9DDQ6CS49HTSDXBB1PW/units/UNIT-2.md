---
id: "01M84QJ9DE9PTNKA72XAA5ESPH"
kind: unit
parent: 01M84QJ9DDVMMF1FTACZ8ZKKH3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm checkAssetRefs is pure and exported for chained tests

checkAssetRefs is a pure exported function over an AssetManifest and string refs; confirm so it can be chained after the mocked loader.

## Acceptance criteria
- checkAssetRefs is exported
- It has no I/O


## Scope
- In scope: manifestLoader.ts
- Out of scope: Tests
- Preserve: Signature


## Technical constraints
- Code path: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Function confirmed pure


## Clarifying questions
- None

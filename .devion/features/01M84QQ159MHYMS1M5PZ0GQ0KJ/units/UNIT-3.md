---
id: "01M84QQ1598KEPBE3ZQQMCPMQM"
kind: unit
parent: 01M84QQ15900SXMSEV51SJNEJD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: SVG assets resolve with manifest dimensions unit tests

Add game/tests/publicAssetSvgs.test.ts. It reads the real manifest.json and the static asset files read-only (no writes, no app, no network) and asserts each SVG path exists with matching dimensions.

## Acceptance criteria
- Missing SVG list is empty
- SVG width/height equal manifest dimensions
- SVG root is svg with crispEdges


## Scope
- In scope: One new test file
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- vitest; resolve root as ../public/assets via import.meta.url


## Dependencies
- ACT1


## Definition of done
- Test file passes


## Clarifying questions
- None

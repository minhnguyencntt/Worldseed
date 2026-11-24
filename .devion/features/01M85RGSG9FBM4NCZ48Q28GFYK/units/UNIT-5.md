---
id: "01M85RGSG9ZBY60SRZQFWHPHGP"
kind: unit
parent: 01M85RGSG95RVKMDM32QN3GP7K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: generateAssets and mergeManifest unit tests

Tests for generateAssets and mergeManifest from REQ-2 acceptance criteria.

## Acceptance criteria
- Sheet entry size and frames correct
- Single frame is image
- Merge replaces in place
- Out-of-range index throws


## Scope
- In scope: generateAssets.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Unit tests only; use assetSchema from game/src/assets/manifest/schema.ts to validate entries
- All colours from the shared palette


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None

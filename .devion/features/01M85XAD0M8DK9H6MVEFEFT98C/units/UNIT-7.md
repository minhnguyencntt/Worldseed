---
id: "01M85XAD0NA4HTBRZ69PK58BQD"
kind: unit
parent: 01M85XAD0NNJ29M76M3DA2DHXQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Frame grids, generated PNGs and removal of old SVGs

Test grid size, palette use, slice rules, manifest/PNG sizes and absence of old SVGs.

## Acceptance criteria
- Grid sizes and palette indices valid
- Manifest ids match PNG header sizes
- No panel-frame, sound or pointer svg


## Scope
- In scope: tests/uiFrames.test.ts
- Out of scope: product code
- Preserve: tests/assetFolders.test.ts


## Technical constraints
- Unit tests only; reads committed files with node fs


## Dependencies
- A3


## Definition of done
- uiFrames.test.ts passes


## Clarifying questions
- None

---
id: "01M85RGSG9Z0495T7WSWY5GVNW"
kind: unit
parent: 01M85RGSG9N24YPHX5BARHSY5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: encodePng determinism and readPngSize unit tests

Tests for encodePng and readPngSize written from REQ-1.

## Acceptance criteria
- Two encodes are equal
- Header size matches
- Only IHDR, IDAT, IEND chunks exist


## Scope
- In scope: pngEncode.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Unit tests only, no fs beyond memory
- Phaser pin untouched


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None

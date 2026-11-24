---
id: "01M85VQ95TQ8NJWB6Q1NS24TJ2"
kind: unit
parent: 01M85VQ95S9RJ58YFG37R7B0AR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scene art sources are PNG-sized, palette-only and match the committed manifest

Tests written from the requirement: coverage of ids, declared PNG sizes, palette-only pixels and committed manifest equality. No disk writes.

## Acceptance criteria
- Every required id is produced by generateAssets(ART_SOURCES)
- Each generated PNG reads back its declared size and gridToRgba accepts every index
- Committed manifest entries equal generated entries


## Scope
- In scope: New frontend test file
- Out of scope: Product code
- Preserve: roomSources.test.ts 13-name assertion


## Technical constraints
- Unit tests only, no browser or server


## Dependencies
- A1


## Definition of done
- Test passes in under a few seconds


## Clarifying questions
- None

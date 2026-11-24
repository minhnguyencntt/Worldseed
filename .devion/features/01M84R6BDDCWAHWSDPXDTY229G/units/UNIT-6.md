---
id: "01M84R6BDEBRDH18KABC03ZMA0"
kind: unit
parent: 01M84R6BDE5EA9RG8W73J8ZY5B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Background layer and chair/wardrobe assets resolve with matching dimensions unit tests

Add a test reading the real manifest and SVG files for the six new ids, checking existence, dimensions and colour variety.

## Acceptance criteria
- Missing ids fail the test
- Size mismatch fails the test


## Scope
- In scope: new test file
- Out of scope: app startup
- Preserve: existing tests


## Technical constraints
- Read-only fs, no server


## Definition of done
- Test passes


## Clarifying questions
- None

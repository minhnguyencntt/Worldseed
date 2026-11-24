---
id: "01M85RGSGAQWV6X6WQ5F3XCJ0Y"
kind: unit
parent: 01M85RGSG9A5951ZCTYZFE3EX6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: runGenerateArt identical bytes and npm script unit tests

Tests with fake IO for runGenerateArt and a read of package.json.

## Acceptance criteria
- Two runs write identical bytes
- Manifest written holds entry per source and matches PNG headers
- art:generate script exists


## Scope
- In scope: generateArtScript.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Fake IO only, no real writes beyond memory
- Reads package.json with node:fs readFileSync for the script check


## Dependencies
- ACT-3


## Definition of done
- Tests pass


## Clarifying questions
- None

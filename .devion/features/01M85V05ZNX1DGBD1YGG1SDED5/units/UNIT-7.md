---
id: "01M85V05ZPKKXZPWVHWKQAR3GY"
kind: unit
parent: 01M85V05ZPN09QQFVTJTAK9F00
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Boy manifest animations, sizes and generator unit tests

Test generateAssets with and without new fields and the boy entries from ART_SOURCES.

## Acceptance criteria
- Animations and origin copied
- Boy ids registered
- Entries validate


## Scope
- In scope: tests/boyManifest.test.ts
- Preserve: tests/generateAssets.test.ts


## Technical constraints
- Pure generateAssets, no fs


## Definition of done
- Test file passes


## Clarifying questions
- None

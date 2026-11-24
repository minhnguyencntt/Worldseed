---
id: "01M84Q712AMEQ4QJ7H6S7NWAZ2"
kind: unit
parent: 01M84Q7129MC8MC7ZVV11YBNPW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Asset folders and files unit tests

Write a unit test that checks the folder structure under game/public/assets using the real filesystem read-only.

## Acceptance criteria
- Given the 9 required folders, when each is read, then each has at least one non-empty file
- Given each svg, when read, then it begins with an svg root element


## Scope
- In scope: game/tests/assetFolders.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Vitest, node:fs only, no network


## Definition of done
- Test passes


## Clarifying questions
- None

---
id: "01M84WBX7M7J7G7W85EPEMDNRA"
kind: unit
parent: 01M84WBX7KJATZPD0TQB1NKDDD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Preload planning and missing-asset fallback unit tests

Pure unit tests over an in-memory manifest object; no filesystem.

## Acceptance criteria
- Given refs with a duplicate and a ghost id, the plan loads one entry and reports the ghost as missing
- Given a missing, undefined or failed-to-load asset id, resolveTextureKey returns the fallback key and never throws


## Scope
- In scope: game/tests/preload.test.ts
- Out of scope: product code


## Technical constraints
- Manifest built inline via parseManifest, no disk access


## Definition of done
- Tests green


## Clarifying questions
- None

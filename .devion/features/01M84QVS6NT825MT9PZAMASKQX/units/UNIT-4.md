---
id: "01M84QVS6P2CRN9K0V8M08V1SX"
kind: unit
parent: 01M84QVS6PEN370GZRXGK3JXYX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ui manifest entries validate and match SVG dimensions unit tests

Read-only unit tests over manifest.json and the ui SVGs; no app is started.

## Acceptance criteria
- Given manifest.json, When parsed with parseManifest, Then ok is true
- Given each ui entry, When its path is resolved under game/public/assets, Then the file exists and its SVG size equals the manifest dimensions


## Scope
- In scope: game/tests/publicAssetUiManifest.test.ts
- Out of scope: Browser checks
- Preserve: Existing tests


## Technical constraints
- Use parseManifest from ../src/assets/manifest


## Dependencies
- ACT2


## Definition of done
- Test file passes


## Clarifying questions
- None

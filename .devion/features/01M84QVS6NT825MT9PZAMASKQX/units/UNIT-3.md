---
id: "01M84QVS6PZBAW4E0TQZQSNH30"
kind: unit
parent: 01M84QVS6NJ8XSZ8V72MHBXRTA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ui folders each hold a real crisp SVG unit tests

Read-only unit tests over the on-disk tree under game/public/assets/ui; no app is started.

## Acceptance criteria
- Given each of icons, frames and cursors, When listed, Then at least one .svg exists and is non-empty
- Given each SVG, When read, Then it has width, height and crispEdges


## Scope
- In scope: game/tests/publicAssetUi.test.ts
- Out of scope: Browser checks
- Preserve: Existing tests


## Technical constraints
- Use node:fs and import.meta.url like game/tests/publicAssetSvgs.test.ts


## Dependencies
- ACT1


## Definition of done
- Test file passes


## Clarifying questions
- None

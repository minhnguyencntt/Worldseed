---
id: "01M855M826FFB71YM8EA71FZPA"
kind: unit
parent: 01M855M826XA4NEJ3H488X6FR4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add resolveTextureKey to the engine

Add a pure function that returns the id when the manifest knows it, and the fallback id otherwise.

## Acceptance criteria
- Known id returns itself
- Unknown or undefined id returns the fallback id


## Scope
- In scope: game/src/engine/planPreload.ts
- Out of scope: Tests
- Out of scope: BootScene wiring
- Preserve: planPreload behavior


## Technical constraints
- No import of manifestLoader
- New file: `game/src/engine/planPreload.ts`


## Dependencies
- REQ2
- ACT1


## Definition of done
- resolveTextureKey is exported


## Clarifying questions
- None

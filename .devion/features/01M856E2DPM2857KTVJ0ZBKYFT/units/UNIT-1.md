---
id: "01M856E2DQQ7YV3NR61HS5SGH3"
kind: unit
parent: 01M856E2DPNCP7VTQY51B19BBN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Mark planPreload and resolveTextureKey as pure exports

Context: planPreload.ts already exports both functions with no side effects. Desired behavior: add a comment guarding purity so tests can import them directly. Expected result: no behavior change.

## Acceptance criteria
- Given planPreload.ts, when imported, then planPreload and resolveTextureKey are named exports
- Given the file, when read, then it imports only types and performs no I/O


## Scope
- In scope: Comment in planPreload.ts
- Out of scope: Logic changes
- Preserve: Signatures and return values


## Technical constraints
- Type-only imports remain
- Code path: `game/src/engine/planPreload.ts`


## Definition of done
- Comment added, behavior unchanged


## Clarifying questions
- None

---
id: "01M85V05ZPQHN3FMZTYECMG5FX"
kind: unit
parent: 01M85V05ZPY2E6K6JH9X9ZW1DE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the 32x32 boy portrait source

Add a pure portrait grid builder and source to boy.ts.

## Acceptance criteria
- BOY_PORTRAIT_SOURCE has one 32x32 frame
- Only palette indices used


## Scope
- In scope: portrait in boy.ts
- Out of scope: sheet
- Preserve: sheet exports


## Technical constraints
- Shared palette max 48 colours
- New file: `game/frontend/src/art/boy.ts`


## Definition of done
- BOY_PORTRAIT_SOURCE exported


## Clarifying questions
- None

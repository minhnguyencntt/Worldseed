---
id: "01M85AJ8CFKWM0N8Q8MSFJCXGT"
kind: unit
parent: 01M85AJ8CFHKW2AGTZGJBVZJV8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Check scene characters in validateWorld

Add a loop over scene.characters ?? [] inside the per-scene loop of validateWorld that pushes a path-tagged error for ids absent from the characters Set.

## Acceptance criteria
- validateWorld returns the path-tagged error for an unknown scene character id
- Worlds with valid scene characters return no new errors


## Scope
- In scope: game/src/content/loader.ts
- Out of scope: tests
- Preserve: existing checks


## Technical constraints
- Code path: `game/src/content/loader.ts`


## Definition of done
- Loop added and the existing the-boys-room content still validates


## Clarifying questions
- None

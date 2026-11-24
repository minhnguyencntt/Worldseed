---
id: "01M85A0HWEJCCNPMB1YK2P12Y5"
kind: unit
parent: 01M85A0HWEPH9MY301JBDD1E8G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Validate scene characters in validateWorld

In validateWorld's per-scene loop add a pass over scene.characters.

## Acceptance criteria
- Unknown character id reported.
- Unknown interaction dialogue reported.
- Interaction events checked via checkEvents.


## Scope
- In scope: game/src/content/loader.ts
- Out of scope: tests
- Preserve: Existing error messages


## Technical constraints
- Reuse checkEvents and the existing ctx object
- Code path: `game/src/content/loader.ts`


## Dependencies
- ACT1


## Definition of done
- validateWorld extended


## Clarifying questions
- None

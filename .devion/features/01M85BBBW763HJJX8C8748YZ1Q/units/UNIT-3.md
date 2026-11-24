---
id: "01M85BBBW8FV9KHA07HTZ0JQMD"
kind: unit
parent: 01M85BBBW7KEC45Q0D947WW2CS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Document NPC id rejection in validateWorld

Add a comment on the scene.characters loop in validateWorld stating that unknown NPC ids produce a path-tagged error. No behavior change.

## Acceptance criteria
- Comment present above the characters loop
- Error message text unchanged


## Scope
- In scope: Comment in loader.ts
- Out of scope: Logic changes
- Preserve: Error format


## Technical constraints
- No runtime change
- Code path: `game/src/content/loader.ts`


## Definition of done
- Comment added


## Clarifying questions
- None

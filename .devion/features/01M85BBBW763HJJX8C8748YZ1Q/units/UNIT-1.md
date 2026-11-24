---
id: "01M85BBBW86184SCB4NSD0CJN7"
kind: unit
parent: 01M85BBBW7Z40KS018CZVN1Y9A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Document the scene character contract on characterSchema

Add a doc comment on characterSchema stating that scene.characters may hold any number of NPCs, each with a required idle animation. No behavior change.

## Acceptance criteria
- characterSchema carries a comment naming idle as required
- Schema behavior is unchanged


## Scope
- In scope: Comment in schema.ts
- Out of scope: Schema changes
- Preserve: All schema fields


## Technical constraints
- No runtime change
- Code path: `game/src/content/schema.ts`


## Definition of done
- Comment added and tsc still passes


## Clarifying questions
- None

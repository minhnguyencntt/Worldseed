---
id: "01M84R6BDE4WCCJS13KEY4J3HM"
kind: unit
parent: 01M84R6BDETVCK5ENHTAAGATXA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Validate frame counts and animation frames in assetSchema

Add dimension and animation index checks to the spritesheet superRefine.

## Acceptance criteria
- Over-wide frame counts are reported
- Out-of-range animation frames are reported


## Scope
- In scope: schema.ts
- Out of scope: tests
- Preserve: existing issues


## Technical constraints
- Use ctx.addIssue, no throws
- Code path: `game/src/assets/manifest/schema.ts`


## Definition of done
- Checks implemented


## Clarifying questions
- None

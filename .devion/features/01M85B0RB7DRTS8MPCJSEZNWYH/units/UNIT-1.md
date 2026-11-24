---
id: "01M85B0RB861C2QZAS0XMN88EN"
kind: unit
parent: 01M85B0RB8VN2GS0PE22KD4JZY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm characterSchema exposes the defaults and rules the tests assert

Read characterSchema in game/src/content/schema.ts and confirm the defaults and required fields the tests need exist and are exported. Edit only if one is missing.

## Acceptance criteria
- characterSchema is a named export of game/src/content/schema.ts
- characterSchema defines scale default 1, layer default 'characters' and required animations.idle


## Scope
- In scope: game/src/content/schema.ts characterSchema
- Out of scope: Tests
- Preserve: Existing schema field names


## Technical constraints
- Do not rename exports
- Code path: `game/src/content/schema.ts`


## Definition of done
- characterSchema has the three rules and the typecheck passes


## Clarifying questions
- None

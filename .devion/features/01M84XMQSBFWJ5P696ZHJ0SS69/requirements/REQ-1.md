---
id: "01M84XMQSB4VEBKD6F3AFSXQNY"
kind: requirement
parent: 01M84XMQSBFWJ5P696ZHJ0SS69
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene content declares dust, ambient light and a fade transition with validation

Context: sceneSchema has no effects field. Desired: effectSchema as a discriminated union of dust (asset, count, area), ambientLight (color, alpha) and transition (type fade, durationMs). Expected: bedroom.yaml carries them and loads without errors.

## Acceptance criteria
- Given a scene with valid dust, ambientLight and fade entries, when parseWorldContent('scene') runs, then ok is true
- Given a fade with negative durationMs, when parsed, then errors include a path starting with effects.0
- Given a scene without effects, when parsed, then it still validates


## Scope
- In scope: game/src/content/schema.ts
- In scope: bedroom.yaml
- Out of scope: rendering
- Preserve: objectSchema
- Preserve: existing scene fields


## Technical constraints
- zod schemas
- effects optional


## Definition of done
- Schema and content merged


## Clarifying questions
- None

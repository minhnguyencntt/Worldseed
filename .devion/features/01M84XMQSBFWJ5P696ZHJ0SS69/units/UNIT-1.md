---
id: "01M84XMQSC6XKBCEKW5A19JWC1"
kind: unit
parent: 01M84XMQSB4VEBKD6F3AFSXQNY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add effectSchema and bedroom effects content

Add effectSchema and an optional effects array to sceneSchema, export EffectSpec, and add dust, ambientLight and fade entries to bedroom.yaml.

## Acceptance criteria
- effectSchema is exported and sceneSchema.effects is optional
- bedroom.yaml has one dust, one ambientLight and one fade effect


## Scope
- In scope: schema.ts
- In scope: bedroom.yaml
- Out of scope: tests
- Preserve: existing exports


## Technical constraints
- Code path: `game/src/content/schema.ts`
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`


## Definition of done
- Scene content validates


## Clarifying questions
- None

---
id: "01M84XMQSCB8SZ65N13AAEHFTB"
kind: unit
parent: 01M84XMQSB9FF8F3ZWB2YANW9G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add EffectRenderContext and buildEffects

Add effect context types and buildEffects.

## Acceptance criteria
- buildEffects returns handles for dust and ambient light only
- buildEffects plays the fade transition through the context


## Scope
- In scope: engine
- Out of scope: tests
- Preserve: RenderContext


## Technical constraints
- Code path: `game/src/engine/renderContext.ts`
- New file: `game/src/engine/buildEffects.ts`


## Dependencies
- A1


## Definition of done
- Module compiles


## Clarifying questions
- None

---
id: "01M84PY428PYD7R706RQS8TARH"
kind: requirement
parent: 01M84PY428G921DS1DK5TC0Y6V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Zod schemas for objects, scenes and worlds

Context: no runtime schema exists for object content. Desired behavior: objectSchema covers id, name, description, asset, position, scale, layer, interactionBounds, actions, visibleWhen conditions and persistentState; scene and world schemas wrap it. Expected result: parseWorldContent returns typed data or path-named errors. Why: validated content for AI authoring.

## Acceptance criteria
- Given a valid object with all fields, when parsed, then ok is true
- Given an object with layer 'sky', when parsed, then errors include path ending in layer
- Given an object without position, when parsed, then errors include path ending in position
- Given scale omitted, when parsed, then scale defaults to 1


## Scope
- In scope: game/src/content/schema.ts
- Out of scope: loader wiring
- Preserve: manifest schema untouched


## Technical constraints
- Layers: background, furniture, objects, characters, effects, ui
- Action ids: inspect, push, search, leave


## Definition of done
- Schema exported and typed


## Clarifying questions
- None

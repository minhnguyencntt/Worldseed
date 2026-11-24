---
id: "01M84PY428G921DS1DK5TC0Y6V"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.2 · Validated object and world content schema

Context: game/src has a manifest zod schema but object and world content is loaded without a runtime schema, and the-boys-room lives in game/content/worlds. Desired behavior: a zod object/world schema covering position, scale, layer, interaction bounds, actions, visibility conditions and persistent-state fields, with the-boys-room content adapted to it under game/src/content/worlds/the-boys-room. Expected result: loadWorld returns schema-validated content from the new location. Why: future AI cycles add objects through content only.

## Acceptance criteria
- Given an object with position, scale, layer, interactionBounds, actions, visibleWhen and persistentState, when parsed by the schema, then it succeeds
- Given invalid object content, when parsed, then a path-named error is returned without throwing
- Given the-boys-room under src/content/worlds, when loadWorld runs, then it loads and passes validateWorld


## Scope
- In scope: game/src content schema
- In scope: move and adapt the-boys-room content
- In scope: loader and frontend glob path
- In scope: scene view visibility and persistent state
- Out of scope: Phaser rendering
- Out of scope: asset art
- Out of scope: backend
- Preserve: existing manifest schema
- Preserve: existing action ids and events
- Preserve: bookshelf secret door flag behavior


## Technical constraints
- zod already a dependency of game/
- Content stays YAML


## Definition of done
- All three requirements verified by unit tests


## Clarifying questions
- None

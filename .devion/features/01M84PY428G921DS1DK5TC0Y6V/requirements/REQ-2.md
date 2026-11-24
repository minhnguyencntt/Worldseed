---
id: "01M84PY428HZM5F652E0K6V2CC"
kind: requirement
parent: 01M84PY428G921DS1DK5TC0Y6V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · the-boys-room content lives in src/content/worlds and is schema-validated on load

Context: content is at game/content/worlds/the-boys-room, read by loader.ts and by the frontend import.meta.glob. Desired behavior: files move to game/src/content/worlds/the-boys-room with each object given asset, position, scale, layer, interactionBounds; loadWorld validates via schema. Expected result: loadWorld on the new dir succeeds, malformed scenes fail with a path-named error. Why: content separated from engine in the target structure.

## Acceptance criteria
- Given the new directory, when loadWorld runs, then six bedroom objects load each with a layer and position
- Given a scene object lacking position, when loadWorld runs, then it throws naming the field path
- Given the old game/content directory, then it no longer exists


## Scope
- In scope: git mv content to src/content/worlds
- In scope: scene yaml fields
- In scope: loadWorld validation
- In scope: frontend glob path
- Out of scope: new art
- Preserve: action ids, texts, flags, dialogue


## Technical constraints
- Object ids unchanged: bed, bookshelf, desk, old-computer, window, door


## Dependencies
- R1


## Definition of done
- Content relocated and validated


## Clarifying questions
- None

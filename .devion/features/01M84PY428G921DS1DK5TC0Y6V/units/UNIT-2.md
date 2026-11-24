---
id: "01M84PY428QAYEW92YJTQ8P4AD"
kind: unit
parent: 01M84PY428HZM5F652E0K6V2CC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Move the-boys-room content to src/content/worlds and validate in loadWorld

git mv content, add new fields to bedroom objects, validate scenes via schema in loadWorld, update frontend glob.

## Acceptance criteria
- Content loads from new path
- Malformed scene throws with path


## Scope
- In scope: content move
- In scope: loader
- In scope: frontend glob
- In scope: ObjectDef type
- Out of scope: tests
- Preserve: action text and flags


## Technical constraints
- Keep openWhenFlag replaced by persistentState for bookshelf
- New file: `game/src/content/worlds/the-boys-room/world.yaml`
- New file: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- Code path: `game/src/content/loader.ts`
- Code path: `game/src/state/types.ts`
- Code path: `game/frontend/src/runtime/content.ts`


## Definition of done
- Old game/content removed


## Clarifying questions
- None

---
id: "01M84Q712AX59SBCFC6862K6CX"
kind: unit
parent: 01M84Q7129V94JK8ABC5KKY3PP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the-boys-room manifest.json

Create manifest.json with version 1 and an asset entry per file created for the-boys-room and ui.

## Acceptance criteria
- Given the file, when parsed, then it satisfies manifestSchema
- Given each entry, when its path is resolved, then the file exists


## Scope
- In scope: manifest.json
- Out of scope: loader code
- Preserve: asset files


## Technical constraints
- Spritesheet entries need frames and dimensions
- Unique ids
- New file: `game/public/assets/worlds/the-boys-room/manifest.json`


## Definition of done
- File written


## Clarifying questions
- None

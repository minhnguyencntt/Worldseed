---
id: "01M84Q7129V94JK8ABC5KKY3PP"
kind: requirement
parent: 01M84Q71292X7V428FS4Q7E80Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Manifest file lists every asset with schema-valid entries

Context: parseManifest validates id, path, type, dimensions, frames, animations, origin and bounds. Desired behavior: game/public/assets/worlds/the-boys-room/manifest.json with version 1, one entry per asset from the folder tree, paths relative to game/public/assets, and ids objects/bed, objects/bookshelf, objects/desk, objects/old-computer, objects/window, objects/door matching bedroom.yaml. The boy spritesheet has frames and idle animation. Expected result: parseManifest returns ok.

## Acceptance criteria
- Given manifest.json, when parseManifest runs, then ok is true
- Given bedroom.yaml, when each object asset ref is looked up, then a manifest id exists
- Given the boy spritesheet entry, when read, then it has frameCount 2 and an idle animation


## Scope
- In scope: manifest.json
- Out of scope: schema changes
- Preserve: manifestSchema


## Technical constraints
- Paths relative to game/public/assets


## Definition of done
- manifest.json committed and valid


## Clarifying questions
- None

---
id: "01M8433BDQZ38SKQA2FHVX9NH3"
kind: unit
parent: 01M8433BDP0FQCE10PSS82FZQB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the-boys-room world and bedroom YAML

Write the declarative content matching the runtime types.

## Acceptance criteria
- Given the YAML, when loaded, then it matches SceneDef and WorldDef.
- Given the bookshelf, when searched, then secret_door_open is set.


## Scope
- In scope: two YAML files
- Out of scope: tests


## Technical constraints
- Flags declared in world.yaml
- New file: `backend/game/content/worlds/the-boys-room/world.yaml`
- New file: `backend/game/content/worlds/the-boys-room/scenes/bedroom.yaml`


## Dependencies
- REQ-CT
- ACT-LD


## Definition of done
- Files exist and validate


## Clarifying questions
- None

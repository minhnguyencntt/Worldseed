---
id: "01M8433BDP0FQCE10PSS82FZQB"
kind: requirement
parent: 01M8433BDP22G3MWEH7V8ZKH7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The Boy's Room world and bedroom content

Context: content directory does not exist. Desired behavior: world the-boys-room starting in bedroom; the boy asks 'I don't know what to do next. What should we do?'; objects bed, bookshelf (search opens hidden door via flag secret_door_open), desk, old computer, window, door, each with inspect/push/search/leave actions where relevant. Why: playable first scene.

## Acceptance criteria
- Given the content, when loaded and validated, then validateWorld returns no errors.
- Given the opening dialogue node, when read, then its text equals "I don't know what to do next. What should we do?" spoken by the boy.
- Given the scene, when read, then objects bed, bookshelf, desk, old-computer, window and door exist.
- Given the bookshelf search action, when performed, then flag secret_door_open becomes true.


## Scope
- In scope: backend/game/content/worlds/the-boys-room/world.yaml
- In scope: scenes/bedroom.yaml
- Out of scope: art
- Out of scope: other scenes


## Technical constraints
- Schema must match types in backend/game/src/state/types.ts


## Dependencies
- REQ-LD


## Definition of done
- Content validates


## Clarifying questions
- None

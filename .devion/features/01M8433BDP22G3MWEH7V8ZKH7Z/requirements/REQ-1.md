---
id: "01M8433BDPK5HHP66KS2Q726ZV"
kind: requirement
parent: 01M8433BDP22G3MWEH7V8ZKH7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pure runtime systems over serializable game state

Context: no game runtime exists. Desired behavior: a GameState (currentScene, inventory, discoveredObjects, completedQuests, relationships, flags, history, activeDialogue) and pure systems that evaluate conditions, apply events, run object actions, advance dialogue and switch scenes. Expected result: every function takes state and returns a new state. Why: deterministic, testable, persistable gameplay.

## Acceptance criteria
- Given a state and an action with events set_flag, add_item, goto_scene, when performAction runs, then the returned state has the flag, item and new currentScene and the original state is unchanged.
- Given a condition {flag,equals} or {has_item}, when evaluated, then it returns true or false matching the state.
- Given a dialogue node with choices, when a choice is selected, then its events are applied, history records it and the next node becomes active.
- Given an action whose conditions fail, when performed, then the state is returned unchanged.


## Scope
- In scope: backend/game/src/state
- In scope: backend/game/src/systems
- In scope: backend/game/src/engine scene logic
- Out of scope: YAML parsing
- Out of scope: UI


## Technical constraints
- Pure functions, no I/O
- Action ids limited to inspect, push, search, leave


## Definition of done
- Modules compile under tsc strict


## Clarifying questions
- None

---
id: "01M859KF8TRGXPZTM1CXZRTZCZ"
kind: requirement
parent: 01M859KF8SN3WBSMX7TEGBD8NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Clicking bookshelf, computer, bed, window or door runs contextual actions updating flags, dialogue and inventory

Context: only bookshelf search and computer search set flags; no action adds items, no action changes dialogue. Desired: bed search adds old-key, computer search sets computer_on and starts a dialogue, window inspect sets window_seen, door leave is conditional on hasItem old-key and sets door_unlocked. Expected: inventory and flags update via performAction. Why: interactions change real state.

## Acceptance criteria
- Given the bed, when search is performed, then inventory contains old-key and a history line is added
- Given the computer, when search is performed, then flag computer_on is true
- Given the window, when inspect is performed, then flag window_seen is true
- Given no old-key, when door leave is attempted, then state is unchanged; with old-key it sets door_unlocked true
- Given bookshelf search, then secret_door_open is true


## Scope
- In scope: bedroom.yaml action events
- In scope: world.yaml flags
- Out of scope: New action ids beyond inspect, push, search, leave
- Preserve: Existing inspect texts
- Preserve: performAction semantics


## Technical constraints
- Action ids limited to the actionSchema enum


## Dependencies
- INT


## Definition of done
- Five objects have state-changing actions


## Clarifying questions
- None

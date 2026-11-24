---
id: "01M85HGG8MGN0HY726W3BARVXN"
kind: requirement
parent: 01M85HGG8MWW9FGFSXB8039ERZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Store changes such as the secret door and inventory are pushed into the scene

Context: BootScene.create subscribes to useGameStore and onStateChange calls sync on every SceneObject; SceneObject visibility derives from flag and hasItem conditions. Desired behavior: confirm this path and keep it intact. Expected result: opening the secret door (flag secret_door_open) or gaining an inventory item updates scene visibility. Why: store is the single source of truth.

## Acceptance criteria
- Given a created scene, when the store state gains flag secret_door_open true, then every SceneObject.sync is called with that state
- Given a created scene, when the store inventory changes, then every SceneObject.sync is called with the new inventory
- Given a null store state, when onStateChange runs, then no sync is called


## Scope
- In scope: BootScene.onStateChange and subscription
- Out of scope: New content conditions
- Preserve: Subscription release on SHUTDOWN


## Technical constraints
- BootScene reads state only through useGameStore


## Definition of done
- Store to scene sync confirmed and covered


## Clarifying questions
- None

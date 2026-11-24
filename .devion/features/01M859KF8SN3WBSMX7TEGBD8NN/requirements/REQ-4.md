---
id: "01M859KF8TY8NF7FBN1G9AWZQ1"
kind: requirement
parent: 01M859KF8SN3WBSMX7TEGBD8NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Persistent object states survive save, restore and re-entering the room

Context: persistence round-trips flags but deserializeState checks only container types, and no secret door object exists in the scene. Desired: a secret-door-open object visible when secret_door_open is true, and strict validation of array and record element types. Expected: door stays open after restore and after leaving and re-entering. Why: persistent world.

## Acceptance criteria
- Given secret_door_open true, when getSceneView runs, then secret-door-open is present; when false it is absent
- Given a saved state with the flag, when deserialized, then the flag remains true
- Given a save with non-string inventory items or non-boolean flags, when deserialized, then it throws and readSaved returns null
- Given goto_scene away and back, then flags and inventory are unchanged


## Scope
- In scope: secret-door-open object
- In scope: deserializeState element validation
- Out of scope: Server-side saves
- Preserve: Save key
- Preserve: serializeState format


## Technical constraints
- localStorage only, no database


## Dependencies
- INT


## Definition of done
- Restore and re-entry keep the door open


## Non-functional requirements
- Corrupt saves fall back to a fresh game


## Clarifying questions
- None

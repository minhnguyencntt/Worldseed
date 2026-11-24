---
id: "01M84X7J0804WRYFB9Y0FCMK94"
kind: requirement
parent: 01M84X7J07NASDFQQ1R4CJ9K97
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Interaction helper provides hit-testing, available actions and activation keys

Context: ObjectSpec carries interactionBounds (relative to position, scaled) and actions with conditions, but nothing evaluates them. Desired behavior: a pure helper exposes pointInBounds, availableActions, isActivationKey and nextFocusIndex. Expected result: SceneObject and buildScene reuse one tested helper. Why: the intent requires using an interaction helper.

## Acceptance criteria
- Given bounds {x:0,y:0,width:40,height:80}, position (100,200), scale 2, When point (110,210) is tested, Then it is a hit and (190,210) is a miss
- Given an object without interactionBounds, When point-tested, Then the result is a miss
- Given actions with and without failing conditions, When availableActions runs, Then only passing actions are returned in authored order
- Given keys Enter and ' ', When isActivationKey runs, Then true; for 'a' false
- Given count 3, index 2 and delta +1, When nextFocusIndex runs, Then 0; with count 0 it returns -1


## Scope
- In scope: game/src/systems/interaction.ts
- Out of scope: Rendering
- Out of scope: React UI
- Preserve: conditions.ts behavior


## Technical constraints
- No Phaser or DOM imports


## Definition of done
- Helper exported and typed against ObjectSpec


## Clarifying questions
- None

---
id: "01M859KF8T3YPJQZBJHA3SVZYN"
kind: requirement
parent: 01M859KF8SN3WBSMX7TEGBD8NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy and NPC characters are data-driven and animate idle, walk and interact from the manifest

Context: bedroom.yaml has no characters; manifest has character:boy (idle), character:boy-walk, character:boy-interact; BootScene only loads image assets. Desired: a validated scene characters list, a pure animation resolver with idle fallback, preloading of spritesheets and Phaser sprites playing idle and interact on object click. Expected: boy shown idling, interact animation on click. Why: living scene, NPCs addable by content only.

## Acceptance criteria
- Given a character spec with idle, walk and interact entries, when resolved against the manifest, then each returns that sheet's animation name
- Given a state with no matching entry or unknown asset, when resolved, then the idle animation is returned
- Given scene yaml with a characters list, when parsed by sceneSchema, then valid characters pass and a missing animations.idle fails with a path-named error
- Given an objectClick event, when BootScene handles it, then the boy plays interact then returns to idle


## Scope
- In scope: sceneSchema characters
- In scope: characterAnimation resolver
- In scope: planPreload character assets
- In scope: BootScene character sprites and anims
- Out of scope: Pathfinding movement
- Out of scope: New sprite art
- Preserve: Existing object rendering
- Preserve: planPreload dedupe behavior


## Technical constraints
- planPreload stays pure with no Phaser import
- Pixel-art settings unchanged


## Dependencies
- INT


## Definition of done
- Boy defined in bedroom.yaml and animates
- NPC addable by yaml only


## Clarifying questions
- None

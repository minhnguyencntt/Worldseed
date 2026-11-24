---
id: "01M85ADG6QZCF4SHF92VXJNB86"
kind: requirement
parent: 01M85ADG6Q7BQQ3KWW910XQ9B3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene emits characterClick when an NPC is clicked and still plays interact

Context: createCharacter's pointerdown handler returns early when idleKey is missing or interactKey equals idleKey, so any emit placed after those guards would be skipped for characters without a distinct interact animation. Desired behavior: emit characterClick { id: spec.id } first on every click, then run the existing animation logic. Expected result: React always learns of the click. Why: NPCs without interact animations must still be clickable.

## Acceptance criteria
- Given a character sprite, When its pointerdown listener runs, Then phaserToReact emits characterClick with { id: spec.id }.
- Given a character whose interact animation exists, When clicked, Then sprite.play is called with the interact key after the emit.
- Given a character with no distinct interact animation, When clicked, Then characterClick is still emitted and no animation change occurs.


## Scope
- In scope: createCharacter pointerdown handler in BootScene.ts
- Out of scope: events.ts type
- Out of scope: React handling
- Preserve: idle animation start
- Preserve: interact then idle via ANIMATION_COMPLETE
- Preserve: objectClick forwarding


## Technical constraints
- Use phaserToReact already imported in BootScene.ts
- Phaser 3.90 APIs only


## Dependencies
- REQ1


## Definition of done
- Emit occurs before animation guards


## Clarifying questions
- None

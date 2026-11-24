---
id: "01M85ADG6RF1ZKV9VA9KYF5MBN"
kind: unit
parent: 01M85ADG6QZCF4SHF92VXJNB86
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit characterClick from the BootScene character pointerdown handler

In createCharacter, the POINTER_DOWN listener first emits characterClick { id: spec.id } on phaserToReact, then runs the existing interact animation logic.

## Acceptance criteria
- Given a click on a character sprite, When the handler runs, Then characterClick { id: spec.id } is emitted.
- Given the interact animation exists, When clicked, Then it still plays and returns to idle.


## Scope
- In scope: BootScene.createCharacter pointerdown handler
- Out of scope: React subscribers
- Preserve: animation behavior
- Preserve: objectClick forwarding


## Technical constraints
- Depends on characterClick type from the events file
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- Emit placed before the early-return guards


## Clarifying questions
- None

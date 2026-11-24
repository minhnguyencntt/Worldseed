---
id: "01M85A0HWE9R8E4D8FQX8ECQ62"
kind: requirement
parent: 01M85A0HWDK76C3VQXJ7F11SYM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene spawns NPCs from scene data and reports their interaction

Context: BootScene.createCharacter spawns and animates sprites from scene.characters but a click only plays the interact animation. Desired behavior: add a characterClick event to PhaserToReactEvents and emit it from the sprite pointerdown handler when the spec has an interaction. Expected result: React can open the NPC dialogue without engine changes. Why: completes data-driven NPC support.

## Acceptance criteria
- Given scene.characters with two entries, When create runs, Then add.sprite is called twice with each position and each sprite plays its idle animation.
- Given a character with interaction.dialogue 'greet', When pointerdown fires, Then characterClick is emitted with { id, dialogue: 'greet' }.
- Given a character without interaction, When pointerdown fires, Then no characterClick is emitted and the interact animation still plays.


## Scope
- In scope: frontend/src/phaser/events.ts
- In scope: frontend/src/phaser/BootScene.ts createCharacter
- Out of scope: React-side handling of characterClick
- Preserve: Existing interact-then-idle animation behavior
- Preserve: Sprite cleanup on SHUTDOWN


## Technical constraints
- Phaser 3.90 APIs only


## Dependencies
- REQ1


## Definition of done
- Event typed and emitted; sprites spawn per scene character


## Clarifying questions
- None

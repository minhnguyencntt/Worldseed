---
id: "01M85ADG6Q7BQQ3KWW910XQ9B3"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1.2 · BootScene emits a typed characterClick event to React

Context: BootScene.createCharacter (game/frontend/src/phaser/BootScene.ts) plays the interact animation on pointerdown but tells React nothing. The typed bus in game/frontend/src/phaser/events.ts has only objectHover, objectClick and sceneReady. Desired behavior: add a characterClick event type and emit it on NPC click without changing the animation. Expected result: React subscribers receive { id } for the clicked character. Why: dialogue and interaction for NPCs (SG-6.1) needs a typed signal from Phaser.

## Acceptance criteria
- Given the PhaserToReactEvents interface, When characterClick is emitted with { id: 'boy' }, Then a subscribed handler receives exactly that payload once.
- Given a BootScene with a character sprite, When pointerdown fires on it, Then phaserToReact emits characterClick with the character spec id.
- Given a character with an interact animation, When it is clicked, Then the interact animation still plays and returns to idle.


## Scope
- In scope: characterClick type in events.ts
- In scope: emit in BootScene.createCharacter
- In scope: unit tests with Phaser mocked
- Out of scope: React-side handling of characterClick
- Out of scope: dialogue content for NPCs
- Out of scope: new assets
- Preserve: objectClick, objectHover and sceneReady events
- Preserve: existing interact-then-idle animation behavior
- Preserve: Phaser 3.90 APIs


## Technical constraints
- Phaser is mocked in unit tests; no browser or live server
- Use the existing phaserToReact bus; no new event system


## Definition of done
- characterClick is typed and emitted on NPC click
- Unit tests for event type and BootScene emit pass


## Clarifying questions
- None

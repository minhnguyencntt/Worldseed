---
id: "01M85A0HWE94EEYFXYHXK4W426"
kind: unit
parent: 01M85A0HWE9R8E4D8FQX8ECQ62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit characterClick from BootScene NPC sprites

Add the event type and emit it in createCharacter when the spec has an interaction.

## Acceptance criteria
- characterClick is typed in PhaserToReactEvents.
- Clicking an NPC with interaction emits it.


## Scope
- In scope: game/frontend/src/phaser/events.ts
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: tests
- Out of scope: React consumers
- Preserve: Interact animation behavior


## Technical constraints
- Phaser 3.90 APIs only
- Code path: `game/frontend/src/phaser/events.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- Event emitted on click


## Clarifying questions
- None

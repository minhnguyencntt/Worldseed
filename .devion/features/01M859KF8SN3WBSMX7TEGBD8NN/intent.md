---
id: "01M859KF8SN3WBSMX7TEGBD8NN"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6 · Characters, animations, game state, dialogue, inventory and persistence

Context: game/ already has a Zustand gameStore, pure systems (events, dialogue, inventory, interaction), localStorage persistence and boy spritesheets in the manifest, but nothing renders or animates characters, scene characters are not data-driven, opening choices have no outcomes, no action adds inventory items and the secret door object is not in the scene. Desired behavior: idle/walk/interact boy animations from the manifest, data-driven NPCs, the opening dialogue and choices progressing, contextual actions on bookshelf, computer, bed, window and door updating state, and persistent object states surviving leaving and re-entering the room. Expected result: unit tests cover action to state transitions, inventory, dialogue progression, persistence and restore and the secret door staying open. Why: playable state-driven adventure with no database.

## Acceptance criteria
- Given the manifest, when a character spec is resolved for idle, walk and interact, then the matching manifest spritesheet animation is returned
- Given the opening scene, when it loads, then the dialogue reads "I don't know what to do next. What should we do?" with choices "Look around the room" and "Let's explore"
- Given a click action on bookshelf, computer, bed, window or door, when performed, then dialogue, choices, inventory or flags change in the store
- Given the secret door was opened, when the state is saved, restored or the scene is re-entered, then the door stays open
- Given persistence, then only localStorage is used and no database is added


## Scope
- In scope: Character and NPC content schema and animation resolution
- In scope: Phaser character rendering
- In scope: Opening dialogue branches
- In scope: Object action events and inventory
- In scope: Secret door object and save validation
- Out of scope: Backend or database changes
- Out of scope: New artwork
- Out of scope: Contribution modal and round header
- Preserve: Zustand store as single state owner
- Preserve: Existing save key worldseed:game-state:v1
- Preserve: Existing passing tests


## Technical constraints
- Phaser 3.90.x
- localStorage only for persistence
- Content stays in game/src/content, runtime stays separate


## Definition of done
- All four requirements have Act and Verify units merged
- Unit tests green


## Non-functional requirements
- Corrupt saves never crash the game


## Clarifying questions
- None

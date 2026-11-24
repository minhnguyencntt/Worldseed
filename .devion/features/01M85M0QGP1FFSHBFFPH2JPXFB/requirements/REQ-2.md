---
id: "01M85M0QGQ0GA6NEGXQ1J9EPDR"
kind: requirement
parent: 01M85M0QGP1FFSHBFFPH2JPXFB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App emits interact animation and transition events from game actions

Context: App passes game.act to ActionMenu and game.choose to StoryPanel without telling Phaser. Desired behavior: after an object action App emits playAnimation {target:'boy',name:'interact'}, and when the action changes the active scene id it emits transitionTo. Expected result: unit tests show the events are emitted from game actions. Why: the screen reacts to gameplay.

## Acceptance criteria
- Given the playing view, when an ActionMenu action is chosen, then reactToPhaser emits playAnimation with target boy and name interact
- Given a game action that changes the scene id, when it completes, then reactToPhaser emits transitionTo with the new sceneId
- Given an action that leaves the scene id unchanged, when it completes, then no transitionTo is emitted


## Scope
- In scope: App wrapper around game.act
- In scope: Scene id change detection from game state
- Out of scope: Adding new scenes or content
- Out of scope: StoryPanel layout changes
- Preserve: game.act state updates
- Preserve: objectClick and menuClose bridges


## Technical constraints
- Use the existing reactToPhaser bus
- Do not mock the store in unit tests of state change


## Definition of done
- App emits both events from the action handler


## Clarifying questions
- None

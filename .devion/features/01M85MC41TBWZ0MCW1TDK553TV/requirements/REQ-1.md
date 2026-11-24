---
id: "01M85MC41TSRRRFAGTD3P72QR3"
kind: requirement
parent: 01M85MC41TBWZ0MCW1TDK553TV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene plays the matching character animation on playAnimation

Context: createCharacter in BootScene.ts (L105-L128) builds sprites but keeps no id lookup, and create() (L63-L85) never subscribes to reactToPhaser. Desired behavior: on playAnimation, find the character by id and play the resolved animation; interact returns to idle on completion. Unknown targets or names are ignored.

## Acceptance criteria
- Given target 'boy' and name 'interact', when playAnimation is emitted, then sprite.play is called with the interact key
- Given target 'boy' and name 'idle', when emitted, then sprite.play is called with the idle key
- Given an unknown target id, when emitted, then no play call occurs and nothing throws


## Scope
- In scope: BootScene character lookup by id
- In scope: playAnimation handler
- Out of scope: App emitting the event
- Preserve: Click behavior in createCharacter


## Technical constraints
- Name limited to CharacterAnimationName values


## Definition of done
- Handler implemented in BootScene


## Clarifying questions
- None

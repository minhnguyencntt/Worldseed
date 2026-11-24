---
id: "01M85MC41T37W8R2SXQ896KXFM"
kind: requirement
parent: 01M85MC41TBWZ0MCW1TDK553TV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene releases the playAnimation subscription on shutdown

Context: the SHUTDOWN handler in create() (L73-L83) releases keyboard, store, effects and objects. Desired behavior: the playAnimation unsubscribe function returned by reactToPhaser.on is also called there, so a stopped scene never touches destroyed sprites.

## Acceptance criteria
- Given the SHUTDOWN callback has run, when playAnimation is emitted, then sprite.play is not called
- Given the scene is running, when SHUTDOWN has not run, then the handler count on playAnimation is one


## Scope
- In scope: Unsubscribe in SHUTDOWN handler
- Out of scope: Other event cleanup
- Preserve: Existing cleanup order and behavior


## Technical constraints
- Use the unsubscribe function returned by reactToPhaser.on


## Definition of done
- Unsubscribe stored and called on shutdown


## Clarifying questions
- None

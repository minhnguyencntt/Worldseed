---
id: "01M85NA12KGW58S6618QFTX01W"
kind: unit
parent: 01M85NA12J3STAQ8RH0XHBWYVQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm SHUTDOWN handler calls and nulls unsubscribeTransition

The SHUTDOWN callback already calls unsubscribeTransition?.() and sets it to null. Read and keep it; add only if missing.

## Acceptance criteria
- SHUTDOWN handler calls unsubscribeTransition?.()
- The field is set to null afterward


## Scope
- In scope: SHUTDOWN handler in BootScene.create
- Out of scope: tests
- Preserve: other cleanup calls


## Technical constraints
- Keep inside the existing events.once(SHUTDOWN) callback
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Both lines present in SHUTDOWN


## Clarifying questions
- None

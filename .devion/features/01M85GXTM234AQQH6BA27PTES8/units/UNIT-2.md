---
id: "01M85GXTM39W4369P69CCWWJZR"
kind: unit
parent: 01M85GXTM3Z9TF48ZF30BBXZ6B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe App to the objectClick event from Phaser

Edit game/frontend/src/App.tsx to subscribe to phaserToReact objectClick and select that object, unsubscribing on unmount.

## Acceptance criteria
- Given objectClick is emitted with an id, when App is mounted, then selectedId becomes that id.
- Given App unmounts, when cleanup runs, then the subscription is removed.


## Scope
- In scope: game/frontend/src/App.tsx effect and import
- Out of scope: Tests
- Out of scope: BootScene emission code
- Preserve: Existing loadRound effect and early-return ordering


## Technical constraints
- Hook must be declared before the `if (!begun)` early return
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT-1


## Definition of done
- useEffect returns the unsubscribe function from phaserToReact.on
- App.tsx compiles


## Clarifying questions
- None

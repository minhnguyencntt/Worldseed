---
id: "01M84SFS5XK9YFCZH1C0KG6AEE"
kind: unit
parent: 01M84SFS5WW0K1TN4377M18QZT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene and PhaserHost 3.90 lifecycle unit tests

Write tests/phaser390Lifecycle.test.tsx with phaser and createGame mocked. Assert BootScene shutdown unsubscribes, PhaserHost calls scale.refresh and destroy(true), and the sources contain no Phaser 4-only API.

## Acceptance criteria
- Given BootScene.create run with a fake events emitter, when SHUTDOWN fires, then the zustand unsubscribe is called.
- Given PhaserHost rendered with createGame mocked returning {scale:{refresh},destroy}, when unmounted, then destroy is called once with true.
- Given a mocked ResizeObserver callback, when invoked, then scale.refresh is called.
- Given BootScene.ts and PhaserHost.tsx source, when scanned, then no Phaser 4 filter API matches.


## Scope
- In scope: tests/phaser390Lifecycle.test.tsx
- Out of scope: Browser rendering
- Preserve: Existing tests


## Technical constraints
- phaser, createGame and ResizeObserver mocked


## Definition of done
- New test file passes


## Clarifying questions
- None

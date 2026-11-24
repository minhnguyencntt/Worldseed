---
id: "01M85GXTM32GJX7YBAX1E9D3F7"
kind: unit
parent: 01M85GXTM3Z9TF48ZF30BBXZ6B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: objectClick event selects the object and unsubscribes on unmount

Write tests/appObjectClick.test.tsx proving App reacts to objectClick and cleans its listener.

## Acceptance criteria
- Given App is mounted after Begin, when objectClick with id bookshelf is emitted, then Inspect, Push, Search and Leave buttons show.
- Given App is unmounted, when objectClick is emitted, then no ActionMenu appears and no error is logged.


## Scope
- In scope: game/frontend/tests/appObjectClick.test.tsx
- Out of scope: Product code changes
- Preserve: Real phaserToReact bus (not mocked)


## Technical constraints
- Mock createGame and BootScene; use the real events module


## Dependencies
- ACT-2


## Definition of done
- New test file passes


## Clarifying questions
- None

---
id: "01M84RDAZHHX5GEMFNVQXZDA7G"
kind: unit
parent: 01M84RDAZH8ZAJAP4ACCCSKXVB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the typed event bus module

Implement a dependency-free typed bus and two exported instances.

## Acceptance criteria
- Given the module, When read, Then it declares both event maps and createEventBus.
- Given the module, When read, Then it has no phaser import.


## Scope
- In scope: src/phaser/events.ts
- Out of scope: tests
- Preserve: none


## Technical constraints
- Generic over an event map type
- New file: `game/frontend/src/phaser/events.ts`


## Dependencies
- REQ2


## Definition of done
- events.ts typechecks


## Clarifying questions
- None

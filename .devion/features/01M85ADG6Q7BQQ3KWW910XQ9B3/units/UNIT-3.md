---
id: "01M85ADG6RP866XBPJ74YQ83EN"
kind: unit
parent: 01M85ADG6QDV739P55F52KBW3X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: characterClick event type unit tests

Add tests to the existing phaserEvents suite proving characterClick delivery and isolation from objectClick.

## Acceptance criteria
- Given a characterClick handler, When emitted with { id: 'boy' }, Then it is called once with that payload.
- Given an objectClick handler, When characterClick is emitted, Then the objectClick handler is not called.


## Scope
- In scope: game/frontend/tests/phaserEvents.test.ts
- Out of scope: BootScene
- Preserve: existing event tests


## Technical constraints
- No Phaser needed; pure bus


## Dependencies
- ACT1


## Definition of done
- New tests pass


## Clarifying questions
- None

---
id: "01M85HVG1WB1JZHD5RJS791DV5"
kind: unit
parent: 01M85HVG1VYP9AXT9BCESB9D9Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: focusChange and menuClose events deliver payloads

Extend the event bus unit tests so both new events are delivered to subscribers and can be unsubscribed.

## Acceptance criteria
- focusChange payload reaches the handler.
- menuClose reaches the handler once and not after unsubscribe.


## Scope
- In scope: game/frontend/tests/phaserEvents.test.ts
- Out of scope: Product code
- Preserve: Existing event tests


## Technical constraints
- Pure unit test, no Phaser needed


## Definition of done
- New tests pass


## Clarifying questions
- None

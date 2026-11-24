---
id: "01M84WBX7M9WC3QEP2NZMV4JBT"
kind: unit
parent: 01M84WBX7KY58B9P1FQZG74HWK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Effects schema, effect creation and transition order unit tests

Fake RenderContext and schema parsing tests.

## Acceptance criteria
- Dust and ambient light effect creation, the empty-effects default and the invalid effect type error are asserted
- Transition order fade out, swap, fade in is asserted


## Scope
- In scope: game/tests/effects.test.ts
- In scope: game/tests/transition.test.ts
- In scope: game/tests/contentSchema.test.ts
- Out of scope: product code


## Definition of done
- Tests green


## Clarifying questions
- None

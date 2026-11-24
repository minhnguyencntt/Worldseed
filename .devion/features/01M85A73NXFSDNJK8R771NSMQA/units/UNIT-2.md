---
id: "01M85A73NYC1JG63VWEQK8KM2V"
kind: unit
parent: 01M85A73NYGQRF29FRJC5Q2F4V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: characterSchema interaction unit tests

Add game/tests/characterSchema.test.ts testing characterSchema with and without interaction, using pure in-memory inputs and no I/O.

## Acceptance criteria
- Tests assert absent, dialogue, actions and invalid cases
- Tests pass with the command below


## Scope
- In scope: game/tests/characterSchema.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- vitest, in-memory data only


## Definition of done
- All characterSchema tests pass


## Clarifying questions
- None

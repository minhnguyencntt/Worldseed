---
id: "01M84KNPXB3429VGWJM773V915"
kind: unit
parent: 01M84KNPXB6K217KHV7Y5525PD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: UI stack configuration and cn helper unit tests

Prove the stack configuration with file-reading unit tests and a cn test; no network or build is run.

## Acceptance criteria
- Dependency declarations are asserted
- Tailwind content globs are asserted
- cn merges and drops falsy values


## Scope
- In scope: game/frontend/tests/uiStack.test.ts
- Out of scope: running the app
- Preserve: existing tests


## Technical constraints
- Read files from process.cwd() (game/frontend)


## Definition of done
- Tests pass


## Clarifying questions
- None

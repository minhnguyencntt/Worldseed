---
id: "01M864WDRCZQJ9XXFJ1G38DAJ8"
kind: unit
parent: 01M864WDRB08JCTNZDV4W0XGZ0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: IntroScreen backdrop and centered dialog unit tests

Write tests/introScreen.test.tsx covering R2 acceptance criteria with RTL.

## Acceptance criteria
- Root has sf-fullscreen-bg and a parchment dialog
- Begin click calls onBegin once


## Scope
- In scope: game/frontend/tests/introScreen.test.tsx
- Out of scope: Real browser
- Preserve: tests/app.test.tsx Begin assertions


## Technical constraints
- jsdom environment, onBegin is a vi.fn


## Definition of done
- Test passes


## Clarifying questions
- None

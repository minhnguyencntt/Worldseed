---
id: "01M864WDRBCH06CZ2H8ENC37GT"
kind: unit
parent: 01M864WDRB4PZ82B17RQYF3YWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add base typography and dialog/backdrop CSS to styles.css

Edit src/styles.css to add body base rules, heading fonts, and shared classes for the full-screen backdrop and centered dialog used by later units.

## Acceptance criteria
- styles.css sets body background ink-1, color parchment-5, VT323 20px
- styles.css defines .sf-fullscreen-bg and .sf-dialog


## Scope
- In scope: game/frontend/src/styles.css
- Out of scope: Components
- Preserve: Frame kit rules
- Preserve: existing :root variables


## Technical constraints
- Use var(--sf-*) tokens only
- Code path: `game/frontend/src/styles.css`


## Definition of done
- Rules present in styles.css


## Clarifying questions
- None

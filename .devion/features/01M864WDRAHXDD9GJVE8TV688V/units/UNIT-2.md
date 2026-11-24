---
id: "01M864WDRB093K2PF09QWH8188"
kind: unit
parent: 01M864WDRB08JCTNZDV4W0XGZ0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Restyle IntroScreen as a centered dialog on a full-screen backdrop

Rewrite the IntroScreen markup using the Frame and Button components, keeping the copy and onBegin.

## Acceptance criteria
- Root has class sf-fullscreen-bg
- Begin is a gold Button inside a parchment dialog


## Scope
- In scope: game/frontend/src/components/IntroScreen.tsx
- Out of scope: Intro copy
- Preserve: Begin accessible name
- Preserve: onBegin prop


## Technical constraints
- Reuse Frame and Button from ./ui
- Code path: `game/frontend/src/components/IntroScreen.tsx`


## Dependencies
- A1


## Definition of done
- IntroScreen renders new structure


## Clarifying questions
- None

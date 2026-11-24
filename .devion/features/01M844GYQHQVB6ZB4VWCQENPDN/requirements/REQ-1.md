---
id: "01M844GYQJ0W0MES1YFTTSS1AF"
kind: requirement
parent: 01M844GYQHQVB6ZB4VWCQENPDN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App shows the intro screen before gameplay

Context: IntroScreen takes an onBegin prop and main.tsx needs a default-exported App. Desired behavior: App keeps a begun flag, false at start; while false it renders only IntroScreen. Expected result: the player sees the intro copy first and the entry point compiles. Why: the opening experience begins with the boy's question.

## Acceptance criteria
- Given a fresh App render, then the text 'What should I do?' and a Begin button are visible
- Given a fresh App render, then no hotspot buttons are rendered


## Scope
- In scope: Default-exported App with intro gate
- Out of scope: Playing view composition
- Preserve: IntroScreen props and copy


## Technical constraints
- useState for the begun flag; no new dependencies


## Definition of done
- App.tsx default-exports a component that renders IntroScreen first


## Clarifying questions
- None

---
id: "01M844GYQJJMHCJZGB2V33H3N6"
kind: unit
parent: 01M844GYQJ0W0MES1YFTTSS1AF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create App.tsx with the intro gate

Create game/frontend/src/App.tsx with a default-exported App holding a begun state; when false render IntroScreen with onBegin setting it true; when true render a placeholder fragment filled in by the next Act.

## Acceptance criteria
- Given a fresh render, then IntroScreen is rendered
- Given Begin is clicked, then IntroScreen is no longer rendered


## Scope
- In scope: game/frontend/src/App.tsx
- Out of scope: Playing view
- Preserve: main.tsx


## Technical constraints
- Default export
- New file: `game/frontend/src/App.tsx`


## Definition of done
- App.tsx exists, typechecks, and default-exports App


## Clarifying questions
- None

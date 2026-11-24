---
id: "01M84NCYC057YEESA8CPAPSBZE"
kind: unit
parent: 01M84NCYC0SVJ8A3YESZ5TT9S0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Track round loading/error in App and render HeaderOverlay

Replace round useState with loading/error state, remove loose RoundBadge/Countdown, pass header prop to GameLayout.

## Acceptance criteria
- Given each of loading, error and ready round states, when App renders, then HeaderOverlay receives matching loading, error and round props
- Given the GameLayout header slot, when App renders, then the header is passed through the header prop and no loose RoundBadge or Countdown remains


## Scope
- In scope: App.tsx
- Out of scope: Tests
- Preserve: Intro gate


## Technical constraints
- Depends on GameLayout header prop
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- GameLayout header slot


## Definition of done
- tsc passes


## Clarifying questions
- None

---
id: "01M84NCYC0SVJ8A3YESZ5TT9S0"
kind: requirement
parent: 01M84NCYBZXA3J18V03QH45F05
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App loads the current round with loading and error state and passes it to the header

Context: App swallows getCurrentRound errors and shows 'Round unavailable'. Desired behavior: App tracks loading/error, builds an error message from the failure, and renders HeaderOverlay via GameLayout's header slot instead of loose RoundBadge/Countdown. Why: no unexplained failures.

## Acceptance criteria
- Given getCurrentRound resolves, when App is playing, then header shows round id and status
- Given getCurrentRound rejects, when App is playing, then header shows an alert containing 'Round status unavailable' and the failure reason
- Given getCurrentRound is pending, when App is playing, then 'Loading round…' is shown


## Scope
- In scope: src/App.tsx
- Out of scope: API client changes
- Preserve: Suggest What Happens Next button and ContributionSheet
- Preserve: Intro gate


## Technical constraints
- Keep getCurrentRound from ./api/client


## Definition of done
- App renders header in all three states


## Clarifying questions
- None

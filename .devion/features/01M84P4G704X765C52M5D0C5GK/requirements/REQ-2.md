---
id: "01M84P4G70S5HK1HRVNM35B7VY"
kind: requirement
parent: 01M84P4G704X765C52M5D0C5GK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App renders HeaderOverlay through the header slot with round data, loading and error state

Context: App.tsx fetches the round in a useEffect and swallows errors. Desired behavior: keep round, add loading (true until the fetch settles) and error (message string from the rejection, e.g. Error.message) state, remove the silent catch, and render <HeaderOverlay worldTitle round loading error /> as the GameLayout header prop. Expected result: the header shows loading, round info, or an explained failure. Why: users must understand when the round API fails.

## Acceptance criteria
- Given getCurrentRound is pending, when the playing view renders, then 'Loading round…' is shown
- Given getCurrentRound resolves a round, when the playing view renders, then the round id and status are shown in the header
- Given getCurrentRound rejects with Error('boom'), when the playing view renders, then an alert contains 'boom'
- Given the header, then it is rendered inside the layout main area


## Scope
- In scope: App.tsx state and header wiring
- Out of scope: HeaderOverlay changes
- Out of scope: Retry logic
- Preserve: Intro gate
- Preserve: roundId passed to ContributionSheet


## Technical constraints
- Use existing getCurrentRound and HeaderOverlay props (worldTitle, round, loading, error)


## Dependencies
- REQ1


## Definition of done
- App passes round, loading and error to HeaderOverlay; no silent catch remains


## Clarifying questions
- None

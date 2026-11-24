---
id: "01M84NXPJNW52Z4PC4EX1P2GPC"
kind: requirement
parent: 01M84NXPJNCA8EGY8ZRT8TK8VQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App tracks round loading/error and renders HeaderOverlay in the header slot

Context: App calls getCurrentRound and swallows errors. Desired behavior: track loading and error message state, render <HeaderOverlay worldTitle round loading error /> as the header prop. Expected result: loaded, loading and error states visible in header. Why: explain API failures instead of silent fallback.

## Acceptance criteria
- Given the round resolves, then the header shows round id and status.
- Given the request is pending, then the header shows Loading round….
- Given the request rejects with Error('boom'), then the header alert shows 'Round unavailable: boom'.


## Scope
- In scope: App.tsx round state and header wiring
- Out of scope: HeaderOverlay changes
- Preserve: ContributionSheet roundId use
- Preserve: Intro gate


## Technical constraints
- Use getCurrentRound from api/client; world title from world in runtime/content


## Dependencies
- REQ1


## Definition of done
- Header wired with all states


## Clarifying questions
- None

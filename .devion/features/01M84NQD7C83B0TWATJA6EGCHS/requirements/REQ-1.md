---
id: "01M84NQD7CDHXHPV5GY817J491"
kind: requirement
parent: 01M84NQD7C83B0TWATJA6EGCHS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · HeaderOverlay shows logo, world name, round ID, status and countdown

Context: round data is a Round from api/client.ts (id, number, status, starts_at, ends_at). Desired behavior: with a round supplied, the header shows the StoryForge logo, worldTitle, round.id, round.status and a Countdown to round.ends_at. Expected result: all five items present in one compact bar. Why: players must see which round is live and when it ends.

## Acceptance criteria
- Given worldTitle 'The Boy's Room' and a round, When rendered, Then the text 'StoryForge', the world title, round.id and round.status are in the document
- Given a round with a future ends_at, When rendered, Then a role=timer element is present


## Scope
- In scope: Logo, world name, round ID, status, countdown rendering
- Out of scope: Sound and settings controls
- Out of scope: Loading/error states
- Preserve: Countdown component API


## Technical constraints
- Reuse Countdown from components/Countdown.tsx


## Definition of done
- Round info renders from props


## Clarifying questions
- None

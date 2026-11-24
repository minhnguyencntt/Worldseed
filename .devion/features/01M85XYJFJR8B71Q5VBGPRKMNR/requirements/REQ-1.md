---
id: "01M85XYJFJAEKWTTESYGAMB6R4"
kind: requirement
parent: 01M85XYJFJR8B71Q5VBGPRKMNR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Header is a wood bar with brass corners, gold logo, world plaque, status pill with dot and countdown

Context: HeaderOverlay renders plain spans in .sf-frame-bar. Desired behavior: gold logo text, the world title inside a plaque frame (Frame kind plaque), and a pill holding a status dot, the round id and status, then the Countdown, with brass corner decoration. Expected result: visible kit structure with test ids. Why: matches the reference header.

## Acceptance criteria
- Given a round with status OPEN, when the header renders, then a pill with test id round-pill contains a dot with data-status OPEN, the round id and the status text.
- Given a world title, when the header renders, then the title is inside an element with data-frame plaque.
- Given a round, when the header renders, then the logo text StoryForge, the header banner with brass corners class, and one timer are present.


## Scope
- In scope: HeaderOverlay markup
- In scope: CSS for logo, pill, dot and brass corners using palette tokens
- Out of scope: Suggest button
- Out of scope: new PNG art
- Preserve: Countdown component
- Preserve: existing text StoryForge, round id and status strings


## Technical constraints
- Tailwind and tokens only; colours from palette tokens.
- Phaser 3.90.x pin untouched.


## Dependencies
- INT


## Definition of done
- Header markup uses Frame plaque and the pill
- styles added


## Non-functional requirements
- Pixelated rendering kept


## Clarifying questions
- None

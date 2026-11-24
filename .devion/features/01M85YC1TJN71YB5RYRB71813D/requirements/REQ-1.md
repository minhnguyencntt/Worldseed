---
id: "01M85YC1TJGRT1HY7J19V9ABM9"
kind: requirement
parent: 01M85YC1TJN71YB5RYRB71813D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Panel shows chapter title and a parchment dialogue card with portrait, speaker, line and choices

Context: StoryPanel renders the dialogue as bare h2, p and buttons without a portrait. Desired behavior: wrap the panel in sf-frame-panel with own overflow-y scroll, show the chapter title, and render the node in an sf-frame-parchment card with the speaker portrait resolved from the manifest. Expected result: card shows portrait, speaker, line and choices list. Why: reference UI.

## Acceptance criteria
- Given a node with speaker boy, when rendered, then an img of 32x32 from manifest id character:boy-portrait is in the Dialogue region.
- Given a speaker with no manifest portrait, when rendered, then no img is shown and the speaker name and line still render.
- Given a node with 2 choices, when rendered, then a list with 2 buttons appears and clicking the second calls onChoose(1).
- Given no node, when rendered, then the title shows and no Dialogue region exists.


## Scope
- In scope: root frame and overflow classes
- In scope: dialogue card
- In scope: choices list
- In scope: portrait lookup helper
- Out of scope: inventory
- Out of scope: event log content
- Preserve: story-content root class
- Preserve: aria-label Dialogue


## Technical constraints
- Portrait comes from the existing generated manifest entry character:boy-portrait.
- Palette and tokens shared with UI; no new colours.


## Dependencies
- INT


## Definition of done
- Dialogue card renders portrait, speaker, line, choices
- Root panel is framed and scrolls on its own


## Non-functional requirements
- Portrait uses pixelated rendering


## Clarifying questions
- None

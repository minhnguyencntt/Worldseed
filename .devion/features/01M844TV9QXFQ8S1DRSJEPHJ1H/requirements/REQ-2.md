---
id: "01M844TV9QW0YRM90MDWP5PGTA"
kind: requirement
parent: 01M844TV9QXFQ8S1DRSJEPHJ1H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Actions and dialogue choices update the story

Context: useGame.act and useGame.choose update state, which StoryPanel renders via getActiveNode and history. Desired behavior: the dialogue section is a named region so tests can assert it closes after a choice. Expected result: Search adds the hidden door text; choosing a dialogue option closes the dialogue and records it. Why: core story loop.

## Acceptance criteria
- Given the Bookshelf menu, when Search is clicked, then the Story history list contains 'A hidden door swings open behind the books.'
- Given the opening dialogue, when 'Look around the room' is clicked, then the Dialogue region disappears and history contains that text


## Scope
- In scope: StoryPanel dialogue section aria-label
- Out of scope: Dialogue content changes
- Preserve: StoryPanel props
- Preserve: Choice button labels


## Technical constraints
- Do not change StoryPanelProps


## Definition of done
- Dialogue section exposes accessible name Dialogue


## Clarifying questions
- None

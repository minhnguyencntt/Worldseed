---
id: "01M85BP7N2TM6QJ3EVEXRV5139"
kind: unit
parent: 01M85BP7N1EDCKTVQD6N8K2G7C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: StoryPanel scene title, scroll and choice unit tests

Add unit tests proving the StoryPanel rendering from state and choice clicks. No network is involved.

## Acceptance criteria
- Title heading asserted
- Scroll classes asserted
- Choice click calls onChoose with the index


## Scope
- In scope: New test file storyPanelTitle.test.tsx
- Out of scope: Browser checks
- Preserve: tests/story.test.tsx


## Technical constraints
- vitest + testing-library


## Definition of done
- Tests pass


## Clarifying questions
- None

---
id: "01M844PHFFENT2BDBV85TGZ3N0"
kind: unit
parent: 01M844PHFFR5Q5PH4Z87FZ9G6Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Single story-panel class unit tests

Add Testing Library tests in the existing layout test file that render GameLayout with StoryPanel and assert class uniqueness and drawer-open placement.

## Acceptance criteria
- Given GameLayout with StoryPanel, when rendered, then container.querySelectorAll('.story-panel') has length 1
- Given the Story button clicked, when open, then the single .story-panel has class drawer-open and .story-content does not
- Given StoryPanel alone, when rendered, then the root has story-content and not story-panel


## Scope
- In scope: game/frontend/tests/layout.test.tsx new tests
- Out of scope: Product code changes
- Out of scope: Browser or e2e tests
- Preserve: Existing two tests in layout.test.tsx


## Technical constraints
- jsdom environment already declared in the file; no network or server


## Definition of done
- New tests pass and fail against the old StoryPanel class


## Clarifying questions
- None

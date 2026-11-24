---
id: "01M85BP7N1EDCKTVQD6N8K2G7C"
kind: requirement
parent: 01M85BP7N1BFPBGF8TXMWX525X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Story Panel shows scene title and scrolls independently in pixel-art styling

Context: game/frontend/src/components/StoryPanel.tsx (L1-L47) renders dialogue, history and inventory but no scene title, and uses the unstyled 'story-content' class. Desired behavior: add a sceneTitle prop rendered as a heading, and wrap the content in a container that scrolls on its own with pixel-art Tailwind styling. Expected result: the panel shows all required story elements. Why: players need context for where they are.

## Acceptance criteria
- Given sceneTitle 'The Boys Room', when StoryPanel renders, then a heading with that text is shown
- Given a container, when the history is long, then the container has overflow-y-auto and a bounded height so it scrolls independently
- Given a dialogue node with two choices, when the second is clicked, then onChoose is called with 1


## Scope
- In scope: StoryPanel sceneTitle prop and styling
- Out of scope: GameLayout grid
- Out of scope: dialogue system logic
- Preserve: onChoose contract
- Preserve: aria-labels 'Dialogue', 'Story history', 'Inventory'
- Preserve: 'Empty' inventory text


## Technical constraints
- Tailwind classes only; pixel font via existing design tokens


## Definition of done
- StoryPanel renders scene title and scrolls independently


## Non-functional requirements
- Keyboard-accessible choice buttons


## Clarifying questions
- None

---
id: "01M85BP7N1NANT9EHZMN28N39Y"
kind: unit
parent: 01M85BP7N1EDCKTVQD6N8K2G7C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add sceneTitle and scroll styling to StoryPanel

Implement the sceneTitle prop in StoryPanel and pass game.scene.title from App. Product code only.

## Acceptance criteria
- StoryPanel accepts a required sceneTitle string and renders it in an h1
- The root element has overflow-y-auto and h-full classes
- App passes game.scene.title as sceneTitle


## Scope
- In scope: StoryPanel.tsx
- In scope: App.tsx StoryPanel usage
- Out of scope: Header changes
- Preserve: Existing props and aria-labels


## Technical constraints
- Keep the 'story-content' class name
- Code path: `game/frontend/src/components/StoryPanel.tsx`
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- Component compiles and renders the title


## Clarifying questions
- None

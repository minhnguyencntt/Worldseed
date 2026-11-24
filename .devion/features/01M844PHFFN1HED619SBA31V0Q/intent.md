---
id: "01M844PHFFN1HED619SBA31V0Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3.2 · Fix the doubled story-panel class in the game layout

Context: GameLayout (game/frontend/src/components/GameLayout.tsx L9) wraps its story slot in <aside class="story-panel">, and StoryPanel (game/frontend/src/components/StoryPanel.tsx L12) renders its own root <div class="story-panel">. The result is two nested elements with the same class, so styles.css L17-L29 (position: fixed, transform, max-height) apply twice on mobile. Desired behavior: exactly one element carries story-panel in the composed view. Expected result: the mobile drawer slides once. Why: nested fixed and transform rules break the bottom drawer.

## Acceptance criteria
- Given the composed GameLayout with StoryPanel, when it renders, then exactly one element has the class story-panel
- Given StoryPanel rendered alone, when it renders, then its root element does not have the class story-panel
- Given the mobile drawer toggle, when the Story button is clicked, then only the aside element receives drawer-open


## Scope
- In scope: Rename the StoryPanel root class so it no longer duplicates story-panel
- Out of scope: Redesigning the drawer
- Out of scope: Changing the 80/20 grid
- Out of scope: Changing story content
- Preserve: GameLayout aside keeps story-panel and drawer-open
- Preserve: styles.css rules for .story-panel
- Preserve: StoryPanel props and rendered content
- Preserve: Existing story.test.tsx and layout.test.tsx assertions


## Technical constraints
- Frontend only, no API changes
- React 18 + Vitest + Testing Library under game/frontend


## Definition of done
- Only the GameLayout aside has class story-panel
- Existing frontend tests pass


## Clarifying questions
- None

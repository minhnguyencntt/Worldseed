---
id: "01M844PHFFR5Q5PH4Z87FZ9G6Y"
kind: requirement
parent: 01M844PHFFN1HED619SBA31V0Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Story panel class appears once in the composed layout

Context: GameLayout owns the story-panel container that the mobile drawer CSS targets; StoryPanel nests a second element with the same class. Desired behavior: StoryPanel root uses a distinct class (story-content) and GameLayout remains the sole story-panel owner. Expected result: mobile position: fixed and transform apply once. Why: avoid doubled drawer positioning.

## Acceptance criteria
- Given GameLayout wrapping StoryPanel, when rendered, then document.querySelectorAll('.story-panel').length equals 1
- Given StoryPanel rendered alone, when rendered, then its root element has class story-content and not story-panel
- Given the drawer toggle clicked, when state is open, then the single .story-panel element has class drawer-open


## Scope
- In scope: StoryPanel root className
- Out of scope: CSS redesign
- Out of scope: New components
- Preserve: StoryPanel content, props and callbacks
- Preserve: GameLayout markup


## Technical constraints
- Do not edit styles.css rules for .story-panel


## Definition of done
- StoryPanel root class is story-content
- One story-panel element in the composed layout


## Clarifying questions
- None

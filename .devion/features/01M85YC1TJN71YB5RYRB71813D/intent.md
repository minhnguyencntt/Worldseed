---
id: "01M85YC1TJN71YB5RYRB71813D"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.2 · Rebuild StoryPanel on the kit

Context: game/frontend/src/components/StoryPanel.tsx is a plain list of h1, dialogue, history ol and inventory ul. App.tsx passes sceneTitle, node, history, inventory and onChoose from useGame. Desired behavior: the panel is rebuilt on the frame kit (sf-frame-* classes in styles.css) with its own overflow scroll, a 32x32 portrait in the dialogue card, a 3x2 inventory grid with icons and names, and an event log. Expected result: all regions read real game state. Why: matches the reference UI.

## Acceptance criteria
- Given a dialogue node, when StoryPanel renders, then the chapter title, a parchment card with portrait, speaker name and line, and one button per choice are shown.
- Given an inventory of 0 to 6 items, when rendered, then exactly 6 slots appear in a 3x2 grid, filled slots show icon and name, empty slots are marked empty.
- Given history lines, when rendered, then the event log lists them in order inside a region that scrolls independently.
- Given a choice click, then onChoose is called with that choice index.


## Scope
- In scope: StoryPanel component and its pure data helper
- In scope: existing story, title and frame-kit tests
- Out of scope: new story content
- Out of scope: new rooms
- Out of scope: backend changes
- Out of scope: audio
- Out of scope: header changes
- Preserve: StoryPanelProps contract used by App
- Preserve: aria-labels Dialogue, Story history, Inventory
- Preserve: Go API contracts and contribution flow


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay.
- No mock data in place of real API calls; data comes from game state and the manifest.
- Art is generated PNG from the repo; no downloaded art or CDN links.
- One shared palette of at most 48 colours used by art and UI.
- Tests are unit tests with all dependencies mocked.


## Definition of done
- All acceptance criteria met
- Updated and new unit tests pass


## Non-functional requirements
- Layout holds from 1280x720; panel works as bottom drawer on narrow screens


## Clarifying questions
- None

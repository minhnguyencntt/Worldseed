---
id: "01M844PHFF94JS9KCD1FGMHKNP"
kind: unit
parent: 01M844PHFFR5Q5PH4Z87FZ9G6Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Rename StoryPanel root class to story-content

Change the root div className in StoryPanel from story-panel to story-content so only the GameLayout aside carries story-panel and the mobile fixed/transform rules apply once.

## Acceptance criteria
- Given StoryPanel renders, when inspected, then the root div has class story-content
- Given GameLayout wraps StoryPanel, when rendered, then exactly one .story-panel exists


## Scope
- In scope: game/frontend/src/components/StoryPanel.tsx root className
- Out of scope: styles.css changes
- Out of scope: GameLayout changes
- Preserve: All StoryPanel content and props


## Technical constraints
- One-identifier change only
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Definition of done
- StoryPanel root div className is story-content
- No other markup changed


## Clarifying questions
- None

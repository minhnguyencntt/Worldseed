---
id: "01M85YC1TJ1BC7K6RXFZ2RMGF0"
kind: unit
parent: 01M85YC1TJGRT1HY7J19V9ABM9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Frame StoryPanel and add portrait dialogue card with choices list

Implement a pure helper that resolves a portrait URL from the manifest and use it in StoryPanel's dialogue card; frame the root and make it scroll alone.

## Acceptance criteria
- portraitPath('boy') returns /assets/worlds/the-boys-room/characters/boy-portrait.png
- portraitPath of an unknown speaker returns undefined
- StoryPanel root has sf-frame-panel and overflow-y-auto


## Scope
- In scope: new storyPanelData helper
- In scope: StoryPanel.tsx root, title, dialogue, choices
- Out of scope: inventory
- Out of scope: log
- Preserve: StoryPanelProps
- Preserve: story-content class


## Technical constraints
- React and TypeScript stay; fonts and art stay in-repo.
- New file: `game/frontend/src/lib/storyPanelData.ts`
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Dependencies
- REQ1


## Definition of done
- Dialogue card shows portrait when manifest has it
- Choices render as a list of buttons


## Clarifying questions
- None

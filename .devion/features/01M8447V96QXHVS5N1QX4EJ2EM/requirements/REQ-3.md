---
id: "01M8447V96WTK64GW2X0GAT7S5"
kind: requirement
parent: 01M8447V96QXHVS5N1QX4EJ2EM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Story panel with intro screen, dialogue, choices, history and inventory

Context: game/src/systems/dialogue.ts exposes getActiveNode and chooseOption; state has history and inventory. Desired behavior: IntroScreen shows the suggested intro copy with a Begin button; StoryPanel shows the active dialogue node, choice buttons, scrollable history and inventory summary. Expected result: choosing a dialogue option advances story and logs history. Why: narrative interface.

## Acceptance criteria
- Given empty history, When App opens, Then intro copy 'You decide.' is visible
- Given an active node, When StoryPanel renders, Then speaker, text and one button per choice show
- Given a choice click, When pressed, Then onChoose is called with its index
- Given inventory items, When rendered, Then each item name is listed, else 'Empty'


## Scope
- In scope: IntroScreen.tsx, StoryPanel.tsx
- Out of scope: Contribution form and 'Suggest What Happens Next' flow
- Out of scope: Backend API calls
- Out of scope: Round countdown and admin UI
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- Acceptance criteria demonstrated by unit tests


## Clarifying questions
- None

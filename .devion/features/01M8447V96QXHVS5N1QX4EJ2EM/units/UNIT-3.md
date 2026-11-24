---
id: "01M8447V977PM6AVYZ9RDEZ5TZ"
kind: unit
parent: 01M8447V96WTK64GW2X0GAT7S5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Build IntroScreen and StoryPanel

Implement the narrative panel and opening screen.

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria


## Scope
- In scope: game/frontend/src/components/IntroScreen.tsx
- In scope: game/frontend/src/components/StoryPanel.tsx
- Out of scope: Tests and fixtures
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it
- New file: `game/frontend/src/components/IntroScreen.tsx`
- New file: `game/frontend/src/components/StoryPanel.tsx`


## Definition of done
- Files in code_paths implemented and type-check passes


## Clarifying questions
- None

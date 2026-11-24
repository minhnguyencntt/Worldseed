---
id: "01M8447V97AJGB6V2WNKQ5Y7MT"
kind: unit
parent: 01M8447V97WVKR68CF1KRB6QSH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Compose GameLayout, App, styles and entry point

Compose components into the 80/20 responsive game screen.

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria


## Scope
- In scope: game/frontend/src/components/GameLayout.tsx
- In scope: game/frontend/src/App.tsx
- In scope: game/frontend/src/main.tsx
- In scope: game/frontend/index.html
- In scope: game/frontend/src/styles.css
- Out of scope: Tests and fixtures
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it
- New file: `game/frontend/src/components/GameLayout.tsx`
- New file: `game/frontend/src/App.tsx`
- New file: `game/frontend/src/main.tsx`
- New file: `game/frontend/index.html`
- New file: `game/frontend/src/styles.css`


## Definition of done
- Files in code_paths implemented and type-check passes


## Clarifying questions
- None

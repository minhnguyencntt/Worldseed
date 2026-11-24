---
id: "01M8447V97PJ2THBEE4KTVPQT0"
kind: unit
parent: 01M8447V96JXEWFJKP61DT5KN4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Build SceneView hotspots, asset path map and ActionMenu

Implement the scene rendering components and replaceable asset map.

## Acceptance criteria
- Code compiles under tsc --noEmit strict
- Behavior matches the requirement acceptance criteria


## Scope
- In scope: game/frontend/src/runtime/assets.ts
- In scope: game/frontend/src/components/SceneView.tsx
- In scope: game/frontend/src/components/ActionMenu.tsx
- In scope: game/frontend/public/assets/bedroom.svg
- Out of scope: Tests and fixtures
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it
- New file: `game/frontend/src/runtime/assets.ts`
- New file: `game/frontend/src/components/SceneView.tsx`
- New file: `game/frontend/src/components/ActionMenu.tsx`
- New file: `game/frontend/public/assets/bedroom.svg`


## Definition of done
- Files in code_paths implemented and type-check passes


## Clarifying questions
- None

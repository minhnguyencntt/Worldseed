---
id: "01M84NCYC0459M7ZYDKTZ24EHS"
kind: unit
parent: 01M84NCYBZ6BG90EMQW86QY19B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create HeaderOverlay component

Create src/components/HeaderOverlay.tsx exporting HeaderOverlay with props worldTitle, round, loading, error; compose Countdown and RoundBadge; read soundEnabled/settingsOpen and toggles from useUiStore.

## Acceptance criteria
- Component renders all six elements for a ready round
- Loading and error states render explanatory text


## Scope
- In scope: HeaderOverlay.tsx
- Out of scope: App wiring
- Preserve: RoundBadge, Countdown


## Technical constraints
- Tailwind classes: absolute inset-x-0 top-0 z-10 flex items-center gap-2 px-3 py-1
- New file: `game/frontend/src/components/HeaderOverlay.tsx`


## Definition of done
- Component compiles with tsc --noEmit


## Clarifying questions
- None

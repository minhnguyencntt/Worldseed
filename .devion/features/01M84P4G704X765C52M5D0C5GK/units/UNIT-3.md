---
id: "01M84P4G70E8W77518K82BH4MJ"
kind: unit
parent: 01M84P4G70Y5GXRTM4G897W73D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove RoundBadge and Countdown usage from App

Remove standalone RoundBadge and Countdown from App.tsx scene content.

## Acceptance criteria
- App.tsx has no RoundBadge or Countdown reference
- App.tsx scene fragment begins with SceneView and still renders without the removed elements


## Scope
- In scope: App.tsx
- Out of scope: Component files
- Preserve: HeaderOverlay Countdown


## Technical constraints
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT2


## Definition of done
- No RoundBadge/Countdown in App.tsx


## Clarifying questions
- None

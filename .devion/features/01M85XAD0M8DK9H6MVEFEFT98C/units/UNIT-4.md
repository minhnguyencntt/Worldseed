---
id: "01M85XAD0NANDGKZBY7XH6ZEQY"
kind: unit
parent: 01M85XAD0NCT6A8FXN2CB7P0YD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add frame CSS classes, Frame component, framed Button and wire them into the game screen

Generate .sf-frame-* and .sf-btn classes from FRAME_KIT, add components and apply them in the screen.

## Acceptance criteria
- Frame classes use border-image and image-rendering pixelated
- Button frame variant exposes four states
- Header, aside, dialogue, inventory and trigger use the kit


## Scope
- In scope: frameKit.ts
- In scope: tailwind plugin
- In scope: Frame.tsx
- In scope: button.tsx
- In scope: HeaderOverlay, GameLayout, StoryPanel, App
- Out of scope: tests
- Out of scope: layout rebuild
- Preserve: default and ghost variants
- Preserve: aria labels


## Technical constraints
- Nearest-neighbour rendering
- React, Tailwind, Radix stay
- New file: `game/frontend/src/lib/frameKit.ts`
- Code path: `game/frontend/tailwind.config.ts`
- New file: `game/frontend/src/components/ui/Frame.tsx`
- Code path: `game/frontend/src/components/ui/button.tsx`
- Code path: `game/frontend/src/components/HeaderOverlay.tsx`
- Code path: `game/frontend/src/components/GameLayout.tsx`
- Code path: `game/frontend/src/components/StoryPanel.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- R4
- A1
- A3


## Definition of done
- Game screen elements carry frame classes


## Non-functional requirements
- Focus and aria attributes preserved


## Clarifying questions
- None

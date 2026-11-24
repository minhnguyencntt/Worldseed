---
id: "01M85XYJFJJXQRJPQGJ3WGBJ8R"
kind: unit
parent: 01M85XYJFJAEKWTTESYGAMB6R4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Restructure HeaderOverlay into logo, plaque and status pill with dot

Edit HeaderOverlay.tsx to use Frame for the plaque, add the round-pill with dot, and add CSS classes in styles.css.

## Acceptance criteria
- The header renders the logo, plaque, pill with dot and Countdown for a loaded round.
- The text StoryForge, round id and status remain as separate text nodes.


## Scope
- In scope: HeaderOverlay.tsx
- In scope: styles.css
- Out of scope: tests
- Preserve: props interface
- Preserve: Countdown


## Technical constraints
- Palette tokens only (var(--sf-color-brass-4) etc.).
- Tailwind, React stay.
- Code path: `game/frontend/src/components/HeaderOverlay.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- REQ1


## Definition of done
- Header renders new structure with test ids header-bar, round-pill, round-dot


## Clarifying questions
- None

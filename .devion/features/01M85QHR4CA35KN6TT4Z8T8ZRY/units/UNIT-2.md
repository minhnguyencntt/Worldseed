---
id: "01M85QHR4DXRNW79ZQXCMPG6BK"
kind: unit
parent: 01M85QHR4D2CSMFJHBZ0FJJTW3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Export palette Tailwind colours and register them in tailwind.config.ts

Derive the Tailwind colour object from PALETTE_RAMPS and add it to the Tailwind theme.

## Acceptance criteria
- paletteTailwindColors maps ramp -> step number -> hex.
- tailwind.config.ts theme.extend.colors.pal equals it and old tokens remain.


## Scope
- In scope: palette.ts export
- In scope: tailwind.config.ts
- Out of scope: Component restyling
- Out of scope: tests
- Preserve: Existing hsl tokens, content globs, plugins


## Technical constraints
- Tailwind stays; derive from the single palette, do not copy hex values.
- New file: `game/frontend/src/lib/palette.ts`
- Code path: `game/frontend/tailwind.config.ts`


## Dependencies
- ACT-PAL


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None

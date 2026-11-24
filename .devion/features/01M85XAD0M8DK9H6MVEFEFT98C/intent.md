---
id: "01M85XAD0M8DK9H6MVEFEFT98C"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4 Build the interface frame kit and design tokens

Context: palette (src/lib/palette.ts, 48 colours), art pipeline (src/art/sources.ts, generateAssets, art:generate) and Tailwind exist, but the UI is unframed and only ui/cursor-hand.png exists. Desired behavior: tokens defined once and exposed as CSS vars and Tailwind theme values, fonts from @fontsource, generated nine-slice frames, components using them with a four-state button. Expected result: the game screen uses the kit. Why: shared look for every later component.

## Acceptance criteria
- Given the palette, when tokens are built, then every colour token equals a PALETTE value and is exposed as a --sf-color-* CSS variable and a Tailwind theme colour
- Given art:generate, when it runs, then PNG frames for bar, panel, plaque, parchment card, slot and four button states exist with manifest entries
- Given a Button with each state, when rendered, then normal, hover, pressed and disabled classes are present
- Given the repo, when searched, then no panel-frame, sound or pointer SVG remains under game/public


## Scope
- In scope: tokens
- In scope: @fontsource fonts
- In scope: frame PNG sources
- In scope: frame CSS classes and components
- In scope: wiring into header, layout, story panel, suggest trigger
- Out of scope: new rooms
- Out of scope: story content
- Out of scope: backend changes
- Out of scope: audio
- Out of scope: deployment
- Out of scope: repository clean-up
- Out of scope: header/story panel rebuild
- Preserve: Phaser ~3.90.0 pin
- Preserve: Go API contracts
- Preserve: existing hand cursor
- Preserve: existing tests


## Technical constraints
- Phaser stays 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay
- All art is generated raster pixel art from palette grids; no downloads or CDN
- Palette at most 48 colours, defined once
- Fonts bundled via npm, not URLs
- Unit tests with all dependencies mocked


## Definition of done
- All requirements delivered with Act and Verify units green


## Non-functional requirements
- image-rendering: pixelated on all frames


## Clarifying questions
- None

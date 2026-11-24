---
id: "01M85QHR4CA35KN6TT4Z8T8ZRY"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.1 Define the shared palette and 480x270 render constants

Context: game/frontend/src/phaser/config.ts exports GAME_WIDTH=640 and GAME_HEIGHT=360 and computeZoom. No palette module exists. tailwind.config.ts only maps HSL CSS variables. Desired behavior: a single palette file lists at most 48 hex colours in named warm and cool ramps, exported as constants and as Tailwind colours; config.ts uses 480x270; computeZoom is unit tested for whole-number zoom across window sizes and DPR values. Expected result: later SG-1.2 and SG-1.3 art code and UI tokens can import one palette and one render size. Why: the pixel-art overhaul needs a single source of truth for colour and native resolution.

## Acceptance criteria
- Given the palette module, when its colours are counted, then there are at most 48 unique hex values grouped in named warm and cool ramps.
- Given the palette module, when imported by Tailwind config, then each palette colour is available as a Tailwind colour.
- Given config.ts, when read, then GAME_WIDTH is 480 and GAME_HEIGHT is 270 and buildGameConfig uses them.
- Given several window sizes and DPR values, when computeZoom runs, then it returns a whole number of at least 1.
- Given the existing test suite, when run for the touched files, then no test assumes 640x360.


## Scope
- In scope: Palette module
- In scope: Tailwind colour export
- In scope: 480x270 constants
- In scope: computeZoom tests
- Out of scope: Grid-to-pixel functions (SG-1.2)
- Out of scope: PNG script and manifest update (SG-1.3)
- Out of scope: New rooms, story content, backend, audio, deployment, repo clean-up
- Preserve: Phaser ~3.90.0 pin and its guard tests
- Preserve: Existing hsl Tailwind tokens
- Preserve: pixelArt, roundPixels and FIT scale settings


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay.
- One native scene resolution of 480x270, whole-number scaling, nearest-neighbour.
- One shared palette of at most 48 colours, defined once.
- Tests are unit tests with dependencies mocked.


## Definition of done
- All requirements below delivered with passing unit tests


## Clarifying questions
- None

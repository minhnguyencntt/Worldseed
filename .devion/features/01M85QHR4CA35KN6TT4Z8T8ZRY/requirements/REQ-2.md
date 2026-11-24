---
id: "01M85QHR4D2CSMFJHBZ0FJJTW3"
kind: requirement
parent: 01M85QHR4CA35KN6TT4Z8T8ZRY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The palette is exported as Tailwind colours

Context: tailwind.config.ts L4 extends colors with hsl(var(--x)) tokens only. Desired behavior: palette.ts exports paletteTailwindColors (ramp name -> step 1..6 -> hex) and tailwind.config.ts adds it under colors.pal, giving classes such as bg-pal-wood-3. Expected result: UI can use palette colours via utilities. Why: UI and art must use the same colours.

## Acceptance criteria
- Given paletteTailwindColors, when read, then every PALETTE colour appears exactly once as a value.
- Given tailwind.config, when theme.extend.colors.pal is read, then it equals paletteTailwindColors.
- Given tailwind.config, when theme.extend.colors.background is read, then it is still hsl(var(--background)).


## Scope
- In scope: paletteTailwindColors export
- In scope: tailwind.config.ts colors.pal
- Out of scope: Replacing existing tokens
- Out of scope: Restyling components
- Preserve: Existing token colours and content globs
- Preserve: tailwindConfig.test.ts expectations


## Technical constraints
- Tailwind stays; palette defined once and reused, not duplicated.


## Dependencies
- REQ-PAL


## Definition of done
- Tailwind config exposes pal colours


## Clarifying questions
- None

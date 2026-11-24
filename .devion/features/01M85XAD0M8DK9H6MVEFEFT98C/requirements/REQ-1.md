---
id: "01M85XAD0N4PAXHSA1FB2BFJMR"
kind: requirement
parent: 01M85XAD0M8DK9H6MVEFEFT98C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Colour, spacing and type tokens are defined once from the palette and exposed to CSS and Tailwind

Context: styles.css has a few hsl variables; Tailwind exposes palette ramps as pal.*. Desired: one tokens module with colour (from PALETTE_RAMPS), spacing and type, emitted as :root CSS variables and referenced in theme.extend. Expected: components use tokens only. Why: consistent styling.

## Acceptance criteria
- Given the tokens module, when colour tokens are listed, then each value is contained in PALETTE
- Given tokensToCssVars, when called, then it returns --sf-color-*, --sf-space-* and --sf-font-* entries
- Given tailwind.config, when imported, then theme.extend exposes sf colours, spacing and fontFamily referencing the CSS variables and the existing background token stays


## Scope
- In scope: src/lib/tokens.ts
- In scope: Tailwind plugin and theme extension
- Out of scope: component restyling
- Preserve: colors.pal
- Preserve: colors.background
- Preserve: colors.primary


## Technical constraints
- One palette of at most 48 colours, defined once
- Tailwind stays


## Definition of done
- Tokens exposed as CSS variables and Tailwind values


## Clarifying questions
- None

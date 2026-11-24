---
id: "01M85XAD0NAMSHK04A9PY0H5PY"
kind: unit
parent: 01M85XAD0N4PAXHSA1FB2BFJMR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add tokens module, Tailwind token plugin and theme values

Create tokens from PALETTE_RAMPS and expose them via a Tailwind plugin (:root vars) and theme.extend.

## Acceptance criteria
- tokensToCssVars returns --sf-color-*, --sf-space-*, --sf-font-* entries
- tailwind.config theme.extend has sf colours, spacing, fontFamily


## Scope
- In scope: tokens.ts
- In scope: tailwind.config.ts
- Out of scope: tests
- Preserve: pal colours


## Technical constraints
- One palette of at most 48 colours
- Tailwind stays
- New file: `game/frontend/src/lib/tokens.ts`
- Code path: `game/frontend/tailwind.config.ts`


## Dependencies
- R1


## Definition of done
- Tokens available as CSS variables and Tailwind values


## Clarifying questions
- None

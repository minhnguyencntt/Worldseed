---
id: "01M864WDRB4PZ82B17RQYF3YWQ"
kind: requirement
parent: 01M864WDRAHXDD9GJVE8TV688V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Global readable pixel typography on a dark background

Context: styles.css only declares CSS variables and frame classes; body has no background, colour or font size, so unstyled pages render black on white in the default font look. Desired behavior: a base layer that sets background, text colour, VT323 body at 20px and Press Start 2P headings. Expected result: all screens are readable by default. Why: readability.

## Acceptance criteria
- Given styles.css, when parsed, then body sets background to var(--sf-color-ink-1) and color to var(--sf-color-parchment-5).
- Given styles.css, when parsed, then body uses font-family var(--sf-font-body) with font-size 20px and h1, h2 use var(--sf-font-pixel).


## Scope
- In scope: Base layer rules in styles.css
- Out of scope: Component-specific styling
- Preserve: Existing --background/--foreground variables
- Preserve: Frame kit rules


## Technical constraints
- Reference token variables defined by tokensToCssVars in src/lib/tokens.ts


## Definition of done
- Base rules exist in styles.css and the unit test passes


## Non-functional requirements
- VT323 is small at default size, so base size is 20px


## Clarifying questions
- None

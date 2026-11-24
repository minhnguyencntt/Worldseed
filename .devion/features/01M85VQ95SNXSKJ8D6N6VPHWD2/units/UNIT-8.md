---
id: "01M85VQ95TATNNAE68YXTE80CR"
kind: unit
parent: 01M85VQ95T6G134ZMZGT183SCH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: No svg remains and obsolete SVG-only tests are replaced

Add a read-only guard walking the two asset roots, and delete or convert tests that asserted SVG files exist.

## Acceptance criteria
- Guard fails if any .svg is under the asset roots
- Old svg tests are removed or converted to PNG assertions
- BootScene suites still pass


## Scope
- In scope: tests
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- Unit tests only; read-only directory walk, no writes


## Dependencies
- A4


## Definition of done
- Listed suites pass


## Clarifying questions
- None

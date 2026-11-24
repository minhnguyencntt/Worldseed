---
id: "01M85TDR9EKM2R1898WB3307RV"
kind: requirement
parent: 01M85TDR9D0794KHV7H7G8BVSN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy portrait grid is 32x32 and palette-only

Context: the dialogue card needs a speaker portrait. Desired: a head and shoulders drawing of the boy in the hoodie, outlined and ramp shaded. Expected: ArtSource with one 32x32 frame. Why: visual target section 3.3.

## Acceptance criteria
- Given the portrait source, when read, then it has one frame of 32 rows by 32 columns
- Given the portrait grid, when checked, then all indices are valid palette indices and not all 0


## Scope
- In scope: portrait grid in src/art/boy.ts
- Out of scope: dialogue card UI
- Preserve: sheet source


## Technical constraints
- Shared palette of at most 48 colours


## Dependencies
- R1 shares boy.ts


## Definition of done
- portrait source exported


## Clarifying questions
- None

---
id: "01M85V05ZPY2E6K6JH9X9ZW1DE"
kind: requirement
parent: 01M85V05ZNX1DGBD1YGG1SDED5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy portrait grid is 32x32 and palette-only

Context: dialogue card needs a boy portrait. Desired behavior: boy.ts exports BOY_PORTRAIT_SOURCE, one 32x32 frame with outline and ramp shading. Expected result: size and palette checkable. Why: SG-2.2 done-when.

## Acceptance criteria
- Given BOY_PORTRAIT_SOURCE, when frames.length is read, then it equals 1
- Given the frame, when size is read, then it is 32 rows by 32 columns
- Given every cell, when checked, then it is a valid palette index


## Scope
- In scope: portrait source in boy.ts
- Out of scope: dialogue card UI
- Preserve: boy sheet source


## Technical constraints
- Shared palette only
- Deterministic pure functions


## Definition of done
- BOY_PORTRAIT_SOURCE exported at 32x32


## Clarifying questions
- None

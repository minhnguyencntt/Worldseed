---
id: "01M84N2BMB0A9J37ENYEPPEGFS"
kind: requirement
parent: 01M84N2BMA5HW9M16E958YNGRE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout renders the 80/20 desktop split with Tailwind and no page scroll

Context: the desktop split is defined in legacy CSS (grid-template-columns 4fr 1fr, min-height 100vh). Desired behavior: GameLayout expresses it with Tailwind utilities, uses h-screen and overflow-hidden, and gives the story aside its own overflow-y-auto. Expected result: no page scroll or horizontal overflow on desktop. Why: the layout keeps the game dominant.

## Acceptance criteria
- Given GameLayout rendered, when its root element is inspected, then its classes include grid, h-screen, w-full, overflow-hidden and md:grid-cols-[4fr_1fr].
- Given GameLayout rendered, when the aside is inspected, then its classes include overflow-y-auto and md:h-screen, and the scene main includes min-w-0.
- Given the stylesheet, when html, body and #root are read, then they have height 100% and overflow hidden.


## Scope
- In scope: GameLayout root, main and aside classes
- In scope: html/body/#root overflow rules in styles.css
- Out of scope: mobile drawer behavior
- Preserve: scene and story slots


## Technical constraints
- Tailwind utilities only for layout


## Definition of done
- Desktop classes implemented


## Non-functional requirements
- No horizontal overflow


## Clarifying questions
- None

---
id: "01M84NCYC0DGSB9K2J79XFR2ME"
kind: requirement
parent: 01M84NCYBZXA3J18V03QH45F05
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout hosts the header overlay and layout tests assert Tailwind classes

Context: GameLayout has no header slot; tests/layout.test.tsx still reads styles.css and checks legacy class strings. Desired behavior: GameLayout renders an optional header prop absolutely over main, and layout.test.tsx asserts Tailwind classes on root, main and aside plus header placement. Why: tests must match the Tailwind layout.

## Acceptance criteria
- Given a header prop, when GameLayout renders, then the header is inside main
- Given layout.test.tsx, when read, then it contains no styles.css read nor legacy class-name strings, and asserts Tailwind classes


## Scope
- In scope: GameLayout header prop
- In scope: tests/layout.test.tsx
- Out of scope: Desktop class tests in layoutDesktop.test.tsx
- Preserve: Drawer toggle behavior, md:grid-cols-[4fr_1fr]


## Technical constraints
- Tailwind only


## Definition of done
- layout.test.tsx green


## Clarifying questions
- None

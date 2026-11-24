---
id: "01M84M3003A9R4C5HX74G1FKZ0"
kind: unit
parent: 01M84M3002RCNPE2R8HMP97D1A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Use Button, Lucide ChevronUp and motion.aside in GameLayout

Install lucide-react and motion and update GameLayout.

## Acceptance criteria
- Given GameLayout, when rendered, then toggle is Button with icon
- Given the aside, when rendered, then it is a motion.aside with unchanged classes


## Scope
- In scope: package.json
- In scope: GameLayout.tsx
- Out of scope: tests
- Preserve: Toggle text 'Story' and aria-expanded


## Technical constraints
- Code path: `game/frontend/package.json`
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Definition of done
- Typecheck passes


## Clarifying questions
- None

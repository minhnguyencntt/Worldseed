---
id: "01M84M3002RCNPE2R8HMP97D1A"
kind: requirement
parent: 01M84M300298C158V0E66Y0QWJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout really uses Button, Lucide and Motion

Context: GameLayout renders a plain button and aside. Desired behavior: the Story toggle is the shadcn Button with a Lucide ChevronUp icon (aria-hidden), and the aside is a motion.aside, with unchanged class names, aria-expanded and accessible name 'Story'. Expected result: lucide-react and motion are imported by shipped code.

## Acceptance criteria
- Given GameLayout, when rendered, then a button named 'Story' with aria-expanded 'false' exists and contains an svg icon
- Given the toggle clicked, when state flips, then aside has class drawer-open and aria-expanded is 'true'
- Given package.json, when read, then lucide-react and motion are dependencies
- Given the existing layout tests, when run, then they still pass


## Scope
- In scope: package.json
- In scope: src/components/GameLayout.tsx
- Out of scope: Other components
- Preserve: Class names game-layout, scene-area, story-panel, drawer-open


## Technical constraints
- Import motion from 'motion/react'


## Definition of done
- Layout uses stack and tests pass


## Clarifying questions
- None

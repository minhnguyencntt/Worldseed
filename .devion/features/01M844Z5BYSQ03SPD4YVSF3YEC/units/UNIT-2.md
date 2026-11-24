---
id: "01M844Z5BY4CXY9ZYY72S4Z0CG"
kind: unit
parent: 01M844Z5BYZ5W1SYDFT22JFH6P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Guard the missing #root in main.tsx

Replace the non-null assertion on document.getElementById('root') with an explicit check that throws 'Root element #root not found'.

## Acceptance criteria
- main.tsx throws Error('Root element #root not found') when #root is missing
- main.tsx still renders <App /> when #root exists


## Scope
- In scope: src/main.tsx
- Out of scope: App.tsx
- Preserve: ./styles.css import


## Technical constraints
- Code path: `game/frontend/src/main.tsx`


## Definition of done
- tsc --noEmit still exits 0


## Clarifying questions
- None

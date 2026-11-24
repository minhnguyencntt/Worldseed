---
id: "01M84MKK2GA2HZPYWHXMGTVT4X"
kind: unit
parent: 01M84MKK2FFJSW2HDQ80B3WHM6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Typed useUiStore hook export unit tests

Render a probe component using selectors and assert re-render on action.

## Acceptance criteria
- Selector renders current value
- Re-renders after action


## Scope
- In scope: game/frontend/tests/uiStoreHook.test.tsx
- Out of scope: product code changes
- Preserve: other tests


## Technical constraints
- Use @testing-library/react with act


## Definition of done
- Tests pass


## Clarifying questions
- None

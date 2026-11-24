---
id: "01M84N2BMBM9AXXZ1A4EZ8TSGY"
kind: requirement
parent: 01M84N2BMA5HW9M16E958YNGRE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Story panel is a store-driven mobile bottom drawer and legacy layout CSS is removed

Context: the drawer flag is local useState and the mobile positioning is in a legacy media query. Desired behavior: GameLayout reads drawerOpen and toggleDrawer from useUiStore, positions the aside as a fixed bottom drawer below md via Tailwind, and keeps scene controls reachable by reserving space for the drawer handle. The legacy layout rules are deleted. Why: the single store owns UI state and the legacy CSS is dead.

## Acceptance criteria
- Given useUiStore drawerOpen false, when GameLayout renders, then the Story button has aria-expanded false and the aside has data-state closed.
- Given the Story button clicked, when the store changes, then useUiStore.getState().drawerOpen is true, aria-expanded is true and the aside has data-state open; a second click returns it to false.
- Given the scene slot, when the drawer is closed or open, then the scene content remains in the document and the scene main has bottom padding below md (pb-12) so controls are not covered.
- Given src/styles.css, when read, then no .game-layout, .story-panel, .scene-area or max-width media query remains while .contribution-sheet rules remain.


## Scope
- In scope: useUiStore wiring in GameLayout
- In scope: mobile drawer Tailwind classes
- In scope: deleting legacy rules in styles.css
- Out of scope: desktop grid classes
- Preserve: Story button label and aria-expanded
- Preserve: uiStore API


## Technical constraints
- Do not change uiStore.ts
- Toggle button hidden at md and up


## Dependencies
- REQ-1


## Definition of done
- Drawer is store-driven and legacy CSS removed


## Non-functional requirements
- Drawer transition is smooth


## Clarifying questions
- None

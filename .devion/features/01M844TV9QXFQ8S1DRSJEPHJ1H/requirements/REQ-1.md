---
id: "01M844TV9QSM531W5EP6MNP6B2"
kind: requirement
parent: 01M844TV9QXFQ8S1DRSJEPHJ1H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Clicking an object opens its action menu

Context: App holds selectedId and renders ActionMenu for the selected SceneObjectView. Desired behavior: the menu section carries the object id so the flow is assertable without relying on text. Expected result: clicking Bookshelf shows its menu with Inspect, Push, Search, Leave. Why: the entry point to all interactions.

## Acceptance criteria
- Given the playing view, when Bookshelf is clicked, then a region named Bookshelf contains Inspect, Push, Search and Leave buttons
- Given no hotspot is selected, when the view renders, then no action menu region exists


## Scope
- In scope: ActionMenu root attribute data-object-id
- Out of scope: Menu styling
- Preserve: ActionMenu props
- Preserve: aria-label equal to object name


## Technical constraints
- Do not change ActionMenuProps


## Definition of done
- ActionMenu root exposes data-object-id


## Clarifying questions
- None

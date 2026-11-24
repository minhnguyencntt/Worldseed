---
id: "01M84MKK2GW1MFN3X9N132BG1X"
kind: unit
parent: 01M84MKK2FXX0RTPWXMGT7KW1G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Drawer and modal store unit tests

Test drawer and modal defaults and actions on useUiStore.

## Acceptance criteria
- Defaults asserted
- Actions asserted


## Scope
- In scope: game/frontend/tests/uiStoreDrawerModal.test.ts
- Out of scope: product code changes
- Preserve: other tests


## Technical constraints
- Reset state in beforeEach with useUiStore.setState(initial)


## Definition of done
- Tests pass


## Clarifying questions
- None

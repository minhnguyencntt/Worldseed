---
id: "01M85YC1TK6WDH44N2YT5STECR"
kind: unit
parent: 01M85YC1TJABW5F2PBKNKSP3GZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Event log and App-fed StoryPanel unit tests

Test log markup and that App feeds the panel with real store state with PhaserHost and API mocked.

## Acceptance criteria
- Log order and empty message asserted
- App renders panel with state history and inventory


## Scope
- In scope: new tests
- Out of scope: product code
- Preserve: existing app tests


## Technical constraints
- Mock PhaserHost, api/client; unit tests only.


## Dependencies
- ACT3


## Definition of done
- Tests pass


## Clarifying questions
- None

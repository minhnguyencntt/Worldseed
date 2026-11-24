---
id: "01M84MX32EFQ6PM2RZMGQ7P1S3"
kind: unit
parent: 01M84MX32E0X7BSC7E146YQWTH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm uiStore is a named export of a real zustand store

The guard tests import useUiStore by name from ../src/store/uiStore. This unit confirms that export and that nothing in the repo mocks it.

## Acceptance criteria
- Given uiStore.ts, when read, then useUiStore is exported with export const.
- Given src, when searched, then no mock replaces uiStore.


## Scope
- In scope: Confirming the export
- Out of scope: Behavior changes
- Preserve: Named exports useUiStore, UiState, ModalId


## Technical constraints
- No product edit unless the export is missing
- Code path: `game/frontend/src/store/uiStore.ts`


## Definition of done
- Export confirmed; no behavioral change


## Clarifying questions
- None

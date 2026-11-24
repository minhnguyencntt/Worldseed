---
id: "01M85CF86WDKTSTVPDT8R2BK8A"
kind: unit
parent: 01M85CF86VWZFWD56BTXPAKRGR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ContributionSheet dialog behavior unit tests

Unit tests for the Radix-based sheet with fetch stubbed.

## Acceptance criteria
- Given the sheet is open, when Escape is pressed, then onClose is called once
- Given the sheet is open, then the dialog has the title name, a description and a working Close button
- Given open is false, then no dialog is rendered


## Scope
- In scope: tests/contributionDialog.test.tsx
- Out of scope: Product code


## Technical constraints
- Stub fetch with vi.stubGlobal as in tests/contribution.test.tsx; history payload from contributionFixture in tests/fixtures/api.ts, which mirrors the backend contribution response used by GET /api/v1/player/me/contributions


## Definition of done
- Test file passes


## Clarifying questions
- None

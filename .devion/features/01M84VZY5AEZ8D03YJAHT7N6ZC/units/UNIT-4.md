---
id: "01M84VZY5B8SHKAFWBB842XMNV"
kind: unit
parent: 01M84VZY5BC4WNJ43ECVGN26ND
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: PhaserHost zoom pass-in and refresh unit tests

Unit tests with createGame, ResizeObserver and matchMedia mocked prove zoom is passed in and refreshed.

## Acceptance criteria
- Mount passes computeZoom
- Resize and dpr change call setZoom then refresh


## Scope
- In scope: tests/phaserHost.test.tsx
- Out of scope: Real browser
- Preserve: Existing lifecycle tests


## Technical constraints
- Reuse FakeResizeObserver and createGameMock in the file; add setZoom: vi.fn() to the fake scale


## Definition of done
- Tests pass


## Clarifying questions
- None

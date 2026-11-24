# UNIT-467 — Verify: PhaserHost zoom pass-in and refresh unit tests

## Summary
Mocked createGame tests for zoom at mount, resize and dpr change

## Description
Unit tests with createGame, ResizeObserver and matchMedia mocked prove zoom is passed in and refreshed.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserHost.test.tsx` · `FakeGame type and createGameMock` · L5-L17
- **Do:** Add setZoom: ReturnType<typeof vi.fn> to scale in FakeGame and setZoom: vi.fn() in the factory.
- **Run:** `cd game/frontend && npx vitest run tests/phaserHost.test.tsx -t 'passes computeZoom'`
- **Expected:** Fake supports setZoom

### Step 2 — `game/frontend/tests/phaserHost.test.tsx` · `new: it('passes computeZoom(container size, dpr) to createGame')` · after existing tests
- **Do:** Stub window.devicePixelRatio=2 and define clientWidth 1280 and clientHeight 720 on HTMLElement.prototype via Object.defineProperty; render PhaserHost; assert createGameMock third argument equals computeZoom(1280,720,2).
- **Run:** `cd game/frontend && npx vitest run tests/phaserHost.test.tsx -t 'passes computeZoom'`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/phaserHost.test.tsx` · `new: it('recomputes zoom and refreshes on resize and dpr change')` · after previous test
- **Do:** Render, change clientWidth to 640 and devicePixelRatio to 1, invoke resizeCallbacks[0](); assert fakes[0].scale.setZoom called with computeZoom(640,720,1) and scale.refresh called. Then stub window.matchMedia to capture the change listener, re-render, fire it and assert setZoom is called again; unmount and assert removeEventListener was called.
- **Run:** `cd game/frontend && npx vitest run tests/phaserHost.test.tsx -t 'recomputes zoom'`
- **Expected:** Test passes

## Acceptance criteria
- Mount passes computeZoom
- Resize and dpr change call setZoom then refresh

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-467.md`

## Links
- Evidence: EVD-094
- Requirement: REQ-233
- Unit (Act): UNIT-465
- Unit (Verify): UNIT-467
- Status: completed
- Change: UPDATE

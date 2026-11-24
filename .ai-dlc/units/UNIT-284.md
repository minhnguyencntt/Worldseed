# UNIT-284 — Verify: Shell responsive rendering unit tests

## Summary
Update layout tests for classes and store-driven drawer

## Description
Rewrite tests/layout.test.tsx assertions: the CSS-file test is replaced by class assertions; the store is reset between tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layout.test.tsx` · `afterEach / describe('GameLayout drawer toggle and styles')` · L11-L16
- **Do:** Import useUiStore; in afterEach also call useUiStore.setState({ drawerOpen: false })
- **Run:** `npx vitest run tests/layout.test.tsx`
- **Expected:** existing toggle, single story-panel and drawer-open tests still pass

### Step 2 — `game/frontend/tests/layout.test.tsx` · `it('Given the game stylesheet...') replaced by it('root and grid use viewport and 80/20 classes')` · L36-L43
- **Do:** Replace the CSS-file test: render GameLayout, assert container.firstElementChild has classes h-screen, w-screen, overflow-hidden and className contains 'md:grid-cols-[4fr_1fr]'; assert .story-panel has class overflow-y-auto
- **Run:** `npx vitest run tests/layout.test.tsx -t 'root and grid'`
- **Expected:** test passes

### Step 3 — `game/frontend/tests/layout.test.tsx` · `it('Story button updates the store')` · new
- **Do:** Render GameLayout, click Story, assert useUiStore.getState().drawerOpen is true and .story-panel has class drawer-open and scene node still present
- **Run:** `npx vitest run tests/layout.test.tsx -t 'updates the store'`
- **Expected:** test passes

## Acceptance criteria
- Class-based layout asserted
- Drawer toggle drives the store

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-284.md`

## Links
- Evidence: EVD-056
- Requirement: REQ-141
- Unit (Act): UNIT-280
- Unit (Verify): UNIT-284
- Status: completed
- Change: UPDATE
